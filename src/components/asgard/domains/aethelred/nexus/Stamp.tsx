// src/components/asgard/domains/aethelred/nexus/Stamp.tsx
'use client';

import { useSyncExternalStore } from 'react';

/** A row's own timestamp as YYYY-MM-DD · HH:MM, or null when the value is not a date. */
export function formatStamp(value: string, timeZone?: string): string | null {
  const at = new Date(value);
  if (Number.isNaN(at.getTime())) return null;
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(at);
  const part = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  const hour = part('hour') === '24' ? '00' : part('hour');
  return `${part('year')}-${part('month')}-${part('day')} · ${hour}:${part('minute')}`;
}

export interface StampProps {
  value: string;
  className?: string;
}

const noSubscription = () => () => {};

/** Renders a timestamp in UTC on the server and in the visitor's own zone in the browser. */
export function Stamp({ value, className }: StampProps) {
  const inVisitorZone = useSyncExternalStore(
    noSubscription,
    () => true,
    () => false
  );

  const text = formatStamp(value, inVisitorZone ? undefined : 'UTC') ?? value;
  return <span className={className}>{text}</span>;
}
