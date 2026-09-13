// src/components/asgard/domains/iris/support/SupportHub.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Button } from '@/components/yggdrasil/Button';
import { Form, FormActions } from '@/components/forging/Form';
import { FormField } from '@/components/forging/FormField';
import { Input } from '@/components/forging/Input';
import { Select } from '@/components/forging/Select';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft, Heart, Send } from 'lucide-react';
import type { ContactSubmissionsInsert } from '@/lib/generated/types/iris-communications/contact_submissions';

const CATEGORY_OPTIONS = [
  { value: 'technical', label: 'Technical Support' },
  { value: 'billing', label: 'Billing Question' },
  { value: 'accessibility', label: 'Accessibility Help' },
  { value: 'community', label: 'Community Concern' },
  { value: 'safety', label: 'Safety Concern' },
  { value: 'other', label: 'Something Else' },
];

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low — Whenever you have time' },
  { value: 'medium', label: 'Medium — Soon would be nice' },
  { value: 'high', label: 'High — I need help today' },
  { value: 'urgent', label: 'Urgent — I need help now' },
];

export function SupportHub() {
  const { user, profile } = useAuth();
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleSubmit = async (data: Record<string, unknown>) => {
    if (!user) return;
    setFailed(false);
    try {
      const payload: ContactSubmissionsInsert = {
        name: profile?.display_name || user.email || 'Sanctuary Soul',
        email: user.email ?? null,
        subject: String(data.subject ?? ''),
        message: String(data.message ?? ''),
        category: String(data.category ?? 'other'),
        priority: String(data.priority ?? 'medium'),
        status: 'draft',
      };
      const response = await fetch('/api/generated/iris-communications/contact_submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Failed to send support request');
      setSent(true);
    } catch (err) {
      console.error('Failed to send support request:', err);
      setFailed(true);
    }
  };

  if (sent) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6">
          <div className="mb-8">
            <Link href="/connect" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
              <ArrowLeft className="h-4 w-4" />Return to the Bridge
            </Link>
          </div>
          <Card
            data={{ id: 'support-sent', type: 'value', title: 'Message Sent', value: '' }}
            variant="sanctuary" radius="xl" shadow="md" className="p-8 text-center"
          >
            <Heart className="h-12 w-12 text-rose-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-star-dust mb-2">Your message has been received</h2>
            <p className="text-star-dust/60 mb-6">Someone from the Sanctuary will respond within 24 hours. You are not alone.</p>
            <Link href="/connect"><Button variant="primary">Return to the Bridge</Button></Link>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">

        <div className="mb-8">
          <Link href="/connect" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
            <ArrowLeft className="h-4 w-4" />Return to the Bridge
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">The Healing Flame</h1>
          <p className="text-sm text-star-dust/40 mt-1">You are not alone. We are here for you.</p>
        </div>

        <Card
          data={{ id: 'support-form', type: 'value', title: 'Support Request', value: '' }}
          variant="sanctuary" radius="xl" shadow="md" className="p-8 mb-8"
        >
          {!user ? (
            <p className="text-star-dust/60">Sign in to open a support thread the Sanctuary can answer.</p>
          ) : (
            <Form onSubmit={handleSubmit}>
              <FormField label="Subject" required>
                <Input name="subject" placeholder="What do you need help with?" />
              </FormField>
              <FormField label="Category" required>
                <Select name="category" options={CATEGORY_OPTIONS} placeholder="Select a category" />
              </FormField>
              <FormField label="Priority" required>
                <Select name="priority" options={PRIORITY_OPTIONS} placeholder="How soon do you need us?" />
              </FormField>
              <FormField label="Message" required helper="Tell us what is going on. The more detail, the better we can help.">
                <Input name="message" placeholder="Describe what you need..." />
              </FormField>
              <FormActions>
                <Button type="submit" variant="primary" size="md">
                  <Send className="h-4 w-4 mr-2" />Send Message
                </Button>
              </FormActions>
            </Form>
          )}
          {failed && (
            <p className="text-sm text-rose-400 mt-4">That did not send. Nothing you wrote is lost — try again.</p>
          )}
        </Card>
      </div>
    </main>
  );
}
