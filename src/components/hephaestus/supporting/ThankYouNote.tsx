// src/components/supporting/ThankYouNote.tsx
// Thank You Note - Post-donation gratitude

"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

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

export function ThankYouNote({ amount, className }: ThankYouNoteProps) {
  const [message, setMessage] = useState(GRATITUDE_MESSAGES[0]);

  useEffect(() => {
    const matched = [...GRATITUDE_MESSAGES].reverse().find(m => amount >= m.minAmount);
    setMessage(matched || GRATITUDE_MESSAGES[0]);
  }, [amount]);

  return (
    <Card className={cn("p-8 text-center", className)}>
      <div className="text-6xl mb-4 animate-bounce">✨</div>
      <h1 className="text-3xl font-bold text-white mb-4">Thank You!</h1>
      <div className="text-5xl mb-4">{message.emoji}</div>
      <p className="text-xl text-white/80 mb-2">{message.message}</p>
      <p className="text-2xl font-bold text-cyan-400 mb-6">${amount}</p>
      
      <div className="space-y-4 text-left max-w-md mx-auto mb-8">
        <p className="text-white/60 text-sm">
          Your contribution helps us:
        </p>
        <ul className="space-y-2 text-sm text-white/60">
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Maintain the Sanctuary for all members
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Support neurodivergent creators
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Develop accessible creative tools
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">✓</span> Keep the community free and sovereign
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

      <p className="text-xs text-white/30 mt-8">
        A receipt has been sent to your email. You can also download it below.
      </p>
    </Card>
  );
}