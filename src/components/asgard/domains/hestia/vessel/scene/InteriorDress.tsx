// src/components/asgard/domains/hestia/vessel/scene/InteriorDress.tsx
'use client';

import { useEffect, useState } from 'react';

interface ShelfItem { name: string; url: string | null }

/** Paints the vessel's worn interior behind the home, when one is worn. */
export function InteriorDress() {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/auth/vessel/inventory/interiors')
      .then((r) => r.json())
      .then((res) => {
        if (!res?.success) return;
        const worn = res.data?.worn as string | null;
        const items = (res.data?.items ?? []) as ShelfItem[];
        const item = worn ? items.find((i) => worn === i.name || worn.endsWith(`/${i.name}`)) : undefined;
        setUrl(item?.url ?? null);
      })
      .catch(() => {});
  }, []);

  if (!url) return null;
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${url})` }}
    />
  );
}
