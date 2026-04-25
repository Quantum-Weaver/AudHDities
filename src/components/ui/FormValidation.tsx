// src/components/ui/FormValidation.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FORM VALIDATION COMPONENT                              ║
// ║                    Integration with validator system                      ║
// ║                    All visual values from COSMIC constants                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Input } from './Input';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  FormValidationProviderProps,
  FormValidationContextValue,
  ValidatedInputProps,
  ValidationSummaryProps,
  ValidationSuccessProps,
  ValidatorFunction,
  ValidationError,
  ValidationResult,
  FieldValidator,
  ValidationStatus,
} from '@/types/components/forging/form_validation.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  FORM_VALIDATION_SUMMARY_MARGIN_BOTTOM,
  FORM_VALIDATION_CONTENT_GAP,
  FORM_VALIDATION_ICON_SIZE,
  FORM_VALIDATION_ICON_MARGIN_TOP,
  FORM_VALIDATION_TITLE_SIZE,
  FORM_VALIDATION_TITLE_WEIGHT,
  FORM_VALIDATION_LIST_MARGIN_TOP,
  FORM_VALIDATION_LIST_SPACING,
  FORM_VALIDATION_LIST_ITEM_SIZE,
  FORM_VALIDATION_DEFAULT_SUMMARY_TITLE,
} from '@/lib/constants/components/ui/form_validation.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  formValidationSummaryVariants,
  formValidationTextVariants,
  formValidationSuccessVariants,
  formValidationSuccessTextVariants,
} from '@/lib/constants/components/ui/form_validation.variants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  executeValidator,
} from '@/lib/utils/components/forging/form_validation.utils';

// ═══════════════════════════════════════════════════════════════════════════
// CONTEXT
// ═══════════════════════════════════════════════════════════════════════════

const FormValidationContext =
  createContext<FormValidationContextValue | null>(null);

export const useFormValidation = () => {
  const context = useContext(FormValidationContext);
  if (!context) {
    throw new Error(
      'useFormValidation must be used within a FormValidationProvider'
    );
  }
  return context;
};

// ═══════════════════════════════════════════════════════════════════════════
// FORM VALIDATION PROVIDER
// ═══════════════════════════════════════════════════════════════════════════

/**
 * FormValidationProvider — Context provider wrapping form validation state.
 *
 * Tracks values, errors, touched state, and per-field validation.
 * Exposes `useFormValidation()` hook to children.
 *
 * @example
 * <FormValidationProvider
 *   validators={[
 *     { field: 'email', validate: (v) => !v ? 'Email is required' : null },
 *   ]}
 * >
 *   <ValidatedInput name="email" />
 * </FormValidationProvider>
 */
export const FormValidationProvider = React.forwardRef<
  HTMLDivElement,
  FormValidationProviderProps
>(
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
    const [isValidating, setIsValidating] = useState<
      Record<string, boolean>
    >({});
    const [fieldValidators, setFieldValidators] = useState<
      Map<string, ValidatorFunction>
    >(new Map());

    // Register validators from props
    useEffect(() => {
      const map = new Map<string, ValidatorFunction>();
      validators.forEach(({ field, validate }) => {
        map.set(field, validate);
      });
      setFieldValidators(map);
    }, [validators]);

    const registerField = useCallback(
      (name: string, validator?: ValidatorFunction) => {
        if (validator) {
          setFieldValidators((prev) => new Map(prev).set(name, validator));
        }
      },
      []
    );

    const unregisterField = useCallback((name: string) => {
      setFieldValidators((prev) => {
        const newMap = new Map(prev);
        newMap.delete(name);
        return newMap;
      });
    }, []);

    const validateField = useCallback(
      async (name: string, value?: any): Promise<boolean> => {
        const fieldValue = value !== undefined ? value : values[name];
        const validator = fieldValidators.get(name);

        if (!validator) return true;

        setIsValidating((prev) => ({ ...prev, [name]: true }));

        const errorMessage = await executeValidator(
          validator,
          fieldValue,
          values
        );

        setIsValidating((prev) => ({ ...prev, [name]: false }));

        setErrors((prev) => {
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
      const results = await Promise.all(
        fieldNames.map((name) => validateField(name))
      );
      const allValid = results.every((r) => r === true);

      const allTouched: Record<string, boolean> = {};
      fieldNames.forEach((name) => {
        allTouched[name] = true;
      });
      setTouched((prev) => ({ ...prev, ...allTouched }));

      return allValid;
    }, [fieldValidators, validateField]);

    const setFieldValue = useCallback(
      (name: string, value: any) => {
        setValues((prev) => ({ ...prev, [name]: value }));
        if (validateOnChange) {
          validateField(name, value);
        }
      },
      [validateField, validateOnChange]
    );

    const setFieldTouched = useCallback(
      (name: string, isTouched: boolean) => {
        setTouched((prev) => ({ ...prev, [name]: isTouched }));
        if (validateOnBlur && isTouched) {
          validateField(name);
        }
      },
      [validateField, validateOnBlur]
    );

    const isValid = Object.keys(errors).length === 0;

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
        <div ref={ref}>{children}</div>
      </FormValidationContext.Provider>
    );
  }
);
FormValidationProvider.displayName = 'FormValidationProvider';

// ═══════════════════════════════════════════════════════════════════════════
// VALIDATED INPUT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * ValidatedInput — Input component with built-in validation from context.
 *
 * @example
 * <ValidatedInput
 *   name="email"
 *   label="Email"
 *   validate={(value) => !value ? 'Email is required' : null}
 * />
 */
export const ValidatedInput = React.forwardRef<
  HTMLInputElement,
  ValidatedInputProps
>(
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFieldValue(name, value);
      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFieldTouched(name, true);
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

// ═══════════════════════════════════════════════════════════════════════════
// VALIDATION SUMMARY
// ═══════════════════════════════════════════════════════════════════════════

/**
 * ValidationSummary — Displays all form errors for touched fields.
 *
 * @example
 * <ValidationSummary title="Please fix the following errors:" />
 */
export const ValidationSummary = React.forwardRef<
  HTMLDivElement,
  ValidationSummaryProps
>(
  (
    {
      title = FORM_VALIDATION_DEFAULT_SUMMARY_TITLE,
      variant = 'error',
      className,
    },
    ref
  ) => {
    const { errors, touched } = useFormValidation();

    const visibleErrors = Object.entries(errors).filter(
      ([field]) => touched[field]
    );

    if (visibleErrors.length === 0) return null;

    const summaryClass = formValidationSummaryVariants({ variant });
    const textClass = formValidationTextVariants({ variant });

    return (
      <div
        ref={ref}
        className={cn(FORM_VALIDATION_SUMMARY_MARGIN_BOTTOM, summaryClass, className)}
        role="alert"
      >
        <div className={cn('flex items-start', FORM_VALIDATION_CONTENT_GAP)}>
          <AlertCircle
            className={cn(
              FORM_VALIDATION_ICON_SIZE,
              FORM_VALIDATION_ICON_MARGIN_TOP,
              'flex-shrink-0',
              textClass
            )}
          />
          <div>
            <p
              className={cn(
                FORM_VALIDATION_TITLE_SIZE,
                FORM_VALIDATION_TITLE_WEIGHT,
                textClass
              )}
            >
              {title}
            </p>
            <ul
              className={cn(
                FORM_VALIDATION_LIST_MARGIN_TOP,
                FORM_VALIDATION_LIST_SPACING
              )}
            >
              {visibleErrors.map(([field, message]) => (
                <li
                  key={field}
                  className={cn(FORM_VALIDATION_LIST_ITEM_SIZE, textClass)}
                >
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

// ═══════════════════════════════════════════════════════════════════════════
// VALIDATION SUCCESS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * ValidationSuccess — Displays a success message when form has no errors.
 *
 * @example
 * <ValidationSuccess message="All fields are valid!" />
 */
export const ValidationSuccess = React.forwardRef<
  HTMLDivElement,
  ValidationSuccessProps
>(({ message, className }, ref) => {
  const { isValid } = useFormValidation();

  if (!isValid) return null;

  const successClass = formValidationSuccessVariants({ variant: 'success' });
  const textClass = formValidationSuccessTextVariants({ variant: 'success' });

  return (
    <div
      ref={ref}
      className={cn(
        FORM_VALIDATION_SUMMARY_MARGIN_BOTTOM,
        successClass,
        className
      )}
      role="status"
    >
      <div className={cn('flex items-start', FORM_VALIDATION_CONTENT_GAP)}>
        <CheckCircle
          className={cn(
            FORM_VALIDATION_ICON_SIZE,
            FORM_VALIDATION_ICON_MARGIN_TOP,
            'flex-shrink-0',
            textClass
          )}
        />
        <p className={cn(FORM_VALIDATION_TITLE_SIZE, textClass)}>{message}</p>
      </div>
    </div>
  );
});
ValidationSuccess.displayName = 'ValidationSuccess';

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export type {
  FormValidationProviderProps,
  FormValidationContextValue,
  ValidatedInputProps,
  ValidationSummaryProps,
  ValidationSuccessProps,
  ValidatorFunction,
  ValidationError,
  ValidationResult,
  FieldValidator,
  ValidationStatus,
} from '@/types/components/forging/form_validation.types';