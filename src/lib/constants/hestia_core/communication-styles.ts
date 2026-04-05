/* lib/constants/core/communication-styles.ts */

export const COMMUNICATION_STYLES = {
  "direct": "Direct",
  "gentle": "Gentle",
  "detailed": "Detailed",
  "concise": "Concise"
}

export type CommunicationStyles = typeof COMMUNICATION_STYLES[keyof typeof COMMUNICATION_STYLES];