// src/components/ui/Modal.tsx
"use client";

import { forwardRef } from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "@/lib/utils";
import { modalOverlayVariants, modalContentVariants, type ModalVariant, type ModalSize } from "@/lib/constants/components/ui/modal_variants";
import { Button } from "./Button";
import { XIcon } from "lucide-react";

export interface ModalProps extends DialogPrimitive.Root.Props {
  variant?: ModalVariant;
  size?: ModalSize;
  title?: string;
  description?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ variant = "default", size = "md", title, description, showCloseButton = true, onClose, children, ...props }, ref) => {
    return (
      <DialogPrimitive.Root {...props}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Backdrop className={cn(modalOverlayVariants({ variant }))} />
          <DialogPrimitive.Popup
            ref={ref}
            className={cn(modalContentVariants({ variant, size }))}
          >
            {showCloseButton && (
              <DialogPrimitive.Close
                onClick={onClose}
                className="absolute top-3 right-3"
                render={() => <Button variant="ghost" size="icon-sm"><XIcon className="h-4 w-4" /></Button>}
              />
            )}
            {title && (
              <DialogPrimitive.Title className="text-lg font-semibold text-white mb-2">
                {title}
              </DialogPrimitive.Title>
            )}
            {description && (
              <DialogPrimitive.Description className="text-sm text-white/60 mb-4">
                {description}
              </DialogPrimitive.Description>
            )}
            {children}
          </DialogPrimitive.Popup>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  }
);

Modal.displayName = "Modal";

export { Modal };