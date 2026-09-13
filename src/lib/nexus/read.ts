// src/lib/nexus/read.ts
// The shape every Nexus read answers in: a table, its rows, and the base's own
// message when the read was refused. A refusal is never an empty.

/** What a refused read says happened. */
export const REFUSED = 'the base refused this read';

/** The next step a refused read names. */
export function refusalNext(table: string): string {
  return `next · a read policy on ${table} for this visitor`;
}

export interface ReadResult<T> {
  table: string;
  rows: T[];
  fault: string | null;
}

/** A refused read, carrying the base's own message. */
export function refused(table: string, message: string): ReadResult<never> {
  return { table, rows: [], fault: message };
}

/** A read that answered, with no refusal. */
export function answered<T>(table: string, rows: T[]): ReadResult<T> {
  return { table, rows, fault: null };
}
