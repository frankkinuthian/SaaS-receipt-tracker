"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import {
  ChevronLeft,
  FileText,
  Lightbulb,
  Lock,
  Sparkle,
  Sparkles,
} from "lucide-react";
import { useSchematicFlag } from "@schematichq/schematic-react";

function Receipt() {
  const params = useParams<{ id: string }>();
  const [receiptId, setReceiptId] = useState<Id<"receipts"> | null>(null);
  const router = useRouter();
  const isSummariesEnabled = useSchematicFlag("summary");

  // Fetch receipt details
  const receipt = useQuery(
    api.receipts.getReceiptById,
    receiptId ? { id: receiptId } : "skip",
  );

  // Get file download URL for the view button
  const fileId = receipt?.fileId;
  const downloadUrl = useQuery(
    api.receipts.getReceiptDownloadUrl,
    fileId ? { fileId } : "skip",
  );

  // Convert URL string ID to Convex ID
  useEffect(() => {
    try {
      const id = params.id as Id<"receipts">;
      setReceiptId(id);
    } catch (error) {
      console.error("Invalid receipt ID:", error);
      router.push("/");
    }
  }, [params.id, router]);

  // Loader/ Loading state
  if (receipt === undefined) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (receipt === null) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2-xl font-bold mb-4">Receipt Not found</h1>
          <p className="mb-6">
            The receipt you&apos;re looking for doesn&apos;t exist or has been
            deleted.
          </p>
          <Link
            href="/"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  // Format Upload date
  const uploadDate = new Date(receipt.uploadedAt).toLocaleString();

  /// Check if receipt has uploaded data
  const hasExtractedData = !!(
    receipt.merchantName ||
    receipt.merchantAddress ||
    receipt.transactionDate ||
    receipt.transactionAmount
  );

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6">
          <Link
            href="/receipts"
            className="text-blue-500 hover:underline flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back To Receipts
          </Link>
        </nav>

        <div className="bg-white shadow-md rounde-lg overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-boldtext-gray-900 truncate">
                {receipt.fileDisplayName || receipt.fileName}
              </h1>
              <div className="flex items-center">
                {receipt.status === "pending" ? (
                  <div className="mr-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-800"></div>
                  </div>
                ) : null}

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    receipt.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : receipt.status === "processed"
                        ? "bg-green-100 text-green-800"
                        : "bgred-100 text-red-800"
                  }`}
                >
                  {receipt.status.charAt(0).toUpperCase() +
                    receipt.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500">
                  File Information
                </h3>

                <div className="mt-2 bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Uploaded</p>
                      <p className="font-medium">{uploadDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Size</p>
                      <p className="font-medium">
                        {formatFileSize(receipt.size)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Type</p>
                      <p className="font-medium">{receipt.mimeType}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download */}

              <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <FileText className="h-16 w-16 text-blue-500 mx-auto" />
                  <p className="mt-4 text-gray-500">PDF Preview</p>
                  {downloadUrl && (
                    <a
                      href={downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 inline-block"
                    >
                      View PDF
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Extracted Data Section  */}
            {hasExtractedData && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Receipt Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Merchant Info  */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-500 mb-3">
                      Merchant Information
                    </h4>
                    <div className="space-y-2">
                      {receipt.merchantName && (
                        <div>
                          <p className="text-sm text-gray-500">Name</p>
                          <p className="font-medium">{receipt.merchantName}</p>
                        </div>
                      )}
                      {receipt.merchantAddress && (
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="font-medium">
                            {receipt.merchantAddress}
                          </p>
                        </div>
                      )}
                      {receipt.merchantContact && (
                        <div>
                          <p className="text-sm text-gray-500">Contact</p>
                          <p className="font-medium">
                            {receipt.merchantContact}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Transaction Dets  */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-3">
                      Transaction Details
                    </h4>
                    <div className="space-y-2">
                      {receipt.transactionDate && (
                        <div>
                          <p className="text-sm text-gray-500">Date</p>
                          <p className="font-medium">
                            {receipt.transactionDate}
                          </p>
                        </div>
                      )}
                      {receipt.transactionAmount && (
                        <div>
                          <p className="text-sm text-gray-500">Amount</p>
                          <p className="font-medium">
                            {receipt.transactionAmount} {receipt.currency || ""}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Receipt summary  */}
                {receipt.receiptSummary && (
                  <>
                    {isSummariesEnabled ? (
                      <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100 shadow-sm">
                        <div className="flex items-center mb-4">
                          <h4 className="font-semibold text-blue-700">
                            AI summary
                          </h4>
                          <div className="ml-2 flex">
                            <Sparkles className="h-3.5 w-3.5 text-yellow-500" />
                            <Sparkles className="h-3 w-3 text-yellow-400 -ml-1" />
                          </div>
                        </div>
                        <div className="bg-white bg-opacity-60 rounded-lg p-4 border border-blue-100">
                          <p className="text-sm whitespace-pre-line leading-relaxed text-gray-700">
                            {receipt.receiptSummary}
                          </p>
                        </div>
                        <div className="mt-3 text-xs text-blue-600 italic flex items-center">
                          <Lightbulb className="h-3 w-3 mr-1" />
                          <span>
                            AI generated summary based on receipt data.{" "}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-6 bg-gray-100 p-6 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <h4 className="font-semibold text-gray-500">
                              AI Summary
                            </h4>

                            <div className="ml-2 flex">
                              <Sparkles className="h-3.5 w-3.5 text-gray-400" />
                              <Sparkles className="h-3 w-3 text-gray-300 -ml-1" />
                            </div>
                          </div>
                          <Lock className="h-4 w-4 text-gray-500" />
                        </div>
                        <div className="bg-white bg-opacity-50 rounded-lg p-4 border border-gray-200 flex flex-col items-center justify-center">
                          <Link
                            href="/manage-plan"
                            className="text-center py-4"
                          >
                            <Lock className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                            <p className="text-sm text-gray-500 mb-2">
                              AI Summary is a PRO feature.{" "}
                            </p>
                            <button className="mt-2 px-4 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 inline-block">
                              Upgrade to unlock.
                            </button>
                          </Link>
                        </div>
                        <div className="mt-3 text-xs text-gray-400 italic flex items-center">
                          <Lightbulb className="h-3 w-3 mr-1" />
                          <span>
                            Get AI powered insights from your receipts.{" "}
                          </span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Item Section  */}
            

            {/* End of Extracted Data Section */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Receipt;

// Helper function to format file size
function formatFileSize(bytes: number): string {
  if (bytes === 0) {
    return "0 bytes";
  }

  const k = 1024;
  const sizes = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// For currency formatting
function formatCurrency(amount: number, currency: string = ""): string {
  return `${amount.toFixed(2)} ${currency ? `${currency}` : ""}`;
}
