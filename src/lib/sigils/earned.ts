// src/lib/sigils/earned.ts

export interface AwardedSigil {
  sigil_id: string;
  trigger_type: string;
}

export async function readEarned(): Promise<Set<string> | null> {
  const res = await fetch('/api/auth/vessel/sigils')
    .then((r) => r.json())
    .catch(() => null);
  if (!res?.success || !Array.isArray(res.data)) return null;
  return new Set((res.data as Array<{ sigil_id: string }>).map((row) => row.sigil_id));
}

export async function claimSigils(): Promise<AwardedSigil[]> {
  const res = await fetch('/api/auth/vessel/sigils', { method: 'POST' })
    .then((r) => r.json())
    .catch(() => null);
  if (!res?.success || !Array.isArray(res.data)) return [];
  return res.data as AwardedSigil[];
}
