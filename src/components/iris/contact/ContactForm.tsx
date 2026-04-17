// components/contact/ContactForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { Spinner } from "@/components/ui/Spinner";
import { CheckCircle, AlertCircle } from "lucide-react";
import type { ContactSubmissionsInsertInput } from "@/lib/validators/generated/iris-communications/contact_submissions";

interface ContactFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export default function ContactForm({ onSuccess, redirectTo }: ContactFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  // Validation functions
  const validateName = (name: string): string => {
    if (!name.trim()) return "Name is required";
    if (name.length < 2) return "Name must be at least 2 characters";
    return "";
  };

  const validateEmail = (email: string): string => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validateSubject = (subject: string): string => {
    if (!subject.trim()) return "Subject is required";
    if (subject.length < 3) return "Subject must be at least 3 characters";
    return "";
  };

  const validateMessage = (message: string): string => {
    if (!message.trim()) return "Message is required";
    if (message.length < 10) return "Message must be at least 10 characters";
    return "";
  };

  const validateForm = (): boolean => {
    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      subject: validateSubject(formData.subject),
      message: validateMessage(formData.message),
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleBlur = (field: keyof typeof formData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    let error = "";
    switch (field) {
      case "name":
        error = validateName(formData.name);
        break;
      case "email":
        error = validateEmail(formData.email);
        break;
      case "subject":
        error = validateSubject(formData.subject);
        break;
      case "message":
        error = validateMessage(formData.message);
        break;
    }
    
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage(null);
    
    try {
      const payload: ContactSubmissionsInsertInput = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        direction: "inbound",
        status: "new",
      };
      
      const response = await fetch("/api/generated/iris-communications/contact_submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }
      
      setSubmitStatus("success");
      
      // Reset form on success
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      onSuccess?.();
      
      // Redirect after 2 seconds if redirectTo provided
      if (redirectTo) {
        setTimeout(() => {
          router.push(redirectTo);
        }, 2000);
      }
      
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (field: keyof typeof formData): string | undefined => {
    return touched[field] && errors[field] ? errors[field] : undefined;
  };

  if (submitStatus === "success") {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-green-400" size={32} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-white/60">
          Thank you for reaching out. We'll respond within 24-48 hours.
        </p>
        {!redirectTo && (
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => setSubmitStatus("idle")}
          >
            Send Another Message
          </Button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {submitStatus === "error" && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
          <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={16} />
          <p className="text-red-400 text-sm">{errorMessage}</p>
        </div>
      )}
      
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
          Name <span className="text-red-400">*</span>
        </label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          placeholder="Your name"
          className={getFieldError("name") ? "border-red-500/50" : ""}
          disabled={isSubmitting}
        />
        {getFieldError("name") && (
          <p className="text-xs text-red-400 mt-1">{getFieldError("name")}</p>
        )}
      </div>
      
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
          Email <span className="text-red-400">*</span>
        </label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          placeholder="your@email.com"
          className={getFieldError("email") ? "border-red-500/50" : ""}
          disabled={isSubmitting}
        />
        {getFieldError("email") && (
          <p className="text-xs text-red-400 mt-1">{getFieldError("email")}</p>
        )}
      </div>
      
      {/* Subject Field */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-white mb-1">
          Subject <span className="text-red-400">*</span>
        </label>
        <Input
          id="subject"
          type="text"
          value={formData.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          onBlur={() => handleBlur("subject")}
          placeholder="What is this regarding?"
          className={getFieldError("subject") ? "border-red-500/50" : ""}
          disabled={isSubmitting}
        />
        {getFieldError("subject") && (
          <p className="text-xs text-red-400 mt-1">{getFieldError("subject")}</p>
        )}
      </div>
      
      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-white mb-1">
          Message <span className="text-red-400">*</span>
        </label>
        <TextArea
          id="message"
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          placeholder="Your message..."
          rows={5}
          className={getFieldError("message") ? "border-red-500/50" : ""}
          disabled={isSubmitting}
        />
        {getFieldError("message") && (
          <p className="text-xs text-red-400 mt-1">{getFieldError("message")}</p>
        )}
      </div>
      
      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? (
          <>
            <Spinner className="mr-2 h-4 w-4" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}