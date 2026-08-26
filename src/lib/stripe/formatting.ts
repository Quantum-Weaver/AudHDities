// src/lib/stripe/formatting.ts

/**
 * Supported currencies
 */
export type SupportedCurrency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY';

/**
 * Currency display configuration
 */
const CURRENCY_CONFIG: Record<SupportedCurrency, { symbol: string; code: string; decimalPlaces: number }> = {
  USD: { symbol: '$', code: 'USD', decimalPlaces: 2 },
  EUR: { symbol: '€', code: 'EUR', decimalPlaces: 2 },
  GBP: { symbol: '£', code: 'GBP', decimalPlaces: 2 },
  CAD: { symbol: 'C$', code: 'CAD', decimalPlaces: 2 },
  AUD: { symbol: 'A$', code: 'AUD', decimalPlaces: 2 },
  JPY: { symbol: '¥', code: 'JPY', decimalPlaces: 0 },
};

/**
 * Get user's locale currency (browser detection)
 */
export function getUserCurrency(): SupportedCurrency {
  if (typeof window === 'undefined') return 'USD';
  
  try {
    const locale = navigator.language;
    const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' });
    const parts = formatter.formatToParts(0);
    const currencyPart = parts.find(part => part.type === 'currency');
    
    if (currencyPart?.value) {
      const currencyMap: Record<string, SupportedCurrency> = {
        '$': 'USD',
        '€': 'EUR',
        '£': 'GBP',
        'C$': 'CAD',
        'A$': 'AUD',
        '¥': 'JPY',
      };
      return currencyMap[currencyPart.value] || 'USD';
    }
  } catch {
    // Fallback to USD
  }
  
  return 'USD';
}

/**
 * Format a number as currency with proper locale support
 */
export function formatPrice(
  price: number | null | undefined, 
  currency: SupportedCurrency = 'USD'
): string {
  if (price === null || price === undefined) return '—';
  
  const config = CURRENCY_CONFIG[currency];
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: config.code,
    minimumFractionDigits: config.decimalPlaces,
    maximumFractionDigits: config.decimalPlaces,
  }).format(price);
}

/**
 * Format price with user's detected currency
 */
export function formatPriceLocalized(price: number | null | undefined): string {
  const currency = getUserCurrency();
  return formatPrice(price, currency);
}

/**
 * Convert price between currencies (simplified - in production use exchange rate API)
 */
export function convertPrice(price: number, from: SupportedCurrency, to: SupportedCurrency): number {
  const rates: Record<SupportedCurrency, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    CAD: 1.35,
    AUD: 1.52,
    JPY: 150.2,
  };
  
  const usdAmount = price / rates[from];
  return usdAmount * rates[to];
}

/**
 * Format a number with commas
 */
export function formatNumber(num: number | null | undefined): string {
  if (num === null || num === undefined) return '0';
  
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Format a date to readable string with user's timezone
 */
export function formatDate(date: string | null | undefined): string {
  if (!date) return 'Unknown date';
  
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }).format(new Date(date));
}

/**
 * Format a date with time and user's timezone
 */
export function formatDateTime(date: string | null | undefined): string {
  if (!date) return 'Unknown date';
  
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }).format(new Date(date));
}

/**
 * Get relative time (e.g., "2 hours ago") with user's locale
 */
export function formatRelativeTime(date: string | null | undefined): string {
  if (!date) return 'Unknown';
  
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);
  
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return rtf.format(-diffMins, 'minute');
  if (diffHours < 24) return rtf.format(-diffHours, 'hour');
  if (diffDays < 7) return rtf.format(-diffDays, 'day');
  if (diffWeeks < 4) return rtf.format(-diffWeeks, 'week');
  if (diffMonths < 12) return rtf.format(-diffMonths, 'month');
  
  return rtf.format(-diffYears, 'year');
}