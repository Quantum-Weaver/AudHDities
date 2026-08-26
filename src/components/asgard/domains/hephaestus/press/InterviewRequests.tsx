// src/components/asgard/domains/hephaestus/press/InterviewRequests.tsx
// ─────────────────────────────────────────────────────────────────────────
// /api/generated/iris-communications/contact_submissions

"use client";

import { useState } from "react";
import { Card } from "@/components/runes/Card";
import { Button } from "@/components/yggdrasil/Button";
import { Input } from "@/components/forging/Input";
import { Textarea } from "@/components/forging/Textarea";
import { Select } from "@/components/forging/Select";
import { Alert } from "@/components/seidr/Alert";
import { Mail, Send } from "lucide-react";
import type { ContactSubmissionsInsertInput } from "@/lib/generated/validators/iris-communications/contact_submissions";
import { CONTACT_LABELS } from "@/lib/constants/components/asgard/domains/iris/contact/contact.constants";

interface InterviewRequestForm {
  name: string;
  email: string;
  outlet: string;
  type: "podcast" | "video" | "print" | "live" | "other";
  proposedDate: string;
  topics: string;
  message: string;
}

const interviewTypes = [
  { value: "podcast", label: "Podcast Interview" },
  { value: "video", label: "Video Interview" },
  { value: "print", label: "Print / Written Interview" },
  { value: "live", label: "Live Event / Panel" },
  { value: "other", label: "Other" },
];

const EMPTY_FORM: InterviewRequestForm = {
  name: "",
  email: "",
  outlet: "",
  type: "podcast",
  proposedDate: "",
  topics: "",
  message: "",
};

export function InterviewRequests() {
  const [formData, setFormData] = useState<InterviewRequestForm>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const typeLabel =
      interviewTypes.find((t) => t.value === formData.type)?.label ?? formData.type;

    const body = [
      `Outlet: ${formData.outlet}`,
      `Kind: ${typeLabel}`,
      formData.proposedDate ? `Proposed date / timeframe: ${formData.proposedDate}` : null,
      formData.topics ? `Topics to discuss:\n${formData.topics}` : null,
      formData.message ? `Additional information:\n${formData.message}` : null,
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      const payload: ContactSubmissionsInsertInput = {
        name: formData.name,
        email: formData.email,
        category: "press",
        subject: `Press — interview request — ${formData.outlet}`,
        message: body,
        status: "draft",
      };

      const response = await fetch(
        "/api/generated/iris-communications/contact_submissions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to send request");

      setFormData(EMPTY_FORM);
      setSubmitted(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "That did not send. Nothing on your side is lost — try again, or write to us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Card
        variant="interactive"
        data={{ id: "interview-submitted", type: "value", title: "Request Sent", value: "" }}
        radius="lg"
        shadow="md"
        className="p-6 text-center"
      >
        <div className="w-12 h-12 bg-sanctuary-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6 text-sanctuary-green" />
        </div>
        <h3 className="text-lg font-semibold text-star-dust mb-2">Your request arrived</h3>
        <p className="text-sm text-star-dust/60">
          It landed with every other message the Sanctuary receives. There is no
          media desk here — a person reads it, and a person answers you.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setSubmitted(false)}
        >
          Send another
        </Button>
      </Card>
    );
  }

  return (
    <Card
      variant="interactive"
      data={{ id: "interview-requests", type: "value", title: "Interview Requests", value: "" }}
      radius="lg"
      shadow="md"
      className="p-6 space-y-6"
    >
      <div>
        <h2 className="text-xl font-semibold text-star-dust">Interview Requests</h2>
        <p className="text-sm text-star-dust/62 mt-1">
          Ask for an interview with the Quantum Weaver
        </p>
      </div>

      {errorMessage && <Alert variant="error">{errorMessage}</Alert>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-star-dust mb-1">
            Full Name <span className="text-fire-base">*</span>
          </label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-star-dust mb-1">
            Email <span className="text-fire-base">*</span>
          </label>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-star-dust mb-1">
            Media Outlet <span className="text-fire-base">*</span>
          </label>
          <Input
            name="outlet"
            value={formData.outlet}
            onChange={handleChange}
            placeholder="Name of publication / show / platform"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-star-dust mb-1">
            Interview Type <span className="text-fire-base">*</span>
          </label>
          <Select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full"
          >
            {interviewTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-star-dust mb-1">
            Proposed Date / Timeframe
          </label>
          <Input
            name="proposedDate"
            value={formData.proposedDate}
            onChange={handleChange}
            placeholder="e.g., the week of the 15th"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-star-dust mb-1">
            Topics to Discuss
          </label>
          <Textarea
            name="topics"
            value={formData.topics}
            onChange={handleChange}
            placeholder="What would you like to cover?"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-star-dust mb-1">
            Additional Information
          </label>
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Any other details we should know..."
            rows={3}
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-star-dust border-t-transparent rounded-full animate-spin motion-reduce:animate-none mr-2" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send Request
            </>
          )}
        </Button>
      </form>

      <div className="pt-4 border-t border-star-dust/10 text-center text-sm text-star-dust/62">
        <p>Prefer email? Write to us directly at</p>
        <a
          href={`mailto:${CONTACT_LABELS.EMAIL_ADDRESS}`}
          className="text-neurospark hover:underline"
        >
          {CONTACT_LABELS.EMAIL_ADDRESS}
        </a>
      </div>
    </Card>
  );
}
