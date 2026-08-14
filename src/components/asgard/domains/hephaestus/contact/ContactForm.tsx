// src/components/asgard/domains/hephaestus/contact/ContactForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/yggdrasil/Button";
import { Input } from "@/components/forging/Input";
import { Textarea } from "@/components/forging/Textarea";
import { Spinner } from "@/components/yggdrasil/Spinner";
import { CheckCircle, AlertCircle } from "lucide-react";
import type { ContactSubmissionsInsertInput } from "@/lib/generated/validators/iris-communications/contact_submissions";

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

  const validateName = (name: string): string => {
    if (!name.trim()) return "Name is required";
    if (name.length < 2) return "Name must be at least 2 characters";
    return "";
  };

  const validateEmail = (email: string): string => {
    if (!email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address";
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
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleBlur = (field: keyof typeof formData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    let error = "";
    switch (field) {
      case "name": error = validateName(formData.name); break;
      case "email": error = validateEmail(formData.email); break;
      case "subject": error = validateSubject(formData.subject); break;
      case "message": error = validateMessage(formData.message); break;
    }
    if (error) setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage(null);
    
    try {
      const payload: ContactSubmissionsInsertInput = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        status: "draft",
      };
      
      const response = await fetch("/api/generated/iris-communications/contact_submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to send message");
      
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      onSuccess?.();
      
      if (redirectTo) {
        setTimeout(() => router.push(redirectTo), 2000);
      }
    } catch (error) {
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
        <div className="w-16 h-16 bg-sanctuary-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-sanctuary-green" size={32} />
        </div>
        <h3 className="text-xl font-bold text-star-dust mb-2">Message Sent!</h3>
        <p className="text-star-dust/60">
          Thank you for reaching out. We will respond within 24-48 hours.
        </p>
        {!redirectTo && (
          <Button variant="outline" className="mt-6" onClick={() => setSubmitStatus("idle")}>
            Send Another Message
          </Button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {submitStatus === "error" && (
        <div className="p-3 bg-fire-base/10 border border-fire-base/30 rounded-lg flex items-start gap-2">
          <AlertCircle className="text-fire-base flex-shrink-0 mt-0.5" size={16} />
          <p className="text-fire-base text-sm">{errorMessage}</p>
        </div>
      )}
      
      <Input
        name="name"
        label="Name"
        required
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        onBlur={() => handleBlur("name")}
        error={getFieldError("name")}
        placeholder="Your name"
        disabled={isSubmitting}
      />
      
      <Input
        name="email"
        label="Email"
        type="email"
        required
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        onBlur={() => handleBlur("email")}
        error={getFieldError("email")}
        placeholder="your@email.com"
        disabled={isSubmitting}
      />
      
      <Input
        name="subject"
        label="Subject"
        required
        value={formData.subject}
        onChange={(e) => handleChange("subject", e.target.value)}
        onBlur={() => handleBlur("subject")}
        error={getFieldError("subject")}
        placeholder="What is this regarding?"
        disabled={isSubmitting}
      />
      
      <Textarea
        name="message"
        label="Message"
        required
        value={formData.message}
        onChange={(e) => handleChange("message", e.target.value)}
        onBlur={() => handleBlur("message")}
        error={getFieldError("message")}
        placeholder="Your message..."
        rows={5}
        disabled={isSubmitting}
      />
      
      <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}