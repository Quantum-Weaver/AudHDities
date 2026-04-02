/* @/lib/constants/cosmic/default-avatar.ts */
export const DEFAULT_AVATAR = '/images/default-avatar.svg';

export const DEFAULT_BANNER = '/images/default-banner.svg';

export const getInitials = (name: string): string => {
  if (!name) return '?';
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};