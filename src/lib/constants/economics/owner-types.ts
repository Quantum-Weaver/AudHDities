/* @/lib/constants/economics/owner-types.ts */

export const OWNER_TYPES = {
    'creator':'Creator',
    'vendor':'Vendor'
}

export type OwnerTypes = typeof OWNER_TYPES[keyof typeof OWNER_TYPES];