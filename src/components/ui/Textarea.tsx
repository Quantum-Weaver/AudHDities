// src/components/ui/TextArea.tsx
"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { textareaVariants, type TextareaVariant, type TextareaSize } from "@/lib/constants/components/ui/textarea_variants";

export interface TextAreaProps extends React.ComponentProps<"textarea"> {
  variant?: TextareaVariant;
  size?: TextareaSize;
  resizable?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ variant = "default", size = "md", resizable = true, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(textareaVariants({ variant, size, resizable }), className)}
        {...props}
      />
    );
  }
);

TextArea.displayName = "TextArea";

export { TextArea };