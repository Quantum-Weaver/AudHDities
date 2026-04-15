// src/components/contact/ContactForm.tsx
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { AlertCircle, CheckCircle, Send, Mail, User, MessageSquare } from 'lucide-react';

const SUBJECT_OPTIONS = [
  { value: 'general', label: '💬 General Inquiry' },
  { value: 'support', label: '🛠️ Technical Support' },
  { value: 'billing', label: '💰 Billing Question' },
  { value: 'creator', label: '🎨 Creator Program' },
  { value: 'vendor', label: '🏪 Vendor Program' },
  { value: 'partnership', label: '🤝 Partnership Opportunity' },
  { value: 'feedback', label: '💡 Feedback' },
  { value: 'other', label: '📝 Other' },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting contact form:', formData); 
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setErrorMessage('All fields are required');
      setStatus('error');
      return;
    }
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <CheckCircle className="text-green-400" size={32} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-white/60 mb-6">
          Thank you for reaching out. We'll get back to you within 48 hours.
        </p>
        <Button
          variant="outline"
          onClick={() => setStatus('idle')}
          className="hover:border-green-500/50"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {status === 'error' && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-red-400 text-sm">{errorMessage}</p>
        </div>
      )}

      {/* Name Field */}
      <Input
        label="Your Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your name"
        leftIcon={<User size={16} />}
        
      />

      {/* Email Field */}
      <Input
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="you@example.com"
        leftIcon={<Mail size={16} />}
        required
      />

      {/* Subject Select */}
      <Select
        label="Subject"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        options={SUBJECT_OPTIONS}
        icon={<MessageSquare size={16} />}
        required
      />

      {/* Message Field */}
      <TextArea
        label="Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="How can we help you? What would you like to share?"
        rows={6}
        required
      />

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={status === 'loading'}
        className="w-full group"
      >
        <Send size={16} className="mr-2 group-hover:translate-x-1 transition-transform" />
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </Button>

      <p className="text-xs text-white/30 text-center">
        By submitting this form, you agree to our{' '}
        <a href="/terms" className="text-cyan-400 hover:underline">Terms of Service</a>{' '}
        and{' '}
        <a href="/docs/privacy" className="text-cyan-400 hover:underline">Privacy Policy</a>.
      </p>
    </form>
  );
}