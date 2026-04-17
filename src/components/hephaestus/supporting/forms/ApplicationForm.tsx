// src/components/governance/ApplicationForm.tsx
// Application Form - Creator/Vendor applications
// High effort form with multi-section layout, file uploads, and validation

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// UI Primitives
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { Select } from "@/components/ui/Select";
import { Label } from "@/components/ui/Label";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

// Generated Types
import type { ApplicationsInsert } from "@/types/generated/themis-governance/applications";
import type { ProfilesRow } from "@/types/generated/hestia-core/profiles";

// Generated Constants
import { USER_TIER, type UserTier } from "@/lib/constants/generated/hestia-core/user_tier";
import { APPLICATION_STATUS } from "@/lib/constants/generated/themis-governance/application_status";

// Generated Hooks
import { useCreateApplications } from "@/hooks/generated/themis-governance/applications";
import { useProfiles } from "@/hooks/generated/hestia-core/profiles";

// Shared Utils
import { required, email, minLength, maxLength, url, composeValidators, formatFileSize } from "@/utils/components/ui/unified_form";

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

// Form data interface matching the application structure
interface ApplicationFormData {
  // Basic Info
  business_name: string;
  business_type: string;
  website_url: string;
  
  // Description
  description: string;
  experience: string;
  motivation: string;
  
  // Categories (for creators)
  creative_categories: string[];
  
  // Product categories (for vendors)
  product_categories: string[];
  
  // Additional
  portfolio_url: string;
  additional_info: string;
  
  // Terms
  accept_terms: boolean;
}

// =====================================================
// VALIDATORS
// =====================================================

const validateBusinessName = composeValidators(
  required("Business name is required"),
  minLength(2, "Business name must be at least 2 characters"),
  maxLength(100, "Business name cannot exceed 100 characters")
);

const validateWebsite = composeValidators(
  url("Please enter a valid URL")
);

const validateDescription = composeValidators(
  required("Description is required"),
  minLength(100, "Please provide at least 100 characters"),
  maxLength(5000, "Description cannot exceed 5000 characters")
);

const validateExperience = composeValidators(
  required("Please describe your experience"),
  minLength(50, "Please provide at least 50 characters"),
  maxLength(2000, "Experience cannot exceed 2000 characters")
);

const validateMotivation = composeValidators(
  required("Please share your motivation"),
  minLength(50, "Please provide at least 50 characters"),
  maxLength(2000, "Motivation cannot exceed 2000 characters")
);

// =====================================================
// SECTION COMPONENTS
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
    <Card variant="interactive" size="lg" className="mb-6">
      <div className="flex items-start gap-4 mb-4">
        {stepNumber !== undefined && (
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0",
            isCompleted ? "bg-green-500 text-white" : "bg-quantum-purple/20 text-quantum-purple"
          )}>
            {isCompleted ? "✓" : stepNumber}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {description && <p className="text-sm text-white/40 mt-1">{description}</p>}
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
  const { data: profile, loading: profileLoading } = useProfiles(userId);
  
  // Form state
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
  
  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [currentSection, setCurrentSection] = useState(1);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // Check if user already has a pending application
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
  
  // Update form field
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
  
  // Mark field as touched
  const markTouched = (field: keyof ApplicationFormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };
  
  // Validate a single field
  const validateField = (field: keyof ApplicationFormData, value: any): string | null => {
    switch (field) {
      case "business_name":
        return validateBusinessName(value);
      case "website_url":
        return value ? validateWebsite(value) : null;
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
  
  // Validate current section
  const validateSection = (section: number): boolean => {
    const sectionFields: (keyof ApplicationFormData)[] = [];
    
    switch (section) {
      case 1: // Basic Info
        sectionFields.push("business_name");
        if (applicationType === "vendor") sectionFields.push("business_type");
        if (formData.website_url) sectionFields.push("website_url");
        break;
      case 2: // Description
        sectionFields.push("description", "experience", "motivation");
        break;
      case 3: // Additional
        if (applicationType === "creator") sectionFields.push("portfolio_url");
        break;
      case 4: // Review
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
  
  // Go to next section
  const nextSection = () => {
    if (validateSection(currentSection)) {
      setCurrentSection(prev => prev + 1);
    }
  };
  
  // Go to previous section
  const prevSection = () => {
    setCurrentSection(prev => prev - 1);
  };
  
  // Submit form
  const handleSubmit = async () => {
    // Validate all sections
    let isValid = true;
    for (let i = 1; i <= 3; i++) {
      if (!validateSection(i)) isValid = false;
    }
    if (!formData.accept_terms) isValid = false;
    
    if (!isValid) {
      setSubmitError("Please complete all required fields");
      return;
    }
    
    // Build application data based on type
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
      status: "pending",
    };
    
    const result = await create(applicationData);
    
    if (result.data) {
      onSuccess?.();
      router.push("/council/applications/thank-you");
    } else {
      setSubmitError(result.error || "Failed to submit application");
    }
  };
  
  // Loading states
  if (profileLoading || checkingApplication) {
    return (
      <Card className="p-12 text-center">
        <div className="animate-pulse">
          <div className="w-12 h-12 bg-white/10 rounded-full mx-auto mb-4" />
          <div className="h-4 bg-white/10 rounded w-48 mx-auto mb-2" />
          <div className="h-3 bg-white/10 rounded w-64 mx-auto" />
        </div>
      </Card>
    );
  }
  
  if (hasPendingApplication) {
    return (
      <Card className="p-8 text-center">
        <div className="text-6xl mb-4">⏳</div>
        <h2 className="text-xl font-bold text-white mb-2">Application Already Submitted</h2>
        <p className="text-white/60 mb-6">
          You already have a pending application. Our council will review it shortly.
        </p>
        <Button onClick={onCancel}>Return to Dashboard</Button>
      </Card>
    );
  }
  
  // Determine if a section is completed
  const isSectionCompleted = (section: number): boolean => {
    switch (section) {
      case 1:
        return !!formData.business_name;
      case 2:
        return !!(formData.description && formData.experience && formData.motivation);
      case 3:
        return applicationType === "creator" ? true : true;
      case 4:
        return formData.accept_terms;
      default:
        return false;
    }
  };
  
  return (
    <div className={cn("max-w-3xl mx-auto", className)}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {applicationType === "creator" ? "Creator Application" : "Vendor Application"}
        </h1>
        <p className="text-white/60">
          Join the Sanctuary as a sovereign {applicationType}
        </p>
      </div>
      
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex-1 text-center">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-medium transition-all",
              currentSection === step && "bg-quantum-purple text-white",
              currentSection > step && "bg-green-500 text-white",
              currentSection < step && "bg-white/10 text-white/40"
            )}>
              {currentSection > step ? "✓" : step}
            </div>
            <span className={cn(
              "text-xs",
              currentSection >= step ? "text-white/80" : "text-white/40"
            )}>
              {step === 1 && "Basic Info"}
              {step === 2 && "Your Story"}
              {step === 3 && "Additional"}
              {step === 4 && "Review"}
            </span>
          </div>
        ))}
      </div>
      
      {/* Error Message */}
      {submitError && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-sm">{submitError}</p>
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
          <Label htmlFor="business_name" variant="required">
            {applicationType === "creator" ? "Creator Name" : "Business Name"}
          </Label>
          <Input
            id="business_name"
            value={formData.business_name}
            onChange={(e) => updateField("business_name", e.target.value)}
            onBlur={() => {
              markTouched("business_name");
              const error = validateField("business_name", formData.business_name);
              if (error) setErrors(prev => ({ ...prev, business_name: error }));
            }}
            variant={errors.business_name && touched.business_name ? "error" : "default"}
            placeholder={applicationType === "creator" ? "Your creative name" : "Your business name"}
          />
          {errors.business_name && touched.business_name && (
            <p className="text-sm text-red-400 mt-1">{errors.business_name}</p>
          )}
        </div>
        
        {applicationType === "vendor" && (
          <div>
            <Label htmlFor="business_type">Business Type</Label>
            <Select
              id="business_type"
              value={formData.business_type}
              onChange={(e) => updateField("business_type", e.target.value)}
            >
              <option value="">Select business type</option>
              <option value="sole_proprietor">Sole Proprietor</option>
              <option value="llc">LLC</option>
              <option value="nonprofit">Nonprofit</option>
              <option value="cooperative">Cooperative</option>
              <option value="partnership">Partnership</option>
              <option value="other">Other</option>
            </Select>
          </div>
        )}
        
        <div>
          <Label htmlFor="website_url">Website / Portfolio URL</Label>
          <Input
            id="website_url"
            type="url"
            value={formData.website_url}
            onChange={(e) => updateField("website_url", e.target.value)}
            onBlur={() => markTouched("website_url")}
            variant={errors.website_url && touched.website_url ? "error" : "default"}
            placeholder="https://..."
          />
          {errors.website_url && touched.website_url && (
            <p className="text-sm text-red-400 mt-1">{errors.website_url}</p>
          )}
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
          <Label htmlFor="description" variant="required">
            Description
          </Label>
          <TextArea
            id="description"
            value={formData.description}
            onChange={(e) => updateField("description", e.target.value)}
            onBlur={() => {
              markTouched("description");
              const error = validateField("description", formData.description);
              if (error) setErrors(prev => ({ ...prev, description: error }));
            }}
            variant={errors.description && touched.description ? "error" : "default"}
            placeholder="Tell us about what you do..."
            rows={4}
          />
          <p className="text-xs text-white/40 mt-1">
            {formData.description.length}/5000 characters
          </p>
          {errors.description && touched.description && (
            <p className="text-sm text-red-400 mt-1">{errors.description}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="experience" variant="required">
            Experience
          </Label>
          <TextArea
            id="experience"
            value={formData.experience}
            onChange={(e) => updateField("experience", e.target.value)}
            onBlur={() => {
              markTouched("experience");
              const error = validateField("experience", formData.experience);
              if (error) setErrors(prev => ({ ...prev, experience: error }));
            }}
            variant={errors.experience && touched.experience ? "error" : "default"}
            placeholder="Describe your relevant experience..."
            rows={3}
          />
          <p className="text-xs text-white/40 mt-1">
            {formData.experience.length}/2000 characters
          </p>
          {errors.experience && touched.experience && (
            <p className="text-sm text-red-400 mt-1">{errors.experience}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="motivation" variant="required">
            Motivation
          </Label>
          <TextArea
            id="motivation"
            value={formData.motivation}
            onChange={(e) => updateField("motivation", e.target.value)}
            onBlur={() => {
              markTouched("motivation");
              const error = validateField("motivation", formData.motivation);
              if (error) setErrors(prev => ({ ...prev, motivation: error }));
            }}
            variant={errors.motivation && touched.motivation ? "error" : "default"}
            placeholder="Why do you want to join the Sanctuary?"
            rows={3}
          />
          <p className="text-xs text-white/40 mt-1">
            {formData.motivation.length}/2000 characters
          </p>
          {errors.motivation && touched.motivation && (
            <p className="text-sm text-red-400 mt-1">{errors.motivation}</p>
          )}
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
            <Label htmlFor="portfolio_url">Portfolio URL</Label>
            <Input
              id="portfolio_url"
              type="url"
              value={formData.portfolio_url}
              onChange={(e) => updateField("portfolio_url", e.target.value)}
              placeholder="https://..."
            />
            <p className="text-xs text-white/40 mt-1">
              Link to your portfolio, GitHub, or examples of your work
            </p>
          </div>
        )}
        
        <div>
          <Label htmlFor="additional_info">Anything else you'd like to share?</Label>
          <TextArea
            id="additional_info"
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
        <div className="space-y-4 bg-white/5 rounded-lg p-4">
          <h4 className="font-medium text-white">Application Summary</h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/60">Business Name:</span>
              <span className="text-white">{formData.business_name || "—"}</span>
            </div>
            {applicationType === "vendor" && formData.business_type && (
              <div className="flex justify-between">
                <span className="text-white/60">Business Type:</span>
                <span className="text-white capitalize">{formData.business_type.replace("_", " ")}</span>
              </div>
            )}
            {formData.website_url && (
              <div className="flex justify-between">
                <span className="text-white/60">Website:</span>
                <span className="text-white truncate max-w-[200px]">{formData.website_url}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-white/60">Description:</span>
              <span className="text-white max-w-[200px] truncate">{formData.description}</span>
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
          <Label htmlFor="accept_terms" variant="required">
            I confirm that all information provided is accurate and I agree to the 
            <a href="/terms" className="text-cyan-400 hover:underline mx-1">Terms of Service</a>
            and 
            <a href="/council/guidelines" className="text-cyan-400 hover:underline mx-1">Community Guidelines</a>
          </Label>
        </div>
        
        {!formData.accept_terms && (
          <p className="text-sm text-red-400">You must accept the terms to submit</p>
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