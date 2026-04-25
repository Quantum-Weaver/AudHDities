
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SEARCHBAR TYPES                                        ║
// ║                    All type definitions                                   ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  SearchbarDensity,
  SearchbarWidth,
  SearchbarTheme,
  SearchbarSize,
  SearchbarSpinnerTheme,
} from '@/lib/constants/components/vegvisir/searchbar.variants';

// ─── Re-exports from variants ──────────────────────────────────────────────
export type {
  SearchbarDensity,
  SearchbarWidth,
  SearchbarTheme,
  SearchbarSize,
  SearchbarSpinnerTheme,
};

// ─── Component Props ───────────────────────────────────────────────────────
export interface SearchBarProps {
  /** Placeholder text shown when input is empty */
  placeholder?: string;
  /** Callback fired with debounced search query */
  onSearch: (query: string) => void;
  /** Initial value for the search input */
  initialValue?: string;
  /** Debounce delay in milliseconds before firing onSearch */
  debounceMs?: number;
  /** Additional classes for the outermost container */
  className?: string;
  /** Visual density of the search bar */
  density?: SearchbarDensity;
  /** Width strategy */
  width?: SearchbarWidth;
  /** Visual theme for the input */
  theme?: SearchbarTheme;
  /** Size of the input */
  size?: SearchbarSize;
  /** Spinner color theme */
  spinnerTheme?: SearchbarSpinnerTheme;
}