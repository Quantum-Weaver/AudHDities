// components/ui/grids/Grid.tsx - CLEAN DRY VERSION
'use client'
import { ReactNode } from 'react'
import { GridVariant, GridGap, GridColumns } from '@/types/cosmic/'
import { GRID_GAPS, GRID_COLUMNS} from '@/lib/constants/systems/layout/breakpoints'

interface GridProps {
  children: ReactNode
  variant?: GridVariant
  columns?: GridColumns
  gap?: GridGap
  className?: string
  animate?: boolean
}

export const Grid = ({
  children,
  variant = 'cards_organization',
  columns,
  gap = 'balanced_standard',
  className = '',
  animate = false
}: GridProps) => {
  const gridClass = columns ? GRID_COLUMNS : variant
  
  return (
    <div className={`
      grid ${gridClass} ${GRID_GAPS}
      ${animate ? 'animate-fade-in-up' : ''}
      ${className}
    `}>
      {children}
    </div>
  )
}