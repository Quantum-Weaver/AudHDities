// src/components/shared/UnifiedGrid.tsx
// Unified Grid Component - Replaces 10+ grid variants

"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Constants
import {
  GRID_VARIANTS,
  GRID_VARIANT_CLASSES,
  GRID_ANIMATIONS,
  DEFAULT_GRID_VARIANT,
  DEFAULT_GRID_GAP,
  DEFAULT_CONTAINER_CLASS,
  GRID_COLUMNS
} from "@/lib/constants/components/ui/unified_grid";

// Types
import type { 
  UnifiedGridProps, 
  GridItemProps,
  GridColumnConfig,  // Now imported from types file
} from "@/types/components/ui/unified_grid";

// Utils
import {
  isMasonryGrid,
  distributeMasonryItems,
  getAllColumnClasses,
  getGapForVariant
} from "@/utils/components/ui/unified_grid";

// Internal Components
function GridItem({
  children,
  index,
  isAnimated = true,
  isHoverable = true,
  onClick,
  className,
}: GridItemProps) {
  const itemContent = (
    <div
      className={cn(
        "w-full h-full transition-all duration-200",
        isHoverable && "hover:scale-[1.02] hover:z-10",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );

  if (isAnimated) {
    return (
      <motion.div
        variants={GRID_ANIMATIONS.item}
        custom={index}
        className="w-full"
      >
        {itemContent}
      </motion.div>
    );
  }

  return itemContent;
}

// Main Component
export function UnifiedGrid<T = any>({
  variant = DEFAULT_GRID_VARIANT,
  items,
  renderItem,
  getKey,
  gap,
  columns,
  className,
  gridClassName,
  animated = true,
  hoverable = true,
  emptyState,
  loadingState,
  isLoading = false,
  onItemClick,
  limit,
  masonry = false,
}: UnifiedGridProps<T>) {
  const finalGap = getGapForVariant(variant, gap);
  const columnClasses = getAllColumnClasses(variant, columns as GridColumnConfig | undefined);
  const variantClass = GRID_VARIANT_CLASSES[variant];
  const isMasonry = masonry || isMasonryGrid(variant);

  const displayItems = useMemo(() => {
    if (limit && items.length > limit) {
      return items.slice(0, limit);
    }
    return items;
  }, [items, limit]);

  // Loading state
  if (isLoading && loadingState) {
    return <div className={cn(DEFAULT_CONTAINER_CLASS, className)}>{loadingState}</div>;
  }

  // Empty state
  if (!displayItems.length && emptyState) {
    return <div className={cn(DEFAULT_CONTAINER_CLASS, className)}>{emptyState}</div>;
  }

  // Get column count for masonry
  const getColumnCount = () => {
    const config = columns || GRID_COLUMNS[variant];
    return config.desktop || 3;
  };

  // Masonry layout
  if (isMasonry && displayItems.length > 0) {
    const columnCount = getColumnCount();
    const masonryColumns = distributeMasonryItems(displayItems, columnCount);

    return (
      <div className={cn(DEFAULT_CONTAINER_CLASS, className)}>
        <div
          className={cn(
            "grid",
            `gap-${finalGap.replace('gap-', '')}`,
            `grid-cols-1 md:grid-cols-2 lg:grid-cols-${columnCount}`,
            variantClass,
            gridClassName
          )}
        >
          {masonryColumns.map((columnItems, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-4">
              {columnItems.map((item, itemIndex) => {
                const key = getKey ? getKey(item, itemIndex) : `${colIndex}-${itemIndex}`;
                const globalIndex = colIndex * columnCount + itemIndex;
                return (
                  <GridItem
                    key={key}
                    index={globalIndex}
                    isAnimated={animated}
                    isHoverable={hoverable}
                    onClick={() => onItemClick?.(item, globalIndex)}
                  >
                    {renderItem(item, globalIndex)}
                  </GridItem>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Standard grid layout
  return (
    <motion.div
      className={cn(DEFAULT_CONTAINER_CLASS, className)}
      initial={animated ? GRID_ANIMATIONS.container.initial : undefined}
      animate={animated ? GRID_ANIMATIONS.container.animate : undefined}
      transition={animated ? GRID_ANIMATIONS.container.transition : undefined}
    >
      <div
        className={cn(
          "grid",
          finalGap,
          columnClasses,
          variantClass,
          gridClassName
        )}
      >
        <AnimatePresence mode="wait">
          {displayItems.map((item, index) => {
            const key = getKey ? getKey(item, index) : index;
            return (
              <GridItem
                key={key}
                index={index}
                isAnimated={animated}
                isHoverable={hoverable}
                onClick={() => onItemClick?.(item, index)}
              >
                {renderItem(item, index)}
              </GridItem>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Re-export constants for convenience
export { GRID_VARIANTS };