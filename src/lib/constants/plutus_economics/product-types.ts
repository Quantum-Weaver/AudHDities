/* @/lib/constants/economics/product-types.ts */

import { PRODUCT_CATEGORIES } from "../hestia_core";

export const PRODUCT_TYPES = { PRODUCT_CATEGORIES } as const;

export type PrductTypes = typeof PRODUCT_TYPES[keyof typeof PRODUCT_TYPES];