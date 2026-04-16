// components/ui/grids/Grid.tsx - CLEAN DRY VERSION
'use client'
import { ReactNode } from 'react'
import { GridGap } from '@/types/cosmic/'
import { GRID_GAPS, GRID_COLUMNS} from '@/lib/constants/systems/layout/breakpoints'

interface GridProps {
  children: ReactNode
  variant?: string
  columns?: number
  gap?: GridGap
  className?: string
  animate?: boolean
}

export const Grid = ({
  children,
  variant = 'cards_organization',
  columns,
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