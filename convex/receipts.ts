import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Function to generate Convex upload URL for client
export const generatedUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    // Generate upload URL for client use to upload file
    return await ctx.storage.generateUploadUrl();
  },
});

// Store receipt file and add to db
export const storeReceipt = mutation({
  args: {
    userId: v.string(),
    fileId: v.id("_storage"),
    fileName: v.string(),
    size: v.number(),
    mimeType: v.string(),
  },
  handler: async (ctx, args) => {
    // Save to db
    const receiptId = await ctx.db.insert("receipts", {
      userId: args.userId,
      fileId: args.fileId,
      fileName: args.fileName,
      size: args.size,
      uploadedAt: Date.now(),
      mimeType: args.mimeType,
      status: "pending",

      // init extracted data fields as null
      merchantName: undefined,
      merchantAddress: undefined,
      merchantContact: undefined,
      transactionDate: undefined,
      transactionAmount: undefined,
      currency: undefined,
      items: [],
    });

    return receiptId;
  },
});

// function to get all receipts
export const getReceipts = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    // only return receipts for Authenticated user
    return await ctx.db
      .query("receipts")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .collect();
  },
});

// get a single Receipt by userID
export const getReceiptById = query({
  args: {
    id: v.id("receipts"),
  },
  handler: async (ctx, args) => {
    // get the receipt
    const receipt = await ctx.db.get(args.id);

    // verification here
    if (receipt) {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) {
        throw new Error("Not authenticated");
      }

      const userId = identity.subject;
      if (receipt.userId !== userId) {
        throw new Error("Not authorized to access this receipt");
      }
    }
    return receipt;
  },
});

// Generate URL for client to download receipt file to show on UI
export const getReceiptDownloadUrl = query({
  args: {
    fileId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    // Generate temp download URL for client to download file
    return await ctx.storage.getUrl(args.fileId);
  },
});
// Update the status of the receipt
export const updateReceiptStatus = mutation({
  args: {
    id: v.id("receipts"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    // verify user has access
    const receipt = await ctx.db.get(args.id);
    if (!receipt) {
      throw new Error("Receipt not found");
    }
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;
    if (receipt.userId !== userId) {
      throw new Error("Not authorized to update this receipt");
    }
    // update status
    await ctx.db.patch(args.id, { status: args.status });
    return true;
  },
});

// delete receipt and file
export const deleteReceipt = mutation({
  args: {
    id: v.id("receipts"),
  },
  handler: async (ctx, args) => {
    // verify user has access
    const receipt = await ctx.db.get(args.id);
    if (!receipt) {
      throw new Error("Receipt not found");
    }

    // delete file from storage
    await ctx.storage.delete(receipt.fileId);
    // delete receipt
    await ctx.db.delete(args.id);

    return true;
  },
});

// update receipt with extracted data
export const updateReceiptWithExtractedData = mutation({
  args: {
    id: v.id("receipts"),
    fileDisplayName: v.string(),
    merchantName: v.string(),
    merchantAddress: v.string(),
    merchantContact: v.string(),
    transactionDate: v.string(),
    transactionAmount: v.string(),
    currency: v.string(),
    receiptSummary: v.string(),
    items: v.array(
      v.object({
        name: v.string(),
        quantity: v.number(),
        unitPrice: v.number(),
        totalPrice: v.number(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    // verify receipt exists
    const receipt = await ctx.db.get(args.id);
    if (!receipt) {
      throw new Error("Receipt not found");
    }
    // update extracted data fields
    await ctx.db.patch(args.id, {
      fileDisplayName: args.fileDisplayName,
      merchantName: args.merchantName,
      merchantAddress: args.merchantAddress,
      merchantContact: args.merchantContact,
      transactionDate: args.transactionDate,
      transactionAmount: args.transactionAmount,
      receiptSummary: args.receiptSummary,
      currency: args.currency,
      items: args.items,
      status: "processed",
    });
    return {
      userId: receipt.userId,
    };
  },
});
