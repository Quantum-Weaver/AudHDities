// src/components/shared/UnifiedForm.tsx
// INCREMENT 2: Contact Form + Login Form
// Added: login variant with email + password + remember_me

"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";
import { Spinner } from "@/components/ui/Spinner";

// Constants
import { FORM_VARIANTS, FORM_SPACING } from "@/lib/constants/components/ui/unified_form";

// Types
import type { FieldValue } from "@/types/components/ui/unified_form";

// Utils
import { required, email, composeValidators } from "@/utils/components/ui/unified_form";

// =====================================================
// FIELD CONFIGURATIONS BY VARIANT
// =====================================================

const CONTACT_FIELDS = [
  {
    name: "name",
    type: "text" as const,
    label: "Name",
    placeholder: "Your name",
    required: true,
    validator: composeValidators(required("Name is required")),
  },
  {
    name: "email",
    type: "email" as const,
    label: "Email",
    placeholder: "your@email.com",
    required: true,
    validator: composeValidators(
      required("Email is required"),
      email("Please enter a valid email address")
    ),
  },
  {
    name: "subject",
    type: "text" as const,
    label: "Subject",
    placeholder: "What is this regarding?",
    required: true,
    validator: composeValidators(required("Subject is required")),
  },
  {
    name: "message",
    type: "Textarea" as const,
    label: "Message",
    placeholder: "Your message...",
    required: true,
    validator: composeValidators(required("Message is required")),
    rows: 5,
  },
];

const LOGIN_FIELDS = [
  {
    name: "email",
    type: "email" as const,
    label: "Email",
    placeholder: "your@email.com",
    required: true,
    validator: composeValidators(
      required("Email is required"),
      email("Please enter a valid email address")
    ),
  },
  {
    name: "password",
    type: "password" as const,
    label: "Password",
    placeholder: "Enter your password",
    required: true,
    validator: composeValidators(required("Password is required")),
  },
  {
    name: "remember_me",
    type: "checkbox" as const,
    label: "Remember me",
    required: false,
  },
];

// =====================================================
// PROPS
// =====================================================

export interface UnifiedFormProps {
  variant: "contact" | "login";
  initialValues?: Record<string, FieldValue>;
  onSubmit: (values: Record<string, FieldValue>) => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
  className?: string;
}

// =====================================================
// MAIN COMPONENT
// =====================================================

export function UnifiedForm({
  variant = "contact",
  initialValues = {},
  onSubmit,
  onCancel,
  isLoading = false,
  className,
}: UnifiedFormProps) {
  // Get fields based on variant
  const getFields = () => {
    switch (variant) {
      case "login":
        return LOGIN_FIELDS;
      case "contact":
      default:
        return CONTACT_FIELDS;
    }
  };

  const fields = getFields();

  // Get initial values based on variant
  const getDefaultValues = (): Record<string, FieldValue> => {
    switch (variant) {
      case "login":
        return { email: "", password: "", remember_me: false, ...initialValues };
      case "contact":
      default:
        return { name: "", email: "", subject: "", message: "", ...initialValues };
    }
  };

  // Get submit button label based on variant
  const getSubmitLabel = (): string => {
    switch (variant) {
      case "login":
        return "Sign In";
      case "contact":
      default:
        return "Send Message";
    }
  };

  // State
  const [values, setValues] = useState<Record<string, FieldValue>>(getDefaultValues());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate a single field
  const validateField = useCallback(async (name: string, fieldValue: FieldValue): Promise<string | null> => {
    const field = fields.find(f => f.name === name);
    if (!field || !field.validator) return null;
    return field.validator(fieldValue, values);
  }, [fields, values]);

  // Validate all fields
  const validateForm = useCallback(async (): Promise<boolean> => {
    const newErrors: Record<string, string> = {};
    
    for (const field of fields) {
      if (!field.required) continue;
      const error = await validateField(field.name, values[field.name]);
      if (error) {
        newErrors[field.name] = error;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [fields, values, validateField]);

  // Handle field change
  const handleChange = useCallback((name: string, value: FieldValue) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  // Handle field blur
  const handleBlur = useCallback(async (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const field = fields.find(f => f.name === name);
    if (field?.required) {
      const error = await validateField(name, values[name]);
      if (error) {
        setErrors(prev => ({ ...prev, [name]: error }));
      }
    }
  }, [fields, values, validateField]);

  // Handle checkbox change (special handling)
  const handleCheckboxChange = useCallback((name: string, checked: boolean) => {
    setValues(prev => ({ ...prev, [name]: checked }));
  }, []);

  // Handle submit
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mark all required fields as touched
    const allTouched: Record<string, boolean> = {};
    for (const field of fields) {
      if (field.required) {
        allTouched[field.name] = true;
      }
    }
    setTouched(allTouched);
    
    // Validate all fields
    const isValid = await validateForm();
    
    if (!isValid) {
      setIsSubmitting(false);
      return;
    }
    
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, onSubmit, validateForm, fields]);

  // Get field error display
  const getFieldError = (name: string) => {
    return touched[name] && errors[name] ? errors[name] : undefined;
  };

  // Get input class based on error state
  const getInputClass = (name: string) => {
    const hasError = touched[name] && errors[name];
    return cn(
      "w-full transition-all duration-200",
      hasError && "border-red-500/50 ring-red-500/20"
    );
  };

  // Render field based on type
  const renderField = (field: typeof fields[0]) => {
    const value = values[field.name];
    const error = getFieldError(field.name);
    const isTouched = touched[field.name];

    switch (field.type) {
      case "Textarea":
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name} className="text-sm font-medium text-white">
              {field.label}
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </Label>
            <Textarea
              id={field.name}
              name={field.name}
              value={typeof value === "string" ? value : ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              onBlur={() => handleBlur(field.name)}
              placeholder={field.placeholder}
              rows={field.rows || 4}
              className={getInputClass(field.name)}
              disabled={isLoading || isSubmitting}
            />
            {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
          </div>
        );

      case "checkbox":
        return (
          <div key={field.name} className="flex items-center gap-2">
            <Checkbox
              id={field.name}
              checked={typeof value === "boolean" ? value : false}
              onCheckedChange={(checked) => handleCheckboxChange(field.name, checked === true)}
              disabled={isLoading || isSubmitting}
            />
            <Label htmlFor={field.name} className="text-sm text-white/80">
              {field.label}
            </Label>
          </div>
        );

      case "password":
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name} className="text-sm font-medium text-white">
              {field.label}
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </Label>
            <Input
              id={field.name}
              name={field.name}
              type="password"
              value={typeof value === "string" ? value : ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              onBlur={() => handleBlur(field.name)}
              placeholder={field.placeholder}
              className={getInputClass(field.name)}
              disabled={isLoading || isSubmitting}
            />
            {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
          </div>
        );

      default:
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name} className="text-sm font-medium text-white">
              {field.label}
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </Label>
            <Input
              id={field.name}
              name={field.name}
              type={field.type}
              value={typeof value === "string" ? value : ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              onBlur={() => handleBlur(field.name)}
              placeholder={field.placeholder}
              className={getInputClass(field.name)}
              disabled={isLoading || isSubmitting}
            />
            {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      {fields.map(renderField)}

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading || isSubmitting}
          className="flex-1"
        >
          {(isLoading || isSubmitting) && <Spinner className="mr-2 h-4 w-4" />}
          {getSubmitLabel()}
        </Button>
        
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading || isSubmitting}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}