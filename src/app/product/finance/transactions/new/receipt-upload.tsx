"use client";
import { ReceiptText, Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

interface ReceiptUploadProps {
  onUpload: (url: string) => void;
  isUploading: boolean;
}

export function ReceiptUpload({ onUpload, isUploading }: ReceiptUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
        isDragging
          ? "border-primary bg-primary/10"
          : "border-border hover:border-primary/50"
      )}
    >
      {isUploading ? (
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-sm font-medium">Analyzing receipt...</p>
          <p className="text-xs text-muted-foreground">
            Please wait while we extract the details.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="p-3 bg-gray-100 rounded-full">
            <Upload className="w-6 h-6 text-gray-500" />
          </div>
          <p className="text-sm font-medium">
            <span className="text-primary">Click to upload</span> or drag and
            drop a receipt
          </p>
          <p className="text-xs text-muted-foreground">
            PNG, JPG, JPEG up to 10MB
          </p>
        </div>
      )}
    </div>
  );
}
