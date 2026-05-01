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
import { ArrowLeft, Heart, Shield, MessageCircle, Phone, Send } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

const CATEGORY_OPTIONS = [
  { value: 'technical', label: 'Technical Support' },
  { value: 'billing', label: 'Billing Question' },
  { value: 'accessibility', label: 'Accessibility Help' },
  { value: 'community', label: 'Community Concern' },
  { value: 'safety', label: 'Safety Concern' },
  { value: 'other', label: 'Something Else' },
];

const URGENCY_OPTIONS = [
  { value: 'low', label: 'Low — Whenever you have time' },
  { value: 'medium', label: 'Medium — Soon would be nice' },
  { value: 'high', label: 'High — I need help today' },
  { value: 'urgent', label: 'Urgent — I am in crisis' },
];

export function SupportHub() {
  const { user } = useAuth();
  const [sent, setSent] = useState(false);

  const handleSubmit = async (data: Record<string, any>) => {
    if (!user) return;
    try {
      await fetch('/api/generated/iris-communications/contact_submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          name: user.email,
          email: user.email,
          subject: data.subject,
          message: data.message,
          category: data.category,
          urgency: data.urgency,
        }),
      });
      setSent(true);
    } catch (err) {
      console.error('Failed to send support request:', err);
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
          <Form onSubmit={handleSubmit}>
            <FormField label="Subject" required>
              <Input name="subject" placeholder="What do you need help with?" />
            </FormField>
            <FormField label="Category" required>
              <Select name="category" options={CATEGORY_OPTIONS} placeholder="Select a category" />
            </FormField>
            <FormField label="Urgency" required>
              <Select name="urgency" options={URGENCY_OPTIONS} placeholder="How urgent is this?" />
            </FormField>
            <FormField label="Message" required helper="Tell us what's going on. The more detail, the better we can help.">
              <Input name="message" placeholder="Describe what you need..." />
            </FormField>
            <FormActions>
              <Button type="submit" variant="primary" size="md">
                <Send className="h-4 w-4 mr-2" />Send Message
              </Button>
            </FormActions>
          </Form>
        </Card>

        {/* Crisis Resources */}
        <Card
          data={{ id: 'crisis-resources', type: 'value', title: 'Crisis Resources', value: '' }}
          variant="glass" radius="lg" shadow="sm" className="p-6"
        >
          <Shield className="h-5 w-5 text-amber-400 mb-3" />
          <h3 className="text-sm font-semibold text-star-dust mb-3">If you are in immediate crisis</h3>
          <div className="space-y-2 text-xs text-star-dust/50">
            <p><span className="text-star-dust/70">National Suicide Prevention Lifeline:</span> 988 (US)</p>
            <p><span className="text-star-dust/70">Crisis Text Line:</span> Text HOME to 741741 (US)</p>
            <p><span className="text-star-dust/70">The Trevor Project:</span> 1-866-488-7386 (LGBTQ+ youth)</p>
            <p className="mt-3 text-star-dust/30">You are not alone. Reaching out is an act of sovereignty.</p>
          </div>
        </Card>
      </div>
    </main>
  );
}