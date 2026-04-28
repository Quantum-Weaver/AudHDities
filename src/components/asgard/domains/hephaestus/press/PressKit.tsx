// src/components/asgard/domains/hephaestus/press/PressKit.tsx
// Press Kit - Main press resources section

"use client";

import { useState } from "react";
import { Card } from "@/components/runes/Card";
import { Button } from "@/components/yggdrasil/Button";
import { Badge } from "@/components/runes/Badge";
import { Download, FileText, Image, Video, Users, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface PressResource {
  id: string;
  title: string;
  description: string;
  type: "press-release" | "fact-sheet" | "bio" | "media-kit" | "brand-guidelines";
  format: "pdf" | "doc" | "zip" | "link";
  size?: string;
  downloadUrl: string;
  updatedAt: string;
}

const pressResources: PressResource[] = [
  {
    id: "press-kit-overview",
    title: "Press Kit Overview",
    description: "Complete overview of the Sovereign Sanctuary for media professionals",
    type: "media-kit",
    format: "pdf",
    size: "2.4 MB",
    downloadUrl: "/press/press-kit-overview.pdf",
    updatedAt: "2026-04-01",
  },
  {
    id: "fact-sheet",
    title: "Fact Sheet",
    description: "Key facts, figures, and statistics about the Sanctuary",
    type: "fact-sheet",
    format: "pdf",
    size: "1.1 MB",
    downloadUrl: "/press/fact-sheet.pdf",
    updatedAt: "2026-04-01",
  },
  {
    id: "founder-bio",
    title: "Founder Biography",
    description: "The Quantum Weaver's story and vision",
    type: "bio",
    format: "pdf",
    size: "0.8 MB",
    downloadUrl: "/press/founder-bio.pdf",
    updatedAt: "2026-04-01",
  },
  {
    id: "brand-guidelines",
    title: "Brand Guidelines",
    description: "Logo usage, color palette, typography, and brand voice",
    type: "brand-guidelines",
    format: "pdf",
    size: "3.2 MB",
    downloadUrl: "/press/brand-guidelines.pdf",
    updatedAt: "2026-04-01",
  },
  {
    id: "media-kit-zip",
    title: "Complete Media Kit (ZIP)",
    description: "All press resources in one downloadable package",
    type: "media-kit",
    format: "zip",
    size: "15.6 MB",
    downloadUrl: "/press/media-kit-complete.zip",
    updatedAt: "2026-04-01",
  },
];

const resourceIcons = {
  "press-release": FileText,
  "fact-sheet": FileText,
  bio: Users,
  "media-kit": Image,
  "brand-guidelines": FileText,
};

const typeLabels = {
  "press-release": "Press Release",
  "fact-sheet": "Fact Sheet",
  bio: "Biography",
  "media-kit": "Media Kit",
  "brand-guidelines": "Brand Guidelines",
};

export function PressKit() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = async (resource: PressResource) => {
    setDownloading(resource.id);
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = resource.downloadUrl;
      link.download = `${resource.title.toLowerCase().replace(/\s+/g, "-")}.${resource.format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloading(null);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-star-dust">Press Kit</h2>
          <p className="text-sm text-star-dust/40 mt-1">
            Resources for media professionals
          </p>
        </div>
        <Badge variant="quantum" className="text-xs">
          Updated {new Date(pressResources[0].updatedAt).toLocaleDateString()}
        </Badge>
      </div>

      <div className="grid gap-4">
        {pressResources.map((resource) => {
          const Icon = resourceIcons[resource.type];
          return (
            <Card
              variant="glass"
              key={resource.id}
              data={{ id: resource.id, type: "value", title: resource.title, value: resource.format }}
              radius="lg"
              shadow="sm"
              className="p-4 hover:border-neurospark/30 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-neurospark/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-neurospark" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-star-dust">{resource.title}</h3>
                    <p className="text-sm text-star-dust/40 mt-1">{resource.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge variant="outline" size="sm" className="text-xs">
                        {typeLabels[resource.type]}
                      </Badge>
                      <Badge variant="outline" size="sm" className="text-xs">
                        {resource.format.toUpperCase()}
                      </Badge>
                      {resource.size && (
                        <span className="text-xs text-star-dust/30">{resource.size}</span>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(resource)}
                  disabled={downloading === resource.id}
                  className="shrink-0"
                >
                  {downloading === resource.id ? (
                    <>
                      <div className="w-4 h-4 border-2 border-neurospark border-t-transparent rounded-full animate-spin mr-2" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </>
                  )}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-neurospark/5 border border-neurospark/20 rounded-lg">
        <p className="text-sm text-star-dust/60">
          For press inquiries, interview requests, or additional materials, please contact our media team at{" "}
          <a href="mailto:press@sovereignsanctuary.com" className="text-neurospark hover:underline">
            press@sovereignsanctuary.com
          </a>
        </p>
      </div>
    </div>
  );
}