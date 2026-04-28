// src/components/cosmic/FavoriteButton.tsx
// FavoriteButton - Save effect to favorites

"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/yggdrasil/Button";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

export interface FavoriteButtonProps {
  effectId: string;
  className?: string;
}

export function FavoriteButton({ effectId, className }: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorite-effects") || "[]");
    setIsFavorited(favorites.includes(effectId));
  }, [effectId]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorite-effects") || "[]");
    let newFavorites;
    
    if (isFavorited) {
      newFavorites = favorites.filter((id: string) => id !== effectId);
    } else {
      newFavorites = [...favorites, effectId];
    }
    
    localStorage.setItem("favorite-effects", JSON.stringify(newFavorites));
    setIsFavorited(!isFavorited);
  };

  return (
    <div className={cn("p-6 bg-black/40 backdrop-blur-md rounded-xl border border-white/10", className)}>
      <h3 className="text-lg font-semibold text-star-dust mb-4">Save to Grimoire</h3>
      <Button
        variant={isFavorited ? "primary" : "outline"}
        onClick={toggleFavorite}
        className="w-full gap-2"
      >
        <motion.div
          animate={isFavorited ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <Heart className={cn("w-4 h-4", isFavorited && "fill-current")} />
        </motion.div>
        {isFavorited ? "Saved to Grimoire" : "Add to Grimoire"}
      </Button>
      <p className="text-xs text-star-dust/40 mt-3 text-center">
        Saved effects appear in your personal grimoire
      </p>
    </div>
  );
}