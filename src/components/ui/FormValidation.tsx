// components/ui/FormValidation.tsx
// FormValidation Component - Integration with validator system
// Provides validation hooks and error display for form fields

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Input, InputProps } from './Input';

export type ValidationStatus = 'idle' | 'validating' | 'valid' | 'invalid';

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

export type ValidatorFunction<T = any> = (value: T, allValues?: Record<string, any>) => string | null;

export interface FieldValidator {
  field: string;
  validate: ValidatorFunction;
}

interface FormValidationContextValue {
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isValidating: Record<string, boolean>;
  registerField: (name: string, validator?: ValidatorFunction) => void;
  unregisterField: (name: string) => void;
  setFieldValue: (name: string, value: any) => void;
  setFieldTouched: (name: string, touched: boolean) => void;
  validateField: (name: string, value?: any) => Promise<boolean>;
  validateForm: () => Promise<boolean>;
  isValid: boolean;
}

const FormValidationContext = createContext<FormValidationContextValue | null>(null);

export const useFormValidation = () => {
  const context = useContext(FormValidationContext);
  if (!context) {
    throw new Error('useFormValidation must be used within a FormValidationProvider');
  }
  return context;
};

export interface FormValidationProviderProps {
  /** Initial form values */
  initialValues?: Record<string, any>;
  /** Field validators */
  validators?: FieldValidator[];
  /** Validate on change */
  validateOnChange?: boolean;
  /** Validate on blur */
  validateOnBlur?: boolean;
  /** Children */
  children: React.ReactNode;
  /** Callback when form becomes valid */
  onValid?: () => void;
  /** Callback when form becomes invalid */
  onInvalid?: () => void;
}

/**
 * FormValidationProvider - Context provider for form validation
 * 
 * @example
 * <FormValidationProvider
 *   initialValues={{ email: '', password: '' }}
 *   validators={[
 *     { field: 'email', validate: (value) => !value ? 'Email is required' : null },
 *     { field: 'password', validate: (value) => value?.length < 6 ? 'Password too short' : null },
 *   ]}
 * >
 *   <Form>
 *     <FormField label="Email">
 *       <ValidatedInput name="email" />
 *     </FormField>
 *   </Form>
 * </FormValidationProvider>
 */
export const FormValidationProvider = React.forwardRef<HTMLDivElement, FormValidationProviderProps>(
  (
    {
      initialValues = {},
      validators = [],
      validateOnChange = true,
      validateOnBlur = true,
      children,
      onValid,
      onInvalid,
    },
    ref
  ) => {
    const [values, setValues] = useState<Record<string, any>>(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isValidating, setIsValidating] = useState<Record<string, boolean>>({});
    const [fieldValidators, setFieldValidators] = useState<Map<string, ValidatorFunction>>(new Map());
    
    // Register validators from props
    useEffect(() => {
      const map = new Map<string, ValidatorFunction>();
      validators.forEach(({ field, validate }) => {
        map.set(field, validate);
      });
      setFieldValidators(map);
    }, [validators]);
    
    const registerField = useCallback((name: string, validator?: ValidatorFunction) => {
      if (validator) {
        setFieldValidators(prev => new Map(prev).set(name, validator));
      }
    }, []);
    
    const unregisterField = useCallback((name: string) => {
      setFieldValidators(prev => {
        const newMap = new Map(prev);
        newMap.delete(name);
        return newMap;
      });
    }, []);
    
    const validateField = useCallback(
      async (name: string, value?: any): Promise<boolean> => {
        const fieldValue = value !== undefined ? value : values[name];
        const validator = fieldValidators.get(name);
        
        if (!validator) {
          return true;
        }
        
        setIsValidating(prev => ({ ...prev, [name]: true }));
        
        // Simulate async validation (validator can be sync or async)
        let errorMessage: string | null = null;
        try {
          errorMessage = await validator(fieldValue, values);
        } catch (err) {
          errorMessage = err instanceof Error ? err.message : 'Validation error';
        }
        
        setIsValidating(prev => ({ ...prev, [name]: false }));
        
        setErrors(prev => {
          const newErrors = { ...prev };
          if (errorMessage) {
            newErrors[name] = errorMessage;
          } else {
            delete newErrors[name];
          }
          return newErrors;
        });
        
        return !errorMessage;
      },
      [fieldValidators, values]
    );
    
    const validateForm = useCallback(async (): Promise<boolean> => {
      const fieldNames = Array.from(fieldValidators.keys());
      const results = await Promise.all(fieldNames.map(name => validateField(name)));
      const allValid = results.every(r => r === true);
      
      // Mark all fields as touched
      const allTouched: Record<string, boolean> = {};
      fieldNames.forEach(name => { allTouched[name] = true; });
      setTouched(prev => ({ ...prev, ...allTouched }));
      
      return allValid;
    }, [fieldValidators, validateField]);
    
    const setFieldValue = useCallback(
      (name: string, value: any) => {
        setValues(prev => ({ ...prev, [name]: value }));
        if (validateOnChange) {
          validateField(name, value);
        }
      },
      [validateField, validateOnChange]
    );
    
    const setFieldTouched = useCallback(
      (name: string, isTouched: boolean) => {
        setTouched(prev => ({ ...prev, [name]: isTouched }));
        if (validateOnBlur && isTouched) {
          validateField(name);
        }
      },
      [validateField, validateOnBlur]
    );
    
    const isValid = Object.keys(errors).length === 0;
    
    // Trigger callbacks when validity changes
    const prevValidRef = React.useRef(isValid);
    useEffect(() => {
      if (isValid !== prevValidRef.current) {
        if (isValid) {
          onValid?.();
        } else {
          onInvalid?.();
        }
        prevValidRef.current = isValid;
      }
    }, [isValid, onValid, onInvalid]);
    
    const contextValue: FormValidationContextValue = {
      errors,
      touched,
      isValidating,
      registerField,
      unregisterField,
      setFieldValue,
      setFieldTouched,
      validateField,
      validateForm,
      isValid,
    };
    
    return (
      <FormValidationContext.Provider value={contextValue}>
        <div ref={ref}>
          {children}
        </div>
      </FormValidationContext.Provider>
    );
  }
);
FormValidationProvider.displayName = 'FormValidationProvider';

// ============================================================================
// VALIDATED INPUT
// ============================================================================

export interface ValidatedInputProps extends Omit<InputProps, 'error' | 'onChange' | 'onBlur'> {
  /** Field name */
  name: string;
  /** Custom validator */
  validate?: ValidatorFunction;
  onChange?: ValidatorFunction;
  onBlur?: ValidatorFunction;
  /** Validate on change */
  validateOnChange?: boolean;
  /** Validate on blur */
  validateOnBlur?: boolean;
}

/**
 * ValidatedInput - Input component with built-in validation
 * 
 * @example
 * <ValidatedInput
 *   name="email"
 *   label="Email"
 *   validate={(value) => !value ? 'Email is required' : null}
 * />
 */
export const ValidatedInput = React.forwardRef<HTMLInputElement, ValidatedInputProps>(
  (
    {
      name,
      validate,
      validateOnChange = true,
      validateOnBlur = true,
      onChange,
      onBlur,
      ...props
    },
    ref
  ) => {
    const {
      errors,
      touched,
      isValidating,
      registerField,
      unregisterField,
      setFieldValue,
      setFieldTouched,
    } = useFormValidation();
    
    useEffect(() => {
      registerField(name, validate);
      return () => unregisterField(name);
    }, [name, validate, registerField, unregisterField]);
    
    const error = touched[name] ? errors[name] : undefined;
    const isValidatingField = isValidating[name];
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFieldValue(name, value);
      if (validateOnChange) {
        // Validation triggered in setFieldValue
      }
      onChange?.(e);
    };
    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFieldTouched(name, true);
      if (validateOnBlur) {
        // Validation triggered in setFieldTouched
      }
      onBlur?.(e);
    };
    
    return (
      <Input
        ref={ref}
        name={name}
        error={error}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />
    );
  }
);
ValidatedInput.displayName = 'ValidatedInput';

// ============================================================================
// VALIDATION SUMMARY
// ============================================================================

export interface ValidationSummaryProps {
  /** Title of the summary */
  title?: string;
  /** Custom className */
  className?: string;
}

/**
 * ValidationSummary - Displays all form errors in one place
 * 
 * @example
 * <ValidationSummary title="Please fix the following errors:" />
 */
export const ValidationSummary = React.forwardRef<HTMLDivElement, ValidationSummaryProps>(
  ({ title = 'Please correct the following errors:', className }, ref) => {
    const { errors, touched } = useFormValidation();
    
    // Only show errors for touched fields
    const visibleErrors = Object.entries(errors).filter(([field]) => touched[field]);
    
    if (visibleErrors.length === 0) {
      return null;
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          'mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30',
          className
        )}
        role="alert"
      >
        <div className="flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-400">{title}</p>
            <ul className="mt-2 space-y-1">
              {visibleErrors.map(([field, message]) => (
                <li key={field} className="text-xs text-red-400">
                  {message}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
);
ValidationSummary.displayName = 'ValidationSummary';

// ============================================================================
// VALIDATION SUCCESS
// ============================================================================

export interface ValidationSuccessProps {
  /** Success message */
  message: string;
  /** Custom className */
  className?: string;
}

/**
 * ValidationSuccess - Displays success message when form is valid
 * 
 * @example
 * <ValidationSuccess message="All fields are valid!" />
 */
export const ValidationSuccess = React.forwardRef<HTMLDivElement, ValidationSuccessProps>(
  ({ message, className }, ref) => {
    const { isValid } = useFormValidation();
    
    if (!isValid) {
      return null;
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          'mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30',
          className
        )}
        role="status"
      >
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-400">{message}</p>
        </div>
      </div>
    );
  }
);
ValidationSuccess.displayName = 'ValidationSuccess';