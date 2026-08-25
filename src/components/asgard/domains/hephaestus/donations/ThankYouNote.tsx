// src/components/supporting/ThankYouNote.tsx
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

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/yggdrasil/Button";
import { Card } from "@/components/runes/Card";
import Link from "next/link";
import type { CardData } from "@/types/components/runes/card.types";

interface ThankYouNoteProps {
  amount: number;
  className?: string;
}

const GRATITUDE_MESSAGES = [
  { minAmount: 0, message: "Thank you for your generosity! Every contribution matters.", emoji: "🙏" },
  { minAmount: 25, message: "You're a Guardian of the Sanctuary! Your support protects our community.", emoji: "🛡️" },
  { minAmount: 50, message: "As a Steward, you're nurturing the growth of sovereign creativity.", emoji: "🌱" },
  { minAmount: 100, message: "Visionary! You're helping shape the future of conscious technology.", emoji: "🔮" },
  { minAmount: 250, message: "Sovereign supporter! Your generosity creates lasting transformation.", emoji: "👑" },
];

const cardData: CardData = {
  id: 'thank-you',
  type: 'value',
  title: 'Thank You!',
  value: '',
};

export function ThankYouNote({ amount, className }: ThankYouNoteProps) {
  const [message, setMessage] = useState(GRATITUDE_MESSAGES[0]);

  useEffect(() => {
    const matched = [...GRATITUDE_MESSAGES].reverse().find(m => amount >= m.minAmount);
    setMessage(matched || GRATITUDE_MESSAGES[0]);
  }, [amount]);

  return (
    <Card data={cardData} variant="sanctuary" radius="lg" shadow="lg" className={cn("p-8 text-center", className)}>
      <div className="text-6xl mb-4 animate-bounce">✨</div>
      <h1 className="text-3xl font-bold text-star-dust mb-4">Thank You!</h1>
      <div className="text-5xl mb-4">{message.emoji}</div>
      <p className="text-xl text-star-dust/80 mb-2">{message.message}</p>
      <p className="text-2xl font-bold text-neurospark mb-6">${amount}</p>
      
      <div className="space-y-4 text-left max-w-md mx-auto mb-8">
        <p className="text-star-dust/60 text-sm">Your contribution helps us:</p>
        <ul className="space-y-2 text-sm text-star-dust/60">
          <li className="flex items-center gap-2">
            <span className="text-sanctuary-green">✓</span> Maintain the Sanctuary for all members
          </li>
          <li className="flex items-center gap-2">
            <span className="text-sanctuary-green">✓</span> Support neurodivergent creators
          </li>
          <li className="flex items-center gap-2">
            <span className="text-sanctuary-green">✓</span> Develop accessible creative tools
          </li>
          <li className="flex items-center gap-2">
            <span className="text-sanctuary-green">✓</span> Keep the community free and sovereign
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/">
          <Button variant="primary">Return to Sanctuary</Button>
        </Link>
        <Link href="/vessel">
          <Button variant="outline">View Your Vessel</Button>
        </Link>
      </div>

      {/* 2026-08-24, the truth pass — this read "A receipt has been sent to
          your email. You can also download it below." Nothing is sent: there
          is no mailer anywhere in this repo behind a donation. The download
          below is the only copy that exists, and the line now says so. */}
      <p className="text-xs text-star-dust/30 mt-8">
        Your record of this gift is below, to download and keep. Nothing is emailed.
      </p>
    </Card>
  );
}