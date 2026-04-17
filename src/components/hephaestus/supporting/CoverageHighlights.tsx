// src/components/hephaestus/supporting/CoverageHighlights.tsx
// Coverage Highlights - Featured press mentions and media coverage

"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ExternalLink, Calendar, Users, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface CoverageItem {
  id: string;
  title: string;
  outlet: string;
  outletLogo?: string;
  date: string;
  excerpt: string;
  url: string;
  type: "feature" | "interview" | "review" | "news" | "podcast";
}

const coverageItems: CoverageItem[] = [
  {
    id: "1",
    title: "The Future of Sovereign Digital Spaces",
    outlet: "Tech Chronicle",
    date: "March 15, 2026",
    excerpt: "An in-depth look at how the Sovereign Sanctuary is redefining online communities for neurodivergent creators...",
    url: "#",
    type: "feature",
  },
  {
    id: "2",
    title: "Quantum Weaver Interview: Building Without Extraction",
    outlet: "Creative Futures Podcast",
    date: "March 10, 2026",
    excerpt: "The founder discusses trauma-informed design, residual economics, and the vision for a post-capitalist creative economy...",
    url: "#",
    type: "podcast",
  },
  {
    id: "3",
    title: "Sanctuary Named Top Emerging Platform for Creators",
    outlet: "Digital Culture Weekly",
    date: "March 5, 2026",
    excerpt: "The Sovereign Sanctuary earns a spot on the annual 'Ones to Watch' list for its innovative approach to creator economics...",
    url: "#",
    type: "news",
  },
  {
    id: "4",
    title: "Comedy as Liberation: The Cure for Autism Special",
    outlet: "The Laughing Journal",
    date: "February 28, 2026",
    excerpt: "A review of the groundbreaking comedy special that's sparking conversations about neurodivergence and capitalism...",
    url: "#",
    type: "review",
  },
  {
    id: "5",
    title: "Residual Economics: A New Model for Creator Income",
    outlet: "Future Commerce",
    date: "February 20, 2026",
    excerpt: "How the Sanctuary's residual pool system could reshape how creators earn from their work...",
    url: "#",
    type: "feature",
  },
  {
    id: "6",
    title: "Council of Nine: Governance Without Hierarchy",
    outlet: "Decentralized Minds",
    date: "February 15, 2026",
    excerpt: "An exploration of the Sanctuary's unique council-based governance structure...",
    url: "#",
    type: "interview",
  },
];

const typeLabels = {
  feature: "Feature",
  interview: "Interview",
  review: "Review",
  news: "News",
  podcast: "Podcast",
};

const typeColors = {
  feature: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  interview: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  review: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  news: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  podcast: "bg-pink-500/20 text-pink-400 border-pink-500/30",
};

export function CoverageHighlights() {
  const [showAll, setShowAll] = useState(false);
  const displayedItems = showAll ? coverageItems : coverageItems.slice(0, 3);

  const stats = {
    totalMentions: coverageItems.length,
    outlets: new Set(coverageItems.map((i) => i.outlet)).size,
    avgMonth: Math.round(coverageItems.length / 2),
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Coverage Highlights</h2>
          <p className="text-sm text-white/40 mt-1">
            Featured press mentions and media coverage
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">{stats.totalMentions}</div>
            <div className="text-xs text-white/40">Mentions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{stats.outlets}</div>
            <div className="text-xs text-white/40">Outlets</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{stats.avgMonth}</div>
            <div className="text-xs text-white/40">Per Month</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {displayedItems.map((item) => (
          <Card key={item.id} className="p-4 hover:border-cyan-500/30 transition-all">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={cn("text-xs", typeColors[item.type])}>
                    {typeLabels[item.type]}
                  </Badge>
                  <span className="text-xs text-white/30 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                </div>
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-white/60 mt-1">{item.outlet}</p>
                <p className="text-sm text-white/40 mt-2 line-clamp-2">{item.excerpt}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(item.url, "_blank")}
                className="shrink-0 self-start"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Read More
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {coverageItems.length > 3 && (
        <div className="text-center">
          <Button variant="ghost" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Less" : `View All ${coverageItems.length} Mentions`}
          </Button>
        </div>
      )}

      {/* Press Contact CTA */}
      <div className="mt-4 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg text-center">
        <p className="text-sm text-white/60">
          Are you a journalist? <br className="sm:hidden" />
          <a href="mailto:press@sovereignsanctuary.com" className="text-cyan-400 hover:underline">
            Join our press list
          </a>{" "}
          for exclusive updates and early access.
        </p>
      </div>
    </div>
  );
}