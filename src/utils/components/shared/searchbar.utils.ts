// src/utils/components/shared/searchbar.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SEARCHBAR UTILITIES                                    ║
// ║                    Debounce, class composition                            ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

/**
 * Creates a debounced version of a function.
 * Used internally by SearchBar — extracted for reusability and testability.
 *
 * @param fn - The function to debounce
 * @param delayMs - Delay in milliseconds
 * @returns Debounced function with cancel capability
 */
export function createDebouncedSearch<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delayMs: number
): { invoke: (...args: Args) => void; cancel: () => void } {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const invoke = (...args: Args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
      timeout = null;
    }, delayMs);
  };

  const cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return { invoke, cancel };
}