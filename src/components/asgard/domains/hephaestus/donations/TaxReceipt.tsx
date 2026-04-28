// src/components/supporting/TaxReceipt.tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/yggdrasil/Button";
import { Card } from "@/components/runes/Card";
import type { CardData } from "@/types/components/runes/card.types";

interface TaxReceiptProps {
  amount: number;
  className?: string;
}

const cardData: CardData = {
  id: 'tax-receipt',
  type: 'value',
  title: 'Tax Receipt',
  value: '',
};

export function TaxReceipt({ amount, className }: TaxReceiptProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const receipt = `
SOVEREIGN SANCTUARY - OFFICIAL DONATION RECEIPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Date: ${new Date().toLocaleDateString()}
Donation ID: SOV-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}

Amount: $${amount}
Type: One-time Donation
Purpose: General Support

The Sovereign Sanctuary is a fiscally sponsored project.
Please consult your tax advisor for deductibility.

Thank you for your generous support!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `;
    
    const blob = new Blob([receipt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sovereign-sanctuary-receipt-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setIsDownloading(false);
  };

  return (
    <Card data={cardData} variant="default" radius="lg" shadow="md" className={cn("p-6", className)}>
      <div className="flex items-start gap-4">
        <div className="text-3xl">📄</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-star-dust mb-1">Tax Receipt</h3>
          <p className="text-sm text-star-dust/40 mb-4">
            Download your official donation receipt for tax purposes
          </p>
          
          <div className="flex items-center gap-4 text-sm text-star-dust/60 mb-4">
            <div>
              <span className="text-star-dust/40">Donation Amount:</span>
              <span className="text-neurospark ml-2">${amount}</span>
            </div>
            <div>
              <span className="text-star-dust/40">Date:</span>
              <span className="ml-2">{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full sm:w-auto"
          >
            {isDownloading ? "Generating..." : "Download Receipt"}
          </Button>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs text-star-dust/30">
          A copy of this receipt has also been sent to your email address.
        </p>
      </div>
    </Card>
  );
}