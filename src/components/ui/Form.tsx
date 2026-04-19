// components/ui/Form.tsx
// Form Component - The container for form fields
// Manages form state, submission, and validation integration

import React, { createContext, useContext, useCallback, useId } from 'react';
import { cn } from '@/lib/utils';

export type FormLayout = 'vertical' | 'horizontal';
export type FormSpacing = 'none' | 'sm' | 'md' | 'lg';

interface FormContextValue {
  layout: FormLayout;
  spacing: FormSpacing;
  disabled: boolean;
  readOnly: boolean;
  formId: string;
}

const FormContext = createContext<FormContextValue | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('Form components must be used within a Form');
  }
  return context;
};

export interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** Layout orientation of form fields */
  layout?: FormLayout;
  /** Spacing between form fields */
  spacing?: FormSpacing;
  /** Disable all form fields */
  disabled?: boolean;
  /** Make all form fields read-only */
  readOnly?: boolean;
  /** Submit handler */
  onSubmit?: (data: Record<string, any>) => void | Promise<void>;
  /** Validation function */
  validate?: (data: Record<string, any>) => Record<string, string>;
  /** Children */
  children: React.ReactNode;
  /** Full width */
  fullWidth?: boolean;
}

const spacingClasses: Record<FormSpacing, string> = {
  none: 'gap-0',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
};

// Helper to extract name from child props safely
const getFieldNameFromChild = (child: React.ReactNode): string | undefined => {
  if (!React.isValidElement(child)) return undefined;
  
  const childElement = child as React.ReactElement<{ name?: string; children?: React.ReactNode }>;
  
  // Check if the child is a FormField
  if (typeof childElement.type === 'function' || typeof childElement.type === 'object') {
    const typeName = (childElement.type as any)?.displayName || (childElement.type as any)?.name;
    if (typeName === 'FormField') {
      // For FormField, look at its children (the input)
      const grandChildren = childElement.props.children;
      if (React.isValidElement(grandChildren)) {
        const grandChild = grandChildren as React.ReactElement<{ name?: string }>;
        return grandChild.props.name;
      }
    }
  }
  
  // Direct input child
  return childElement.props.name;
};

/**
 * Form Component
 * 
 * @example
 * <Form onSubmit={handleSubmit}>
 *   <FormField label="Name" required>
 *     <Input name="name" />
 *   </FormField>
 *   <FormField label="Email" required>
 *     <Input name="email" type="email" />
 *   </FormField>
 *   <Button type="submit">Submit</Button>
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
        
        // Collect form data
        const formData = new FormData(event.currentTarget);
        const data: Record<string, any> = {};
        formData.forEach((value, key) => {
          data[key] = value;
        });
        
        // Validate if validation function provided
        if (validate) {
          const validationErrors = validate(data);
          setErrors(validationErrors);
          if (Object.keys(validationErrors).length > 0) {
            // Scroll to first error
            const firstErrorField = Object.keys(validationErrors)[0];
            const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
            errorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
          }
        }
        
        // Submit
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
    
    // Inject error messages into FormField components
    const enhancedChildren = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;
      
      // Check if this is a FormField component
      const childType = child.type as any;
      const isFormField = childType?.displayName === 'FormField' || childType?.name === 'FormField';
      
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
    
    return (
      <FormContext.Provider value={contextValue}>
        <form
          ref={ref}
          onSubmit={handleSubmit}
          className={cn(
            'flex',
            layout === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
            spacingClasses[spacing],
            fullWidth && 'w-full',
            className
          )}
          noValidate
          {...props}
        >
          {enhancedChildren}
          
          {isSubmitting && (
            <div className="sr-only" aria-live="polite">
              Submitting form...
            </div>
          )}
        </form>
      </FormContext.Provider>
    );
  }
);

Form.displayName = 'Form';

// ============================================================================
// FORM ACTIONS
// ============================================================================

export interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Align the action buttons */
  align?: 'left' | 'center' | 'right';
  /** Space between buttons */
  spacing?: FormSpacing;
}

/**
 * FormActions - Container for form action buttons (Submit, Cancel, etc.)
 * 
 * @example
 * <FormActions>
 *   <Button type="submit">Save</Button>
 *   <Button type="button" variant="ghost">Cancel</Button>
 * </FormActions>
 */
export const FormActions = React.forwardRef<HTMLDivElement, FormActionsProps>(
  ({ children, align = 'right', spacing = 'md', className, ...props }, ref) => {
    const alignClasses = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
    };
    
    const spacingClasses: Record<FormSpacing, string> = {
      none: 'gap-0',
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          alignClasses[align],
          spacingClasses[spacing],
          'mt-4 pt-4 border-t border-white/10',
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

// ============================================================================
// FORM FIELD (Re-export for convenience)
// ============================================================================

// Re-export FormField from its own file to avoid circular imports
// The actual implementation is in FormField.tsx
export type { FormFieldProps } from './FormField';