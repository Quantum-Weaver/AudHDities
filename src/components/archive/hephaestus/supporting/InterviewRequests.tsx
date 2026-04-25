// src/components/hephaestus/supporting/InterviewRequests.tsx
// Interview Requests - Form and contact for interview requests

"use client";

import { useState } from "react";
import { Card } from "@/components/runes/cards/Card";
import { Button } from "@/components/yggdrasil/Button";
import { Input } from "@/components/forging/Input";
import { Textarea } from "@/components/forging/Textarea";
import { Select } from "@/components/forging/Select";
import { Mail, Send, Calendar, Mic, Video, Users } from "lucide-react";
import { cn } from "@/lib/utils";

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

const typeIcons = {
  podcast: Mic,
  video: Video,
  print: Mail,
  live: Calendar,
  other: Users,
};

export function InterviewRequests() {
  const [formData, setFormData] = useState<InterviewRequestForm>({
    name: "",
    email: "",
    outlet: "",
    type: "podcast",
    proposedDate: "",
    topics: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log("Interview Request:", formData);
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  if (submitted) {
    return (
      <Card className="p-6 text-center">
        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6 text-green-400" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Request Sent!</h3>
        <p className="text-sm text-white/60">
          Thank you for your interest. Our media team will respond within 48 hours.
        </p>
      </Card>
    );
  }

  const Icon = typeIcons[formData.type];

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Interview Requests</h2>
        <p className="text-sm text-white/40 mt-1">
          Schedule an interview with the Quantum Weaver or council members
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Full Name <span className="text-red-400">*</span>
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
          <label className="block text-sm font-medium text-white mb-1">
            Email <span className="text-red-400">*</span>
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
          <label className="block text-sm font-medium text-white mb-1">
            Media Outlet <span className="text-red-400">*</span>
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
          <label className="block text-sm font-medium text-white mb-1">
            Interview Type <span className="text-red-400">*</span>
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
          <label className="block text-sm font-medium text-white mb-1">
            Proposed Date / Timeframe
          </label>
          <Input
            name="proposedDate"
            value={formData.proposedDate}
            onChange={handleChange}
            placeholder="e.g., Week of May 15, 2026"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">
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
          <label className="block text-sm font-medium text-white mb-1">
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
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
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

      <div className="pt-4 border-t border-white/10 text-center text-sm text-white/40">
        <p>Prefer email? Contact us directly at</p>
        <a href="mailto:interviews@sovereignsanctuary.com" className="text-cyan-400 hover:underline">
          interviews@sovereignsanctuary.com
        </a>
      </div>
    </Card>
  );
}