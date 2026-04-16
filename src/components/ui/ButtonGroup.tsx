// @/components/ui/ButtonGroup.tsx
// NEUTRAL BUTTON GROUP FOUNDATION
// No visual opinions. Structure only.
// Variants come from design system via className.

"use client"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/Separator"
import { forwardRef } from "react"

export interface ButtonGroupProps extends React.ComponentProps<"div"> {
  /** Orientation of the button group */
  orientation?: "horizontal" | "vertical"
}

/**
 * Neutral Button Group Component
 * 
 * Groups buttons together horizontally or vertically.
 * No visual styling—only structural layout.
 * 
 * Usage:
 *   <ButtonGroup orientation="horizontal">
 *     <Button>Save</Button>
 *     <Button>Cancel</Button>
 *   </ButtonGroup>
 * 
 * With design system variants:
 *   <ButtonGroup className="gap-2">
 *     <Button className="btn-primary">Save</Button>
 *     <Button className="btn-secondary">Cancel</Button>
 *   </ButtonGroup>
 */
const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = "horizontal", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        data-slot="button-group"
        data-orientation={orientation}
        className={cn(
          // Base structural styles (no visual opinions)
          "flex w-fit items-stretch",
          orientation === "horizontal"
            ? "flex-row"
            : "flex-col",
          // All visual styling comes from className
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ButtonGroup.displayName = "ButtonGroup"

export interface ButtonGroupTextProps extends useRender.ComponentProps<"div"> {}

/**
 * Neutral Button Group Text
 * 
 * Text element within a button group (e.g., "or" between buttons).
 */
const ButtonGroupText = forwardRef<HTMLDivElement, ButtonGroupTextProps>(
  ({ className, render, ...props }, ref) => {
    return useRender({
      defaultTagName: "div",
      props: mergeProps<"div">(
        {
          ref,
          className: cn(
            // Base structural styles only
            "flex items-center gap-2",
            // All visual styling comes from className
            className
          ),
        },
        props
      ),
      render,
      state: {
        slot: "button-group-text",
      },
    })
  }
)

ButtonGroupText.displayName = "ButtonGroupText"

export interface ButtonGroupSeparatorProps extends React.ComponentProps<typeof Separator> {
  orientation?: "horizontal" | "vertical"
}

/**
 * Neutral Button Group Separator
 * 
 * Separator between buttons in a group.
 */
const ButtonGroupSeparator = forwardRef<HTMLDivElement, ButtonGroupSeparatorProps>(
  ({ className, orientation = "vertical", ...props }, ref) => {
    return (
      <Separator
        ref={ref}
        data-slot="button-group-separator"
        orientation={orientation}
        className={cn(
          // Base structural styles only
          "relative self-stretch",
          orientation === "vertical"
            ? "h-auto w-px"
            : "h-px w-auto",
          // All visual styling comes from className
          className
        )}
        {...props}
      />
    )
  }
)

ButtonGroupSeparator.displayName = "ButtonGroupSeparator"

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText }