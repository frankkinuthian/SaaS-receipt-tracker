"use server";

import { api } from "@/convex/_generated/api";
import convex from "@/lib/convexClient";
import { currentUser } from "@clerk/nextjs/server";
import { getFileDownloadUrl } from "./getFileDownloadUrl";
import { inngest } from "@/inngest/client";
import Events from "@/inngest/constants";

// Server action to upload PDF to convex storage
export async function uploadPDF(formData: FormData) {
  const user = await currentUser();

  if (!user) {
    return { success: false, error: "User not logged in" };
  }

  try {
    // Get file from formData
    const file = formData.get("file") as File;

    if (!file) {
      return { success: false, error: "No file provided" };
    }

    // Validate file type!!
    if (
      !file.type.includes("pdf") &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      return { success: false, error: "Invalid file type" };
    }

    // get Upload URL from convex storage
    const uploadUrl = await convex.mutation(
      api.receipts.generatedUploadUrl,
      {},
    );

    // convert to array buffer for api to fetch
    const arrayBuffer = await file.arrayBuffer();

    // upload to convex storage

    const uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Content-Type": file.type,
      },
      body: new Uint8Array(arrayBuffer),
    });

    if (!uploadResponse.ok) {
      throw new Error(`Failed to upload file: ${uploadResponse.statusText}`);
    }

    // get ID from response
    const { storageId } = await uploadResponse.json();

    //add receipt to db
    const receiptId = await convex.mutation(api.receipts.storeReceipt, {
      userId: user.id,
      fileId: storageId,
      fileName: file.name,
      size: file.size,
      mimeType: file.type,
    });

    // Generate the file URL
    const fileURL = await getFileDownloadUrl(storageId);

    // console.log("Sending to Inngest:", fileURL.downloadURL);

    // Trigger Inngest agent flow
    await inngest.send({
      name: Events.EXTRACT_DATA_FROM_PDF_AND_SAVE_TO_DATABASE,
      data: {
        url: fileURL.downloadURL,
        receiptId,
      },
    });

    return {
      success: true,
      data: {
        receiptId,
        fileName: file.name,
      },
    };
  } catch (error) {
    console.error("Server action upload error", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occured.",
    };
  }
}
