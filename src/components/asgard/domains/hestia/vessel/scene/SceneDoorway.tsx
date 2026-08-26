// src/components/asgard/domains/hestia/vessel/scene/SceneDoorway.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE SIGHT-LINE — a doorway you can SEE from inside this room           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import Link from 'next/link';
import { REALM_TRIO_MAP, type RealmKey } from '@/lib/constants/systems/trio';
import { cn } from '@/lib/utils';

export interface SceneDoorwayProps {
  /** Where this doorway leads. */
  href: string;
  /** The door's plain-word label (settled tongue). */
  label: string;
  /** The realm whose light leaks gently through the threshold. */
  realm: RealmKey;
  /** One quiet line under the label (optional — plain words only). */
  whisper?: string;
  className?: string;
}

export default function SceneDoorway({
  href,
  label,
  realm,
  whisper,
  className,
}: SceneDoorwayProps) {
  const config = REALM_TRIO_MAP[realm];

  return (
    <Link
      href={href}
      className={cn(
        'group relative block rounded-lg border border-star-dust/10',
        'bg-(--color-surface)/70 p-4 pl-5 overflow-hidden',
        'transition-colors motion-reduce:transition-none',
        'hover:border-star-dust/25 focus-visible:border-star-dust/25',
        className
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 opacity-70"
        style={{ backgroundImage: config.beamGradient }}
      />
      <span className="block text-sm font-medium text-star-dust">{label}</span>
      {whisper && (
        <span className="mt-0.5 block text-xs text-star-dust/50">{whisper}</span>
      )}
    </Link>
  );
}
