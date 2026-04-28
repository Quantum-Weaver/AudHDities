// components/supporting/TeamStories.tsx
// Team member testimonials

"use client";

import { useState } from "react";
import { Card } from "@/components/runes/cards/Card";
import { Button } from "@/components/yggdrasil/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/seidr/Dialog";
import { cn } from "@/lib/utils";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  story: string;
  quote: string;
  avatar?: string;
  house?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Alex Chen",
    role: "Lead Weaver",
    story: "I spent 15 years masking in corporate tech before finding the Sanctuary. Here, I don't have to pretend. My autism isn't a liability—it's my superpower. I lead our quantum architecture team now, and every day I get to build tools I wish I'd had.",
    quote: "The Sanctuary didn't just give me a job. It gave me back my self.",
    house: "aethelred",
  },
  {
    id: "2",
    name: "Sam Rivera",
    role: "Community Steward",
    story: "I was a community manager on mainstream platforms, burning out from the constant demand to perform 'professional.' At the Sanctuary, I found a place where authenticity is the only requirement. I help moderate our community spaces now, and it doesn't feel like work—it feels like home.",
    quote: "I stopped pretending and started belonging.",
    house: "hearth_keeper",
  },
  {
    id: "3",
    name: "Jordan Taylor",
    role: "Creative Director",
    story: "ADHD made traditional 9-to-5 impossible. The Sanctuary's asynchronous, outcome-based approach let me thrive. I lead our visual identity team, and my hyperfocus periods are now assets, not problems to fix.",
    quote: "My chaos became my canvas.",
    house: "skald",
  },
  {
    id: "4",
    name: "Casey Wong",
    role: "Economic Architect",
    story: "I spent years designing loyalty programs that exploited human psychology. I came to the Sanctuary to build something that liberates instead of traps. The residual economics we've created is the work I'm most proud of.",
    quote: "I used to build cages. Now I build keys.",
    house: "chancellor",
  },
];

export function TeamStories() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const houseColors: Record<string, string> = {
    aethelred: "border-cyan-500/30",
    hearth_keeper: "border-orange-500/30",
    skald: "border-pink-500/30",
    chancellor: "border-teal-500/30",
    seer: "border-purple-500/30",
    curator: "border-emerald-500/30",
    archivist: "border-stone-500/30",
    codex: "border-yellow-500/30",
    executioner: "border-red-500/30",
  };

  return (
    <>
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Voices from the Sanctuary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamMembers.map((member) => (
            <Card
              key={member.id}
              className={cn(
                "p-4 cursor-pointer transition-all hover:scale-[1.02]",
                houseColors[member.house || "default"]
              )}
              onClick={() => setSelectedMember(member)}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">{member.name[0]}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-white">{member.name}</h3>
                    <span className="text-xs text-cyan-400">{member.role}</span>
                  </div>
                  <p className="text-white/60 text-sm italic mt-1">"{member.quote}"</p>
                  <Button variant="ghost" size="sm" className="mt-2 text-xs">
                    Read their story →
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Story Dialog */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="max-w-lg">
          {selectedMember && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                    <span className="text-2xl">{selectedMember.name[0]}</span>
                  </div>
                  <div>
                    <DialogTitle className="text-xl font-bold text-white">
                      {selectedMember.name}
                    </DialogTitle>
                    <p className="text-cyan-400">{selectedMember.role}</p>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-4">
                <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                  <p className="text-cyan-400 italic">"{selectedMember.quote}"</p>
                </div>
                <p className="text-white/70 leading-relaxed">{selectedMember.story}</p>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-white/40">
                    House of {selectedMember.house?.replace("_", " ") || "the Sanctuary"}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}