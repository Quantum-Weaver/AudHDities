/* lib/constants/core/business-types.ts */

export const BUSINESS_TYPES = {
  "sole_proprietor": "Sole Proprietor",
  "llc": "LLC",
  "nonprofit": "Nonprofit",
  "cooperative": "Cooperative",
  "partnership": "Partnership",
  "other": "Other"
}

export type BusinessTypes = typeof BUSINESS_TYPES[keyof typeof BUSINESS_TYPES];