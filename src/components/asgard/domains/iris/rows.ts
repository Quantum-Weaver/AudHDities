// src/components/asgard/domains/iris/rows.ts

interface ListPayload<T> {
  success?: boolean;
  data?: { data?: T[] | null } | T[] | null;
}

interface SinglePayload<T> {
  success?: boolean;
  data?: T | null;
}

/** Reads the rows out of a generated list route's response. */
export function readRows<T>(payload: ListPayload<T> | null | undefined): T[] {
  if (!payload?.success) return [];
  const body = payload.data;
  if (Array.isArray(body)) return body;
  return body?.data ?? [];
}

/** Reads the single record out of a generated record route's response. */
export function readRow<T>(payload: SinglePayload<T> | null | undefined): T | null {
  if (!payload?.success) return null;
  return payload.data ?? null;
}
