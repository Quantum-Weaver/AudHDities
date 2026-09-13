// src/components/asgard/domains/iris/profile/href.ts

/** The public profile room's front door. */
export const PROFILE_ROOM = '/connect/profile';

/** The room's address for one vessel, keyed on profile slug or vessel id. */
export function profileHref(key: string): string {
  return `${PROFILE_ROOM}/${encodeURIComponent(key)}`;
}
