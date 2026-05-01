## 📝 **FORM COMPONENTS: Overview**

Form components are the **input system** of the interface—they collect, validate, and submit user data. Every text field, every dropdown, every checkbox is a **gateway** between the user and the system.

**What this system provides:**
- Consistent styling across all input types
- Built-in validation and error states
- Label and helper text support
- Required/optional indicators
- Disabled and loading states
- Dark mode support

---

## 📁 **`components/ui/Input.tsx`**

```tsx
// components/ui/Input.tsx
// Input Component - The gateway for text entry
// Collects single-line text input from users

import React from 'react';
import { cn } from '@/lib/utils';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'glass' | 'outline';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helper?: string;
  /** Size of the input (renamed from 'size' to avoid conflict with native input size) */
  inputSize?: InputSize;
  /** Visual variant */
  variant?: InputVariant;
  /** Show required indicator */
  required?: boolean;
  /** Show optional indicator */
  optional?: boolean;
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Right icon */
  rightIcon?: React.ReactNode;
  /** Full width */
  fullWidth?: boolean;
}

const sizeClasses: Record<InputSize, string> = {
  sm: 'px-2 py-1 text-sm h-8',
  md: 'px-3 py-2 text-base h-10',
  lg: 'px-4 py-3 text-lg h-12',
};

const variantClasses: Record<InputVariant, string> = {
  default: 'bg-white/5 border-white/10 focus:border-cyan-400',
  glass: 'bg-white/10 backdrop-blur-sm border-white/20 focus:border-cyan-400',
  outline: 'bg-transparent border-white/20 focus:border-cyan-400',
};

/**
 * Input Component
 * 
 * @example
 * <Input label="Email" placeholder="you@example.com" />
 * 
 * @example
 * <Input label="Password" type="password" error="Password is required" />
 * 
 * @example
 * <Input leftIcon={<MailIcon />} placeholder="Email" />
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helper,
      inputSize = 'md',
      variant = 'default',
      required = false,
      optional = false,
      leftIcon,
      rightIcon,
      fullWidth = true,
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;
    const hasError = !!error;
    
    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-sm font-medium text-white/80',
              hasError && 'text-red-400'
            )}
          >
            {label}
            {required && <span className="ml-1 text-cyan-400">*</span>}
            {optional && <span className="ml-1 text-white/40 text-xs">(optional)</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'rounded-lg border transition-all duration-200',
              'placeholder:text-white/30',
              'focus:outline-none focus:ring-2 focus:ring-cyan-400/20',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              sizeClasses[inputSize],
              variantClasses[variant],
              hasError && 'border-red-400 focus:border-red-400 focus:ring-red-400/20',
              leftIcon && 'pl-9',
              rightIcon && 'pr-9',
              fullWidth && 'w-full',
              className
            )}
            aria-invalid={hasError}
            aria-describedby={
              helper ? `${inputId}-helper` : hasError ? `${inputId}-error` : undefined
            }
            disabled={disabled}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
              {rightIcon}
            </div>
          )}
        </div>
        
        {helper && !hasError && (
          <p id={`${inputId}-helper`} className="text-xs text-white/40">
            {helper}
          </p>
        )}
        
        {hasError && (
          <p id={`${inputId}-error`} className="text-xs text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
```

---

## 📁 **`components/ui/Textarea.tsx`**

```tsx
// components/ui/Textarea.tsx
// Textarea Component - The canvas for multi-line text
// Collects multi-line text input from users

import React from 'react';
import { cn } from '@/lib/utils';

export type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helper?: string;
  /** Size of the textarea */
  size?: TextareaSize;
  /** Number of rows */
  rows?: number;
  /** Show required indicator */
  required?: boolean;
  /** Show optional indicator */
  optional?: boolean;
  /** Full width */
  fullWidth?: boolean;
}

const sizeClasses: Record<TextareaSize, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
};

/**
 * Textarea Component
 * 
 * @example
 * <Textarea label="Message" placeholder="Your message here..." rows={4} />
 * 
 * @example
 * <Textarea label="Bio" error="Bio is required" />
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helper,
      size = 'md',
      rows = 3,
      required = false,
      optional = false,
      fullWidth = true,
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).slice(2, 9)}`;
    const hasError = !!error;
    
    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              'text-sm font-medium text-white/80',
              hasError && 'text-red-400'
            )}
          >
            {label}
            {required && <span className="ml-1 text-cyan-400">*</span>}
            {optional && <span className="ml-1 text-white/40 text-xs">(optional)</span>}
          </label>
        )}
        
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            'rounded-lg border transition-all duration-200',
            'bg-white/5 border-white/10',
            'placeholder:text-white/30',
            'focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'resize-vertical',
            sizeClasses[size],
            hasError && 'border-red-400 focus:border-red-400 focus:ring-red-400/20',
            fullWidth && 'w-full',
            className
          )}
          aria-invalid={hasError}
          aria-describedby={
            helper ? `${textareaId}-helper` : hasError ? `${textareaId}-error` : undefined
          }
          disabled={disabled}
          {...props}
        />
        
        {helper && !hasError && (
          <p id={`${textareaId}-helper`} className="text-xs text-white/40">
            {helper}
          </p>
        )}
        
        {hasError && (
          <p id={`${textareaId}-error`} className="text-xs text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
```

---

## 📁 **`components/ui/Select.tsx`**

```tsx
// components/ui/Select.tsx
// Select Component - The choice gateway
// Allows users to select from a list of options

import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helper?: string;
  /** Size of the select (renamed to avoid conflict) */
  selectSize?: SelectSize;
  /** Options for the select */
  options: SelectOption[];
  /** Placeholder text */
  placeholder?: string;
  /** Show required indicator */
  required?: boolean;
  /** Show optional indicator */
  optional?: boolean;
  /** Full width */
  fullWidth?: boolean;
}

const sizeClasses: Record<SelectSize, string> = {
  sm: 'px-2 py-1 text-sm h-8',
  md: 'px-3 py-2 text-base h-10',
  lg: 'px-4 py-3 text-lg h-12',
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helper,
      selectSize = 'md',
      options,
      placeholder,
      required = false,
      optional = false,
      fullWidth = true,
      className,
      id,
      disabled,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).slice(2, 9)}`;
    const hasError = !!error;
    
    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              'text-sm font-medium text-white/80',
              hasError && 'text-red-400'
            )}
          >
            {label}
            {required && <span className="ml-1 text-cyan-400">*</span>}
            {optional && <span className="ml-1 text-white/40 text-xs">(optional)</span>}
          </label>
        )}
        
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'rounded-lg border transition-all duration-200 appearance-none',
              'bg-white/5 border-white/10',
              'text-white',
              'focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              sizeClasses[selectSize],
              hasError && 'border-red-400 focus:border-red-400 focus:ring-red-400/20',
              fullWidth && 'w-full',
              className
            )}
            aria-invalid={hasError}
            aria-describedby={
              helper ? `${selectId}-helper` : hasError ? `${selectId}-error` : undefined
            }
            disabled={disabled}
            defaultValue={defaultValue || (placeholder ? '' : undefined)}
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="text-white/60">
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="bg-surface text-white"
              >
                {option.label}
              </option>
            ))}
          </select>
          
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none h-4 w-4" />
        </div>
        
        {helper && !hasError && (
          <p id={`${selectId}-helper`} className="text-xs text-white/40">
            {helper}
          </p>
        )}
        
        {hasError && (
          <p id={`${selectId}-error`} className="text-xs text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
```

---

## 📁 **`components/ui/Checkbox.tsx`**

```tsx
// components/ui/Checkbox.tsx
// Checkbox Component - The binary choice gateway
// Allows users to select yes/no or multiple options

import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helper?: string;
  /** Size of the checkbox */
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

const labelSizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

/**
 * Checkbox Component
 * 
 * @example
 * <Checkbox label="I agree to the terms" />
 * 
 * @example
 * <Checkbox label="Subscribe to newsletter" defaultChecked />
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error,
      helper,
      size = 'md',
      className,
      id,
      disabled,
      checked,
      defaultChecked,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).slice(2, 9)}`;
    const hasError = !!error;
    
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-2">
          <div className="relative flex items-center justify-center mt-0.5">
            <input
              ref={ref}
              type="checkbox"
              id={checkboxId}
              className={cn(
                'appearance-none rounded border transition-all duration-200',
                'bg-white/5 border-white/20',
                'checked:bg-cyan-500 checked:border-cyan-500',
                'focus:outline-none focus:ring-2 focus:ring-cyan-400/20',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'cursor-pointer',
                sizeClasses[size],
                hasError && 'border-red-400',
                className
              )}
              checked={checked}
              defaultChecked={defaultChecked}
              aria-invalid={hasError}
              aria-describedby={
                helper ? `${checkboxId}-helper` : hasError ? `${checkboxId}-error` : undefined
              }
              disabled={disabled}
              {...props}
            />
            <Check
              className={cn(
                'absolute pointer-events-none text-white transition-opacity',
                'h-2 w-2',
                size === 'sm' && 'h-2 w-2',
                size === 'md' && 'h-2.5 w-2.5',
                size === 'lg' && 'h-3 w-3',
                (checked || defaultChecked) ? 'opacity-100' : 'opacity-0'
              )}
            />
          </div>
          
          {label && (
            <label
              htmlFor={checkboxId}
              className={cn(
                'text-white/80 cursor-pointer select-none',
                labelSizeClasses[size],
                disabled && 'opacity-50 cursor-not-allowed',
                hasError && 'text-red-400'
              )}
            >
              {label}
            </label>
          )}
        </div>
        
        {helper && !hasError && (
          <p id={`${checkboxId}-helper`} className="text-xs text-white/40 pl-6">
            {helper}
          </p>
        )}
        
        {hasError && (
          <p id={`${checkboxId}-error`} className="text-xs text-red-400 pl-6">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
```

---

## 📁 **`components/ui/Radio.tsx`**

```tsx
// components/ui/Radio.tsx
// Radio Component - The exclusive choice gateway
// Allows users to select one option from a group

import React, { createContext, useContext } from 'react';
import { cn } from '@/lib/utils';

export type RadioSize = 'sm' | 'md' | 'lg';

interface RadioGroupContextValue {
  name: string;
  value: string;
  onChange: (value: string) => void;
  size: RadioSize;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

const useRadioGroup = () => {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('Radio components must be used within a RadioGroup');
  }
  return context;
};

export interface RadioGroupProps {
  /** Name of the radio group */
  name: string;
  /** Current value */
  value: string;
  /** Callback when value changes */
  onChange: (value: string) => void;
  /** Size of radio buttons */
  size?: RadioSize;
  /** Children (Radio components) */
  children: React.ReactNode;
  className?: string;
}

/**
 * RadioGroup - Container for radio buttons
 * 
 * @example
 * <RadioGroup name="payment" value="card" onChange={setPaymentMethod}>
 *   <Radio value="card">Credit Card</Radio>
 *   <Radio value="paypal">PayPal</Radio>
 * </RadioGroup>
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ name, value, onChange, size = 'md', children, className }, ref) => {
    const contextValue: RadioGroupContextValue = {
      name,
      value,
      onChange,
      size,
    };
    
    return (
      <RadioGroupContext.Provider value={contextValue}>
        <div ref={ref} className={cn('flex flex-col gap-2', className)}>
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = 'RadioGroup';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Value of this radio option */
  value: string;
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helper?: string;
}

const radioSizeClasses = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

const radioLabelSizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

/**
 * Radio - Individual radio button (must be used within RadioGroup)
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ value, label, error, helper, className, id, disabled, ...props }, ref) => {
    const { name, value: groupValue, onChange, size } = useRadioGroup();
    const radioId = id || `radio-${Math.random().toString(36).slice(2, 9)}`;
    const isChecked = groupValue === value;
    const hasError = !!error;
    
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-2">
          <div className="relative flex items-center justify-center mt-0.5">
            <input
              ref={ref}
              type="radio"
              name={name}
              value={value}
              id={radioId}
              checked={isChecked}
              onChange={(e) => onChange(e.target.value)}
              className={cn(
                'appearance-none rounded-full border transition-all duration-200',
                'bg-white/5 border-white/20',
                'checked:bg-cyan-500 checked:border-cyan-500',
                'focus:outline-none focus:ring-2 focus:ring-cyan-400/20',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'cursor-pointer',
                radioSizeClasses[size],
                hasError && 'border-red-400',
                className
              )}
              aria-invalid={hasError}
              aria-describedby={
                helper ? `${radioId}-helper` : hasError ? `${radioId}-error` : undefined
              }
              disabled={disabled}
              {...props}
            />
            <div
              className={cn(
                'absolute rounded-full bg-white transition-all',
                size === 'sm' && 'h-1.5 w-1.5',
                size === 'md' && 'h-2 w-2',
                size === 'lg' && 'h-2.5 w-2.5',
                isChecked ? 'opacity-100' : 'opacity-0'
              )}
            />
          </div>
          
          {label && (
            <label
              htmlFor={radioId}
              className={cn(
                'text-white/80 cursor-pointer select-none',
                radioLabelSizeClasses[size],
                disabled && 'opacity-50 cursor-not-allowed',
                hasError && 'text-red-400'
              )}
            >
              {label}
            </label>
          )}
        </div>
        
        {helper && !hasError && (
          <p id={`${radioId}-helper`} className="text-xs text-white/40 pl-6">
            {helper}
          </p>
        )}
        
        {hasError && (
          <p id={`${radioId}-error`} className="text-xs text-red-400 pl-6">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Radio.displayName = 'Radio';
```

---

## 📁 **`components/ui/Switch.tsx`**

```tsx
// components/ui/Switch.tsx
// Switch Component - The toggle gateway
// Allows users to toggle between two states

import React from 'react';
import { cn } from '@/lib/utils';

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** Checked state */
  checked?: boolean;
  /** Default checked state */
  defaultChecked?: boolean;
  /** Callback when checked changes */
  onChange?: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Size of the switch */
  size?: SwitchSize;
  /** Error message */
  error?: string;
  /** Helper text */
  helper?: string;
}

const trackSizeClasses = {
  sm: 'w-8 h-4',
  md: 'w-10 h-5',
  lg: 'w-12 h-6',
};

const thumbSizeClasses = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

const thumbTranslateClasses = {
  sm: 'translate-x-4',
  md: 'translate-x-5',
  lg: 'translate-x-6',
};

/**
 * Switch Component
 * 
 * @example
 * <Switch label="Enable notifications" />
 * 
 * @example
 * <Switch checked={isEnabled} onChange={setIsEnabled} />
 */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked = false,
      onChange,
      label,
      size = 'md',
      error,
      helper,
      disabled,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;
    const switchId = id || `switch-${Math.random().toString(36).slice(2, 9)}`;
    const hasError = !!error;
    
    const handleClick = () => {
      if (disabled) return;
      const newChecked = !isChecked;
      if (!isControlled) setInternalChecked(newChecked);
      onChange?.(newChecked);
    };
    
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <button
            ref={ref}
            id={switchId}
            type="button"
            role="switch"
            aria-checked={isChecked}
            aria-label={label || 'toggle switch'}
            onClick={handleClick}
            disabled={disabled}
            className={cn(
              'relative rounded-full transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-cyan-400/20',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              isChecked ? 'bg-cyan-500' : 'bg-white/20',
              trackSizeClasses[size],
              className
            )}
            {...props}
          >
            <span
              className={cn(
                'absolute top-1/2 -translate-y-1/2 left-0.5 rounded-full bg-white transition-transform duration-200',
                thumbSizeClasses[size],
                isChecked && thumbTranslateClasses[size]
              )}
            />
          </button>
          
          {label && (
            <label
              htmlFor={switchId}
              className={cn(
                'text-white/80 cursor-pointer select-none',
                size === 'sm' && 'text-sm',
                size === 'md' && 'text-base',
                size === 'lg' && 'text-lg',
                disabled && 'opacity-50 cursor-not-allowed',
                hasError && 'text-red-400'
              )}
            >
              {label}
            </label>
          )}
        </div>
        
        {helper && !hasError && (
          <p className="text-xs text-white/40 pl-11">
            {helper}
          </p>
        )}
        
        {hasError && (
          <p className="text-xs text-red-400 pl-11">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
```

---

## 📋 **FORM COMPONENTS SUMMARY**

| Component | Purpose | Status |
|-----------|---------|--------|
| **Input** | Single-line text entry | ✅ |
| **Textarea** | Multi-line text entry | ✅ |
| **Select** | Dropdown selection | ✅ |
| **Checkbox** | Binary/toggle selection | ✅ |
| **Radio** | Exclusive option selection | ✅ |
| **Switch** | Toggle between states | ✅ |
