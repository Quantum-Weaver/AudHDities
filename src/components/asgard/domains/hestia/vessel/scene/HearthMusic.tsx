// src/components/asgard/domains/hestia/vessel/scene/HearthMusic.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   HEARTH MUSIC — sound worn at last, opt-in at the gesture itself        ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
// The seam this closes (filed on the Hearth bus): interior.music_url was
// deliberately UNWORN "until the Sanctum offers sound opt-in." The finishing
// wears it with consent STRICTER than any setting: sound exists only while
// the vessel holds it open — tap to play, tap to still, preload none, never
// autoplay, no loop past the vessel's own choice to leave it playing. The
// sensory law's row is satisfied at the gesture, not in a config screen:
// every play is its own opt-in.

'use client';

import { useEffect, useRef, useState } from 'react';
import { Music, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface HearthMusicProps {
  /** The home's own music (vessel_interiors.music_url). */
  src: string;
  className?: string;
}

export default function HearthMusic({ src, className }: HearthMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  // Still the music when the vessel leaves the room (unmount = silence;
  // sound never outlives the place it belongs to).
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      // The browser declined (autoplay policy or a bad URL) — stay silent,
      // stay honest: the button simply remains "Play".
      setPlaying(false);
    }
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        loop
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        className="rounded border border-star-dust/20 px-3 py-1.5 text-xs text-star-dust/80 transition-colors hover:border-star-dust/40 motion-reduce:transition-none"
      >
        {playing ? (
          <>
            <Square className="mr-1 inline h-3 w-3" aria-hidden="true" />
            Still the music
          </>
        ) : (
          <>
            <Music className="mr-1 inline h-3 w-3" aria-hidden="true" />
            Play the hearth&rsquo;s music
          </>
        )}
      </button>
      <span className="text-xs text-star-dust/40">
        Plays only when you ask. Stops when you leave.
      </span>
    </div>
  );
}
