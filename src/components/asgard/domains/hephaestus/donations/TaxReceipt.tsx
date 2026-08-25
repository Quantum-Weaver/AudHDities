// src/components/supporting/TaxReceipt.tsx
// ═════════════════════════════════════════════════════════════════════════
// RETIRED — 2026-08-24, at KP's word.
//
// KP ⚛ 2026-08-24, verbatim, spacing kept:
//   "retire the donate and create subscription tiers for me rather than
//    the platform, and  i will still have my covenant set to 50%. the
//    donations tab was before we had a built sanctuary and had different
//    outlooks."
//
// The /donate room retired across five files that day. This component is
// kept on disk and imported by nothing — lose-nothing.
//
// WHAT REPLACES IT IS NOT A FORGE ROOM. The subscription tiers are a WARE
// of KP's — recurring, KP the sole artisan — so they are the BAZAAR's
// spec (realm 03), not a room here. A subscription is a work on a stall
// with a renewal attached: Stripe's subscription mode carries the
// recurrence, and each renewal writes one `exchanges` row that becomes
// ledger rows like any other sale. The covenant at 50% is KP's own pledge
// on his own ware under the standing model, and needs no new machinery.
//
// Board ⑤: .journals/proofs/11-hephaestus/design/Ways.dc.html · SPEC.md ⑤
// ═════════════════════════════════════════════════════════════════════════
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
  title: 'Record of the Gift',
  value: '',
};

export function TaxReceipt({ amount, className }: TaxReceiptProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 2026-08-24, the truth pass — two lines stood in this receipt: "The
    // Sovereign Sanctuary is a fiscally sponsored project." and "Please
    // consult your tax advisor for deductibility." Neither is true. There is
    // no fiscal sponsor and no company at all to be sponsored — "we have no
    // company" ((hephaestus)/REALM-BUS.md:216-219) — and implying a
    // deduction is a claim about someone's tax return, made by a house with
    // no standing to make it. Removed; the receipt now says what it is.
    const receipt = `
SOVEREIGN SANCTUARY - RECORD OF A GIFT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Date: ${new Date().toLocaleDateString()}
Donation ID: SOV-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}

Amount: $${amount}
Type: One-time Donation
Purpose: General Support

This is your own copy of the gift, kept by you. It is not a tax
instrument and claims nothing about deductibility.

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
          {/* 2026-08-24, the truth pass — "official donation receipt for tax
              purposes" implied a tax instrument issued by an entity. There is
              no entity. The card keeps its frame; the words are now true. */}
          <h3 className="text-lg font-semibold text-star-dust mb-1">Your Record of the Gift</h3>
          <p className="text-sm text-star-dust/40 mb-4">
            Download a plain record of what you gave, for your own keeping
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

      {/* 2026-08-24, the truth pass — this read "A copy of this receipt has
          also been sent to your email address." Nothing sends it: there is no
          mailer anywhere in this repo behind a donation. The download button
          above is the only copy that exists, and the line now says so. */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs text-star-dust/30">
          The download above is your copy — nothing is emailed.
        </p>
      </div>
    </Card>
  );
}