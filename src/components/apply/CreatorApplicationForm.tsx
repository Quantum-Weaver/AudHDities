// src/components/apply/CreatorApplicationForm.tsx
'use client';

import { useState } from 'react';
import { useApplicationSubmit } from '@/hooks/utils/useApplicationSubmit';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AlertCircle, CheckCircle } from 'lucide-react';

const CREATIVE_CATEGORIES = [
  'Visual Art',
  'Music',
  'Writing / Poetry',
  'Code / Software',
  'Digital Art',
  'Crafts / Handmade',
  'Photography',
  'Film / Video',
  'Performance',
  'Education / Teaching',
  'Mentorship',
  'Other',
];

const ND_IDENTITY_OPTIONS = [
  'Autistic',
  'ADHD',
  'Dyslexic',
  'Dyspraxic',
  'Tourette\'s',
  'Other Neurodivergence',
  'Prefer not to say',
];

export default function CreatorApplicationForm() {
  const { submitApplication, loading, error } = useApplicationSubmit('creator');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    creative_categories: [] as string[],
    portfolio_url: '',
    creative_description: '',
    experience: '',
    goals: '',
    motivation: '',
    nd_identity: [] as string[],
  });

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      creative_categories: prev.creative_categories.includes(category)
        ? prev.creative_categories.filter(c => c !== category)
        : [...prev.creative_categories, category]
    }));
  };

  const handleNDToggle = (identity: string) => {
    setFormData(prev => ({
      ...prev,
      nd_identity: prev.nd_identity.includes(identity)
        ? prev.nd_identity.filter(i => i !== identity)
        : [...prev.nd_identity, identity]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting application:', formData); 
    const result = await submitApplication(formData);
    console.log('Submit result:', result); // Debug
    console.log('Error:', error); // Debug
    if (!error) {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-green-400" size={32} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Application Submitted!</h3>
        <p className="text-white/60 mb-6">
          Thank you for applying to become a creator. Our team will review your application and get back to you soon.
        </p>
        <a
          href="/dashboard"
          className="inline-block px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors"
        >
          Return to Dashboard
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Creative Categories */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white/80">
          What do you create? <span className="text-red-400">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {CREATIVE_CATEGORIES.map(category => (
            <Badge
              key={category}
              variant={formData.creative_categories.includes(category) ? 'primary' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleCategoryToggle(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Portfolio URL */}
      <Input
        label="Portfolio / Website URL"
        type="url"
        placeholder="https://..."
        value={formData.portfolio_url}
        onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
        helperText="Link to your work (optional)"
      />

      {/* Creative Description */}
      <TextArea
        label="Tell us about your creative practice"
        placeholder="What do you create? How do you create? What inspires you?"
        value={formData.creative_description}
        onChange={(e) => setFormData({ ...formData, creative_description: e.target.value })}
        rows={4}
        required
      />

      {/* Experience */}
      <TextArea
        label="Your creative journey"
        placeholder="Share your background, experience, and how you've developed your craft"
        value={formData.experience}
        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
        rows={4}
        required
      />

      {/* Goals */}
      <TextArea
        label="What are your goals as a creator?"
        placeholder="What do you hope to achieve in the sanctuary? What would success look like?"
        value={formData.goals}
        onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
        rows={3}
        required
      />

      {/* Motivation */}
      <TextArea
        label="Why do you want to join AUDHDITIES?"
        placeholder="What drew you to our community? How do you align with our values?"
        value={formData.motivation}
        onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
        rows={3}
        required
      />

      {/* ND Identity (Optional) */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white/80">
          Neurodivergent Identity (Optional)
        </label>
        <p className="text-xs text-white/40 mb-2">
          This helps us understand our community and provide better support. Totally optional.
        </p>
        <div className="flex flex-wrap gap-2">
          {ND_IDENTITY_OPTIONS.map(identity => (
            <Badge
              key={identity}
              variant={formData.nd_identity.includes(identity) ? 'primary' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleNDToggle(identity)}
            >
              {identity}
            </Badge>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Submitting...' : 'Submit Application'}
      </Button>

      <p className="text-xs text-white/30 text-center">
        Fields marked with <span className="text-red-400">*</span> are required
      </p>
    </form>
  );
}