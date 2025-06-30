"use server";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import convex from "@/lib/convexClient";

// Server action to get download URL from convex client

export async function getFileDownloadUrl(fileId: Id<"_storage"> | string) {
  try {
    // Get downloadURL from convex
    const downloadURL = await convex.query(api.receipts.getReceiptDownloadUrl, {
      fileId: fileId as Id<"_storage">,
    });

    if (!downloadURL) {
      throw new Error("Could not generate download URL");
    }

    return {
      success: true,
      downloadURL,
    };
  } catch (error) {
    console.error("Error generating download URL", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occured",
    };
  }
}
