// src/components/hephaestus/supporting/MediaAssets.tsx
// Media Assets - Images, videos, and audio assets for press

"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/runes/cards/Card";
import { Button } from "@/components/yggdrasil/Button";
import { Badge } from "@/components/runes/Badge";
import { Download, Image as ImageIcon, Video, Music, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaAsset {
  id: string;
  title: string;
  description: string;
  type: "photo" | "logo" | "video" | "audio" | "screenshot";
  format: string;
  dimensions?: string;
  size?: string;
  previewUrl: string;
  downloadUrl: string;
}

const mediaAssets: MediaAsset[] = [
  {
    id: "sanctuary-hero",
    title: "Sanctuary Hero Image",
    description: "The Sovereign Sanctuary's main hero image - cosmic campfire scene",
    type: "photo",
    format: "jpg",
    dimensions: "1920x1080",
    size: "1.2 MB",
    previewUrl: "/press/assets/sanctuary-hero-preview.jpg",
    downloadUrl: "/press/assets/sanctuary-hero.jpg",
  },
  {
    id: "quantum-weaver-portrait",
    title: "Quantum Weaver Portrait",
    description: "Official portrait of the Quantum Weaver",
    type: "photo",
    format: "jpg",
    dimensions: "1200x1500",
    size: "0.9 MB",
    previewUrl: "/press/assets/quantum-weaver-preview.jpg",
    downloadUrl: "/press/assets/quantum-weaver.jpg",
  },
  {
    id: "logo-primary",
    title: "Primary Logo",
    description: "Sovereign Sanctuary primary logo - full color",
    type: "logo",
    format: "svg",
    size: "0.1 MB",
    previewUrl: "/press/assets/logo-primary-preview.svg",
    downloadUrl: "/press/assets/logo-primary.svg",
  },
  {
    id: "logo-white",
    title: "White Logo",
    description: "Sovereign Sanctuary logo - white version for dark backgrounds",
    type: "logo",
    format: "svg",
    size: "0.1 MB",
    previewUrl: "/press/assets/logo-white-preview.svg",
    downloadUrl: "/press/assets/logo-white.svg",
  },
  {
    id: "promo-video",
    title: "Sanctuary Promo Video",
    description: "2-minute overview of the Sovereign Sanctuary",
    type: "video",
    format: "mp4",
    size: "45 MB",
    previewUrl: "/press/assets/promo-video-preview.jpg",
    downloadUrl: "/press/assets/promo-video.mp4",
  },
];

const typeIcons = {
  photo: ImageIcon,
  logo: ImageIcon,
  video: Video,
  audio: Music,
  screenshot: ImageIcon,
};

const typeLabels = {
  photo: "Photo",
  logo: "Logo",
  video: "Video",
  audio: "Audio",
  screenshot: "Screenshot",
};

export function MediaAssets() {
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = async (asset: MediaAsset) => {
    setDownloading(asset.id);
    
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = asset.downloadUrl;
      link.download = `${asset.title.toLowerCase().replace(/\s+/g, "-")}.${asset.format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloading(null);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Media Assets</h2>
        <p className="text-sm text-white/40 mt-1">
          Downloadable images, logos, and videos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mediaAssets.map((asset) => {
          const Icon = typeIcons[asset.type];
          
          return (
            <Card
              key={asset.id}
              className="overflow-hidden hover:border-cyan-500/30 transition-all cursor-pointer"
              onClick={() => setSelectedAsset(asset)}
            >
              {/* Preview Image */}
              <div className="aspect-video w-full bg-black/40 relative overflow-hidden">
                {asset.type === "video" ? (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
                    <Video className="w-12 h-12 text-white/20" />
                  </div>
                ) : (
                  <img
                    src={asset.previewUrl}
                    alt={asset.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                )}
                <div className="absolute top-2 right-2">
                  <Badge variant="quantum" size="sm" className="bg-black/50">
                    {typeLabels[asset.type]}
                  </Badge>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-white">{asset.title}</h3>
                <p className="text-sm text-white/40 mt-1 line-clamp-2">
                  {asset.description}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 text-xs text-white/30">
                    {asset.dimensions && <span>{asset.dimensions}</span>}
                    {asset.size && <span>{asset.size}</span>}
                    <span>{asset.format.toUpperCase()}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(asset);
                    }}
                    disabled={downloading === asset.id}
                  >
                    {downloading === asset.id ? (
                      <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Asset Modal */}
      {selectedAsset && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedAsset(null)}
        >
          <div
            className="relative max-w-4xl w-full mx-4 bg-surface rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-black/40">
              {selectedAsset.type === "video" ? (
                <video
                  src={selectedAsset.previewUrl}
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={selectedAsset.downloadUrl}
                  alt={selectedAsset.title}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white">{selectedAsset.title}</h3>
              <p className="text-white/60 mt-2">{selectedAsset.description}</p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-3 text-sm text-white/40">
                  {selectedAsset.dimensions && <span>{selectedAsset.dimensions}</span>}
                  {selectedAsset.size && <span>{selectedAsset.size}</span>}
                  <span>{selectedAsset.format.toUpperCase()}</span>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setSelectedAsset(null)}>
                    Close
                  </Button>
                  <Button onClick={() => handleDownload(selectedAsset)}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
            <button
              className="absolute top-4 right-4 text-white/60 hover:text-white"
              onClick={() => setSelectedAsset(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}