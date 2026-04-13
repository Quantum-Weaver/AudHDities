/* src/lib/utils/formatting/display-names.ts */
export const formatDisplayName = (displayName: string | null, username: string): string => {
  if (displayName && displayName.trim()) return displayName.trim();
  return username;
};

export const getInitials = (name: string): string => {
  if (!name) return '?';
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export const truncateBio = (bio: string | null, maxLength: number = 160): string => {
  if (!bio) return '';
  if (bio.length <= maxLength) return bio;
  return bio.slice(0, maxLength).trim() + '...';
};