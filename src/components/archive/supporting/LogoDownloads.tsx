// src/components/hephaestus/supporting/LogoDownloads.tsx
// Logo Downloads - All logo variations in one place

"use client";

import { useState } from "react";
import { Card } from "@/components/runes/cards/Card";
import { Button } from "@/components/yggdrasil/Button";
import { Badge } from "@/components/runes/Badge";
import { Download, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoVariant {
  id: string;
  name: string;
  description: string;
  format: "svg" | "png" | "pdf" | "zip";
  backgroundColor: "transparent" | "dark" | "light";
  previewColor: string;
  downloadUrl: string;
  size?: string;
}

const logoVariants: LogoVariant[] = [
  {
    id: "primary-color",
    name: "Primary Logo",
    description: "Full color logo for light backgrounds",
    format: "svg",
    backgroundColor: "transparent",
    previewColor: "bg-white",
    downloadUrl: "/press/logos/logo-primary.svg",
    size: "48 KB",
  },
  {
    id: "primary-white",
    name: "White Logo",
    description: "White logo for dark backgrounds",
    format: "svg",
    backgroundColor: "dark",
    previewColor: "bg-deep-space",
    downloadUrl: "/press/logos/logo-white.svg",
    size: "45 KB",
  },
  {
    id: "primary-black",
    name: "Black Logo",
    description: "Black logo for light backgrounds",
    format: "svg",
    backgroundColor: "light",
    previewColor: "bg-white",
    downloadUrl: "/press/logos/logo-black.svg",
    size: "46 KB",
  },
  {
    id: "icon-only",
    name: "Icon Only",
    description: "Sanctuary symbol without text",
    format: "svg",
    backgroundColor: "transparent",
    previewColor: "bg-white",
    downloadUrl: "/press/logos/logo-icon.svg",
    size: "12 KB",
  },
  {
    id: "horizontal",
    name: "Horizontal Logo",
    description: "Logo with text on the side",
    format: "svg",
    backgroundColor: "transparent",
    previewColor: "bg-white",
    downloadUrl: "/press/logos/logo-horizontal.svg",
    size: "52 KB",
  },
  {
    id: "favicon",
    name: "Favicon Pack",
    description: "Favicon files for web use",
    format: "zip",
    backgroundColor: "transparent",
    previewColor: "bg-white",
    downloadUrl: "/press/logos/favicon-pack.zip",
    size: "256 KB",
  },
];

export function LogoDownloads() {
  const [copied, setCopied] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = async (logo: LogoVariant) => {
    setDownloading(logo.id);
    
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = logo.downloadUrl;
      link.download = `${logo.id}.${logo.format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloading(null);
    }, 500);
  };

  const handleCopyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopied(color);
    setTimeout(() => setCopied(null), 2000);
  };

  const brandColors = [
    { name: "Quantum Purple", value: "#6C5CE7", variable: "--quantum-purple" },
    { name: "Cosmic Blue", value: "#0984E3", variable: "--cosmic-blue" },
    { name: "Fire Base", value: "#E17055", variable: "--fire-base" },
    { name: "Deep Space", value: "#0C0F1D", variable: "--deep-space" },
    { name: "Star Dust", value: "#E0E0E0", variable: "--star-dust" },
    { name: "Neurospark", value: "#22D3EE", variable: "--neurospark" },
  ];

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Logo Downloads</h2>
        <p className="text-sm text-white/40 mt-1">
          All logo variations for media use
        </p>
      </div>

      <div className="space-y-4">
        {logoVariants.map((logo) => (
          <div
            key={logo.id}
            className={cn(
              "p-4 rounded-lg border transition-all",
              logo.backgroundColor === "dark" ? "bg-deep-space border-white/10" : "bg-white/5 border-white/10"
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white">{logo.name}</h3>
                  <Badge variant="outline" size="sm">
                    {logo.format.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm text-white/40 mt-1">{logo.description}</p>
                {logo.size && (
                  <span className="text-xs text-white/30 mt-2 inline-block">
                    {logo.size}
                  </span>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(logo)}
                disabled={downloading === logo.id}
              >
                {downloading === logo.id ? (
                  <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </>
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Brand Colors */}
      <div className="pt-4 border-t border-white/10">
        <h3 className="font-semibold text-white mb-3">Brand Colors</h3>
        <div className="grid grid-cols-2 gap-3">
          {brandColors.map((color) => (
            <button
              key={color.value}
              onClick={() => handleCopyColor(color.value)}
              className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left"
            >
              <div
                className="w-8 h-8 rounded-full shrink-0"
                style={{ backgroundColor: color.value }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{color.name}</p>
                <p className="text-xs text-white/40 font-mono">{color.value}</p>
              </div>
              {copied === color.value ? (
                <Check className="w-4 h-4 text-green-400 shrink-0" />
              ) : (
                <Copy className="w-4 h-4 text-white/40 shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Usage Guidelines */}
      <div className="pt-4 border-t border-white/10">
        <h3 className="font-semibold text-white mb-2">Usage Guidelines</h3>
        <ul className="text-sm text-white/40 space-y-1 list-disc list-inside">
          <li>Do not alter, distort, or change logo colors</li>
          <li>Maintain clear space around the logo (half the logo height)</li>
          <li>Use white logo on dark backgrounds, color logo on light backgrounds</li>
          <li>Minimum size: 32px height for digital, 0.5 inches for print</li>
          <li>For questions, contact brand@sovereignsanctuary.com</li>
        </ul>
      </div>
    </Card>
  );
}