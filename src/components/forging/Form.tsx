// src/components/forging/Form.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FORM COMPONENT                                         ║
// ║                    Container for form fields                              ║
// ║                    All values from COSMIC constants                       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import React, {
  createContext,
  useContext,
  useCallback,
  useId,
} from 'react';
import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  FormProps,
  FormActionsProps,
  FormContextValue,
} from '@/types/components/forging/form.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  FORM_FULL_WIDTH,
  FORM_FIELD_SPACING,
  FORM_ACTIONS_BUTTON_SPACING,
  FORM_SUBMITTING_MESSAGE,
} from '@/lib/constants/components/forging/form.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  formContainerVariants,
  formActionsContainerVariants,
  formActionsDividerClasses,
} from '@/lib/constants/components/forging/form.variants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  getFieldNameFromChild,
  collectFormData,
  scrollToFirstError,
} from '@/lib/utils/components/forging/form.utils';

// ═══════════════════════════════════════════════════════════════════════════
// CONTEXT
// ═══════════════════════════════════════════════════════════════════════════

const FormContext = createContext<FormContextValue | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('Form components must be used within a Form');
  }
  return context;
};

// ═══════════════════════════════════════════════════════════════════════════
// FORM — ROOT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Form — Container for form fields with layout, spacing, validation, and submission.
 *
 * Injects errors into child FormField components automatically.
 *
 * @example
 * <Form onSubmit={handleSubmit} layout="vertical" spacing="md">
 *   <FormField label="Name" required>
 *     <Input name="name" />
 *   </FormField>
 *   <FormActions>
 *     <Button type="submit">Save</Button>
 *   </FormActions>
 * </Form>
 */
export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  (
    {
      layout = 'vertical',
      spacing = 'md',
      disabled = false,
      readOnly = false,
      onSubmit,
      validate,
      children,
      fullWidth = true,
      className,
      ...props
    },
    ref
  ) => {
    const formId = useId();
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const contextValue: FormContextValue = {
      layout,
      spacing,
      disabled,
      readOnly,
      formId,
    };

    const handleSubmit = useCallback(
      async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data = collectFormData(formData);

        if (validate) {
          const validationErrors = validate(data);
          setErrors(validationErrors);
          if (Object.keys(validationErrors).length > 0) {
            scrollToFirstError(validationErrors);
            return;
          }
        }

        if (onSubmit) {
          setIsSubmitting(true);
          try {
            await onSubmit(data);
          } finally {
            setIsSubmitting(false);
          }
        }
      },
      [onSubmit, validate]
    );

    // Inject errors into child FormField components
    const enhancedChildren = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;

      const childType = child.type as any;
      const isFormField =
        childType?.displayName === 'FormField' ||
        childType?.name === 'FormField';

      if (isFormField) {
        const fieldName = getFieldNameFromChild(child);
        if (fieldName && errors[fieldName]) {
          return React.cloneElement(child as React.ReactElement<any>, {
            error: errors[fieldName],
          });
        }
      }

      return child;
    });

    const containerClass = formContainerVariants({ layout });

    return (
      <FormContext.Provider value={contextValue}>
        <form
          ref={ref}
          onSubmit={handleSubmit}
          className={cn(
            containerClass,
            FORM_FIELD_SPACING[spacing],
            fullWidth && FORM_FULL_WIDTH,
            className
          )}
          noValidate
          {...props}
        >
          {enhancedChildren}

          {isSubmitting && (
            <div className="sr-only" aria-live="polite">
              {FORM_SUBMITTING_MESSAGE}
            </div>
          )}
        </form>
      </FormContext.Provider>
    );
  }
);
Form.displayName = 'Form';

// ═══════════════════════════════════════════════════════════════════════════
// FORM ACTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * FormActions — Container for submit/cancel/reset buttons.
 *
 * @example
 * <FormActions align="right" spacing="md">
 *   <Button type="submit">Save</Button>
 *   <Button type="button" variant="ghost">Cancel</Button>
 * </FormActions>
 */
export const FormActions = React.forwardRef<HTMLDivElement, FormActionsProps>(
  (
    { children, align = 'right', spacing = 'md', className, ...props },
    ref
  ) => {
    const alignmentClass = formActionsContainerVariants({ align });

    return (
      <div
        ref={ref}
        className={cn(
          alignmentClass,
          FORM_ACTIONS_BUTTON_SPACING[spacing],
          formActionsDividerClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
FormActions.displayName = 'FormActions';

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export type {
  FormProps,
  FormActionsProps,
  FormContextValue,
  FormLayout,
  FormSpacing,
  FormActionsAlign,
} from '@/types/components/forging/form.types';

// Re-export FormField types for convenience
export type { FormFieldProps } from '@/types/components/forging/form_field.types';