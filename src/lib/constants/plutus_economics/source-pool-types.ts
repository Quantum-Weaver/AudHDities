/* @/lib/constants/economics/source-pool-types.ts */

export const SOURCE_POOL_TYPES = {
    'residual':'Residual',
    'covenant':'Covenant',
    'platform':'Platform'
}

export type SourcePoolTypes = typeof SOURCE_POOL_TYPES[keyof typeof SOURCE_POOL_TYPES];