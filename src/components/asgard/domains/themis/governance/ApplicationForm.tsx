// src/components/asgard/domains/themis/governance/ApplicationForm.tsx
// Application Form - Creator/Vendor applications
// High effort form with multi-section layout, file uploads, and validation

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// UI Primitives
import { Button } from "@/components/yggdrasil/Button";
import { Input } from "@/components/forging/Input";
import { Textarea } from "@/components/forging/Textarea";
import { Select } from "@/components/forging/Select";
import { Card } from "@/components/runes/Card";

// Generated Types
import type { ApplicationsInsert } from "@/lib/generated/types/themis-governance/applications";

// Generated Hooks
import { useCreateApplications } from "@/lib/generated/hooks/themis-governance/applications";
import { useCommunityProfilesList } from "@/lib/generated/hooks/hestia-core/community_profiles";

// =====================================================
// TYPES
// =====================================================

export type ApplicationType = "creator" | "vendor";

export interface ApplicationFormProps {
  userId: string;
  applicationType: ApplicationType;
  onSuccess?: () => void;
  onCancel?: () => void;
  className?: string;
}

interface ApplicationFormData {
  business_name: string;
  business_type: string;
  website_url: string;
  description: string;
  experience: string;
  motivation: string;
  creative_categories: string[];
  product_categories: string[];
  portfolio_url: string;
  additional_info: string;
  accept_terms: boolean;
}

// =====================================================
// VALIDATORS
// =====================================================

function required(fieldName: string) {
  return (value: any): string | null =>
    !value || (typeof value === "string" && !value.trim())
      ? `${fieldName} is required`
      : null;
}

function minLength(min: number, fieldName: string) {
  return (value: string): string | null =>
    value && value.length < min
      ? `${fieldName} must be at least ${min} characters`
      : null;
}

function maxLength(max: number, fieldName: string) {
  return (value: string): string | null =>
    value && value.length > max
      ? `${fieldName} cannot exceed ${max} characters`
      : null;
}

function composeValidators(...validators: Array<(value: any) => string | null>) {
  return (value: any): string | null => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) return error;
    }
    return null;
  };
}

const validateBusinessName = composeValidators(
  required("Business name is required"),
  minLength(2, "Business name"),
  maxLength(100, "Business name")
);

const validateDescription = composeValidators(
  required("Description is required"),
  minLength(100, "Description"),
  maxLength(5000, "Description")
);

const validateExperience = composeValidators(
  required("Experience is required"),
  minLength(50, "Experience"),
  maxLength(2000, "Experience")
);

const validateMotivation = composeValidators(
  required("Motivation is required"),
  minLength(50, "Motivation"),
  maxLength(2000, "Motivation")
);

// =====================================================
// SECTION COMPONENT
// =====================================================

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  isActive?: boolean;
  isCompleted?: boolean;
  stepNumber?: number;
}

function FormSection({ title, description, children, isActive = true, isCompleted, stepNumber }: FormSectionProps) {
  if (!isActive) return null;

  return (
    <Card
      data={{ id: `section-${stepNumber}`, type: 'value', title, value: description || '' }}
      variant="interactive"
      radius="lg"
      shadow="md"
      className="mb-6"
    >
      <div className="flex items-start gap-4 mb-4">
        {stepNumber !== undefined && (
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0",
            isCompleted ? "bg-sanctuary-green text-star-dust" : "bg-quantum-purple/20 text-quantum-purple"
          )}>
            {isCompleted ? "✓" : stepNumber}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-star-dust">{title}</h3>
          {description && <p className="text-sm text-star-dust/40 mt-1">{description}</p>}
        </div>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </Card>
  );
}

// =====================================================
// MAIN COMPONENT
// =====================================================

export function ApplicationForm({
  userId,
  applicationType,
  onSuccess,
  onCancel,
  className
}: ApplicationFormProps) {
  const router = useRouter();
  const { create, loading: isSubmitting } = useCreateApplications();
  const { data: profileRows, loading: profileLoading } = useCommunityProfilesList({ filters: userId ? { created_by: userId } : undefined, limit: 1 });
  const profile = profileRows?.[0] ?? null;

  const [formData, setFormData] = useState<ApplicationFormData>({
    business_name: "",
    business_type: "",
    website_url: "",
    description: "",
    experience: "",
    motivation: "",
    creative_categories: [],
    product_categories: [],
    portfolio_url: "",
    additional_info: "",
    accept_terms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [currentSection, setCurrentSection] = useState(1);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [hasPendingApplication, setHasPendingApplication] = useState(false);
  const [checkingApplication, setCheckingApplication] = useState(true);

  useEffect(() => {
    const checkExistingApplication = async () => {
      try {
        const response = await fetch(`/api/generated/themis-governance/applications?user_id=${userId}&status=pending`);
        const result = await response.json();
        if (result.success && result.data && result.data.length > 0) {
          setHasPendingApplication(true);
        }
      } catch (error) {
        console.error("Error checking existing application:", error);
      } finally {
        setCheckingApplication(false);
      }
    };

    if (userId) {
      checkExistingApplication();
    }
  }, [userId]);

  const updateField = (field: keyof ApplicationFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const markTouched = (field: keyof ApplicationFormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const validateField = (field: keyof ApplicationFormData, value: any): string | null => {
    switch (field) {
      case "business_name":
        return validateBusinessName(value);
      case "description":
        return validateDescription(value);
      case "experience":
        return validateExperience(value);
      case "motivation":
        return validateMotivation(value);
      default:
        return null;
    }
  };

  const validateSection = (section: number): boolean => {
    const sectionFields: (keyof ApplicationFormData)[] = [];

    switch (section) {
      case 1:
        sectionFields.push("business_name");
        break;
      case 2:
        sectionFields.push("description", "experience", "motivation");
        break;
      case 3:
        if (applicationType === "creator") sectionFields.push("portfolio_url");
        break;
      case 4:
        return formData.accept_terms;
    }

    let isValid = true;
    const newErrors: Record<string, string> = {};

    for (const field of sectionFields) {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const nextSection = () => {
    if (validateSection(currentSection)) {
      setCurrentSection(prev => prev + 1);
    }
  };

  const prevSection = () => {
    setCurrentSection(prev => prev - 1);
  };

  const handleSubmit = async () => {
    let isValid = true;
    for (let i = 1; i <= 3; i++) {
      if (!validateSection(i)) isValid = false;
    }
    if (!formData.accept_terms) isValid = false;

    if (!isValid) {
      setSubmitError("Please complete all required fields");
      return;
    }

    const form_data = applicationType === "creator" ? {
      creative_categories: formData.creative_categories,
      portfolio_url: formData.portfolio_url,
      creative_description: formData.description,
      experience: formData.experience,
      goals: formData.motivation,
    } : {
      business_name: formData.business_name,
      business_type: formData.business_type,
      business_description: formData.description,
      product_categories: formData.product_categories,
      service_regions: ["global"],
      website_url: formData.website_url,
      experience: formData.experience,
      motivation: formData.motivation,
      additional_info: formData.additional_info,
    };

    const applicationData: ApplicationsInsert = {
      application_type: applicationType,
      form_data,
      user_id: userId,
      status: "submitted",
    };

    const result = await create(applicationData);

    if (result.data) {
      onSuccess?.();
      router.push("/council/applications/thank-you");
    } else {
      setSubmitError(result.error || "Failed to submit application");
    }
  };

  const isSectionCompleted = (section: number): boolean => {
    switch (section) {
      case 1: return !!formData.business_name;
      case 2: return !!(formData.description && formData.experience && formData.motivation);
      case 3: return true;
      case 4: return formData.accept_terms;
      default: return false;
    }
  };

  // ─── Loading State ───────────────────────────────────────────────────
  if (profileLoading || checkingApplication) {
    return (
      <Card
        data={{ id: 'app-loading', type: 'value', title: 'Loading', value: '' }}
        variant="ghost"
        radius="lg"
        shadow="none"
        className="p-12 text-center"
      >
        <div className="animate-pulse">
          <div className="w-12 h-12 bg-star-dust/10 rounded-full mx-auto mb-4" />
          <div className="h-4 bg-star-dust/10 rounded w-48 mx-auto mb-2" />
          <div className="h-3 bg-star-dust/10 rounded w-64 mx-auto" />
        </div>
      </Card>
    );
  }

  // ─── Pending Application ─────────────────────────────────────────────
  if (hasPendingApplication) {
    return (
      <Card
        data={{ id: 'app-pending', type: 'value', title: 'Application Submitted', value: '' }}
        variant="glass"
        radius="lg"
        shadow="md"
        className="p-8 text-center"
      >
        <div className="text-6xl mb-4">⏳</div>
        <h2 className="text-xl font-bold text-star-dust mb-2">Application Already Submitted</h2>
        <p className="text-star-dust/60 mb-6">
          You already have a pending application. Our council will review it shortly.
        </p>
        <Button onClick={onCancel}>Return to your realms</Button>
      </Card>
    );
  }

  // ─── Form ────────────────────────────────────────────────────────────
  return (
    <div className={cn("max-w-3xl mx-auto", className)}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-star-dust mb-2">
          {applicationType === "creator" ? "Artisan Application" : "Merchant Application"}
        </h1>
        <p className="text-star-dust/60">
          Join the Sanctuary as a sovereign {applicationType === "creator" ? "artisan" : "merchant"}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex-1 text-center">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-medium transition-all",
              currentSection === step && "bg-quantum-purple text-star-dust",
              currentSection > step && "bg-sanctuary-green text-star-dust",
              currentSection < step && "bg-star-dust/10 text-star-dust/40"
            )}>
              {currentSection > step ? "✓" : step}
            </div>
            <span className={cn(
              "text-xs",
              currentSection >= step ? "text-star-dust/80" : "text-star-dust/40"
            )}>
              {step === 1 && "Basic Info"}
              {step === 2 && "Your Story"}
              {step === 3 && "Additional"}
              {step === 4 && "Review"}
            </span>
          </div>
        ))}
      </div>

      {/* Submit Error */}
      {submitError && (
        <div className="mb-6 p-4 bg-fire-base/10 border border-fire-base/30 rounded-lg">
          <p className="text-fire-base text-sm">{submitError}</p>
        </div>
      )}

      {/* Section 1: Basic Information */}
      <FormSection
        title="Basic Information"
        description="Tell us about yourself or your business"
        isActive={currentSection === 1}
        isCompleted={isSectionCompleted(1)}
        stepNumber={1}
      >
        <div>
          <Input
            name="business_name"
            label={applicationType === "creator" ? "Artisan Name" : "Business Name"}
            required
            value={formData.business_name}
            onChange={(e) => updateField("business_name", e.target.value)}
            onBlur={() => {
              markTouched("business_name");
              const error = validateField("business_name", formData.business_name);
              if (error) setErrors(prev => ({ ...prev, business_name: error }));
            }}
            error={touched.business_name ? errors.business_name : undefined}
            placeholder={applicationType === "creator" ? "Your creative name" : "Your business name"}
          />
        </div>

        {applicationType === "vendor" && (
          <div>
            <Select
              name="business_type"
              label="Business Type"
              value={formData.business_type}
              onChange={(e) => updateField("business_type", e.target.value)}
              options={[
                { value: '', label: 'Select business type' },
                { value: 'sole_proprietor', label: 'Sole Proprietor' },
                { value: 'llc', label: 'LLC' },
                { value: 'nonprofit', label: 'Nonprofit' },
                { value: 'cooperative', label: 'Cooperative' },
                { value: 'partnership', label: 'Partnership' },
                { value: 'other', label: 'Other' },
              ]}
            />
          </div>
        )}

        <div>
          <Input
            name="website_url"
            label="Website / Portfolio URL"
            type="url"
            optional
            value={formData.website_url}
            onChange={(e) => updateField("website_url", e.target.value)}
            onBlur={() => markTouched("website_url")}
            placeholder="https://..."
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={nextSection}>Continue</Button>
        </div>
      </FormSection>

      {/* Section 2: Your Story */}
      <FormSection
        title="Your Story"
        description="Share your journey and vision"
        isActive={currentSection === 2}
        isCompleted={isSectionCompleted(2)}
        stepNumber={2}
      >
        <div>
          <Textarea
            name="description"
            label="Description"
            required
            value={formData.description}
            onChange={(e) => updateField("description", e.target.value)}
            onBlur={() => {
              markTouched("description");
              const error = validateField("description", formData.description);
              if (error) setErrors(prev => ({ ...prev, description: error }));
            }}
            error={touched.description ? errors.description : undefined}
            placeholder="Tell us about what you do..."
            rows={4}
          />
          <p className="text-xs text-star-dust/40 mt-1">
            {formData.description.length}/5000 characters
          </p>
        </div>

        <div>
          <Textarea
            name="experience"
            label="Experience"
            required
            value={formData.experience}
            onChange={(e) => updateField("experience", e.target.value)}
            onBlur={() => {
              markTouched("experience");
              const error = validateField("experience", formData.experience);
              if (error) setErrors(prev => ({ ...prev, experience: error }));
            }}
            error={touched.experience ? errors.experience : undefined}
            placeholder="Describe your relevant experience..."
            rows={3}
          />
          <p className="text-xs text-star-dust/40 mt-1">
            {formData.experience.length}/2000 characters
          </p>
        </div>

        <div>
          <Textarea
            name="motivation"
            label="Motivation"
            required
            value={formData.motivation}
            onChange={(e) => updateField("motivation", e.target.value)}
            onBlur={() => {
              markTouched("motivation");
              const error = validateField("motivation", formData.motivation);
              if (error) setErrors(prev => ({ ...prev, motivation: error }));
            }}
            error={touched.motivation ? errors.motivation : undefined}
            placeholder="Why do you want to join the Sanctuary?"
            rows={3}
          />
          <p className="text-xs text-star-dust/40 mt-1">
            {formData.motivation.length}/2000 characters
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={prevSection}>Back</Button>
          <Button onClick={nextSection}>Continue</Button>
        </div>
      </FormSection>

      {/* Section 3: Additional Information */}
      <FormSection
        title="Additional Information"
        description="Help us understand you better"
        isActive={currentSection === 3}
        isCompleted={isSectionCompleted(3)}
        stepNumber={3}
      >
        {applicationType === "creator" && (
          <div>
            <Input
              name="portfolio_url"
              label="Portfolio URL"
              type="url"
              optional
              value={formData.portfolio_url}
              onChange={(e) => updateField("portfolio_url", e.target.value)}
              placeholder="https://..."
              helper="Link to your portfolio, GitHub, or examples of your work"
            />
          </div>
        )}

        <div>
          <Textarea
            name="additional_info"
            label="Anything else you would like to share?"
            optional
            value={formData.additional_info}
            onChange={(e) => updateField("additional_info", e.target.value)}
            placeholder="Additional context, accommodations, or anything else..."
            rows={3}
          />
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={prevSection}>Back</Button>
          <Button onClick={nextSection}>Review</Button>
        </div>
      </FormSection>

      {/* Section 4: Review & Submit */}
      <FormSection
        title="Review & Submit"
        description="Please review your application before submitting"
        isActive={currentSection === 4}
        isCompleted={isSectionCompleted(4)}
        stepNumber={4}
      >
        <div className="space-y-4 bg-star-dust/5 rounded-lg p-4">
          <h4 className="font-medium text-star-dust">Application Summary</h4>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-star-dust/60">Business Name:</span>
              <span className="text-star-dust">{formData.business_name || "—"}</span>
            </div>
            {applicationType === "vendor" && formData.business_type && (
              <div className="flex justify-between">
                <span className="text-star-dust/60">Business Type:</span>
                <span className="text-star-dust capitalize">{formData.business_type.replace("_", " ")}</span>
              </div>
            )}
            {formData.website_url && (
              <div className="flex justify-between">
                <span className="text-star-dust/60">Website:</span>
                <span className="text-star-dust truncate max-w-[200px]">{formData.website_url}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-star-dust/60">Description:</span>
              <span className="text-star-dust max-w-[200px] truncate">{formData.description}</span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="accept_terms"
            checked={formData.accept_terms}
            onChange={(e) => updateField("accept_terms", e.target.checked)}
            className="mt-1"
          />
          <label htmlFor="accept_terms" className="text-sm text-star-dust/80">
            I confirm that all information provided is accurate and I agree to the{" "}
            <a href="/terms" className="text-neurospark hover:underline">Terms of Service</a>
            {" "}and{" "}
            <a href="/council/guidelines" className="text-neurospark hover:underline">Community Guidelines</a>
          </label>
        </div>

        {!formData.accept_terms && (
          <p className="text-sm text-fire-base">You must accept the terms to submit</p>
        )}

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={prevSection}>Back</Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.accept_terms}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </div>
      </FormSection>
    </div>
  );
}