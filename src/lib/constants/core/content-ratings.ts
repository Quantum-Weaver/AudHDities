/* lib/constants/core/content-ratings.ts */

export const CONTENT_RATINGS = {
  "general": "General",
  "mature": "Mature",
  "triggering": "Triggering",
  "explicit": "Explicit"
}

export type ContentRatings = typeof CONTENT_RATINGS[keyof typeof CONTENT_RATINGS];