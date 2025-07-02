import { api } from "@/convex/_generated/api";
import convex from "@/lib/convexClient";
import { client } from "@/lib/schematic";
import { createAgent, createTool } from "@inngest/agent-kit";
import { openai } from "inngest";
import { z } from "zod";
import { Id } from "@/convex/_generated/dataModel";

// Defines a tool to save receipt data to the Convex database
const saveToDatabaseTool = createTool({
  name: "save-to-database",
  description: "Saves the given data to Convex database.",
  parameters: z.object({
    fileDisplayName: z
      .string()
      .describe(
        "The readable display name of the receipt to show in UI. If the file name is not readable, use this to give a more readable name.",
      ),
    receiptId: z.string().describe("The ID of the receipt to update"),
    merchantName: z.string(),
    merchantAddress: z.string(),
    merchantContact: z.string(),
    transactionDate: z.string(),
    transactionAmount: z
      .string()
      .describe(
        "The total amount of the transaction, summing all the items on the receipt.",
      ),
    receiptSummary: z
      .string()
      .describe(
        "A summary of the receipt, including the merchant name, address, contact, transaction date, transaction amount, and currency. Include a human readable summary of the receipt. Mention both invoice number and receipt number if both are present. Include some key details about the items on the receipt with some context.",
      ),
    currency: z.string(),
    items: z.array(
      z
        .object({
          name: z.string(),
          quantity: z.number(),
          unitPrice: z.number(),
          totalPrice: z.number(),
        })
        .describe(
          "An array of items on the receipt. Include the name, quantity, unit price, and total price of each item.",
        ),
    ),
  }),
  handler: async (params, context) => {
    const {
      fileDisplayName,
      receiptId,
      merchantName,
      merchantAddress,
      merchantContact,
      transactionDate,
      transactionAmount,
      receiptSummary,
      currency,
      items,
    } = params;

    // Inngest steps to save receipt data and track the event
    const result = await context.step?.run(
      "save-receipt-to-database",
      async () => {
        try {
          // Calling convex mutation to update the receipt with the extracted data
          const { userId } = await convex.mutation(
            api.receipts.updateReceiptWithExtractedData,
            {
              id: receiptId as Id<"receipts">,
              fileDisplayName,
              merchantName,
              merchantAddress,
              merchantContact,
              transactionDate,
              transactionAmount,
              receiptSummary,
              currency,
              items,
            },
          );

          // Track event in schematic
          await client.track({
            event: "scan",
            company: {
              id: userId,
            },
            user: {
              id: userId,
            },
          });

          return {
            addedToDb: "Success",
            receiptId,
            fileDisplayName,
            merchantName,
            merchantAddress,
            merchantContact,
            transactionDate,
            transactionAmount,
            receiptSummary,
            currency,
            items,
          };
        } catch (error) {
          return {
            addedToDb: "Failed",
            error: error instanceof Error ? error.message : "Unknown error",
          };
        }
      },
    );

    if (result?.addedToDb === "Success") {
      // Only set these KV values if the operation was successful
      context.network?.state.kv.set("save-to-database", true);
      context.network?.state.kv.set("receipt", receiptId);
    }

    return result;
  },
});

// Exports an agent configured to handle receipt data storage
export const databaseAgent = createAgent({
  name: "Database Agent",
  description:
    "Agent responsible for taking key info regarding receipts and storing it in the convex database.",
  system:
    "You are a helpful assistant that takes key info regarding receipts and stores it in the convex database.",
  model: openai({
    model: "gpt-4",
    defaultParameters: {
      max_completion_tokens: 1000,
    },
  }),
  tools: [saveToDatabaseTool],
});
