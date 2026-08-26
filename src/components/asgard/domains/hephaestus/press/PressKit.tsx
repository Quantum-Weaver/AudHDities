// src/components/asgard/domains/hephaestus/press/PressKit.tsx
// ═════════════════════════════════════════════════════════════════════════
// ═════════════════════════════════════════════════════════════════════════
// ─────────────────────────────────────────────────────────────────────────

"use client";

import { Card } from "@/components/runes/Card";
import { FileText } from "lucide-react";
import { CONTACT_LABELS } from "@/lib/constants/components/asgard/domains/iris/contact/contact.constants";

export function PressKit() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-star-dust">Press Kit</h2>
          <p className="text-sm text-star-dust/40 mt-1">
            Resources for media professionals
          </p>
        </div>
      </div>

      <Card
        variant="glass"
        data={{ id: "press-kit-empty", type: "value", title: "Press Kit", value: "" }}
        radius="lg"
        shadow="sm"
        className="p-6"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-star-dust/5 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-star-dust/30" />
          </div>
          <div>
            <h3 className="font-semibold text-star-dust">A press kit is not yet prepared</h3>
            <p className="text-sm text-star-dust/50 mt-1">
              Nothing is sitting behind a download button waiting for you. Ask
              for what you need and it will be written for you by hand.
            </p>
          </div>
        </div>
      </Card>

      <div className="mt-6 p-4 bg-neurospark/5 border border-neurospark/20 rounded-lg">
        <p className="text-sm text-star-dust/60">
          For press enquiries, interview requests, or materials, write to{" "}
          <a
            href={`mailto:${CONTACT_LABELS.EMAIL_ADDRESS}`}
            className="text-neurospark hover:underline"
          >
            {CONTACT_LABELS.EMAIL_ADDRESS}
          </a>
        </p>
      </div>
    </div>
  );
}
