// arc/components/apply/VendorApplicationForm.tsx
'use client';

import { useState } from 'react';
import { useApplicationSubmit } from '@/hooks/utils/useApplicationSubmit';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AlertCircle, CheckCircle, Truck } from 'lucide-react';

const BUSINESS_TYPES = [
  { value: 'sole_proprietor', label: 'Sole Proprietor' },
  { value: 'llc', label: 'LLC' },
  { value: 'nonprofit', label: 'Nonprofit' },
  { value: 'cooperative', label: 'Cooperative' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'other', label: 'Other' },
];

const SERVICE_CATEGORIES = [
  'Shipping / Logistics',
  'Packaging',
  'Transportation',
  'Venues / Spaces',
  'Marketing / Promotion',
  'Legal Services',
  'Accounting / Finance',
  'Manufacturing',
  'Printing',
  'Event Planning',
  'Consulting',
  'Technology / IT',
  'Translation / Localization',
  'Accessibility Services',
  'Other',
];

const SERVICE_REGIONS = [
  'Local (within 50 miles)',
  'Regional (within state)',
  'National (within country)',
  'International',
  'Remote / Digital Only',
];

export default function VendorApplicationForm() {
  const { submitApplication, loading, error } = useApplicationSubmit('vendor');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    business_name: '',
    business_type: '',
    business_description: '',
    service_categories: [] as string[],
    service_regions: [] as string[],
    website_url: '',
    experience: '',
    motivation: '',
    additional_info: '',
  });

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      service_categories: prev.service_categories.includes(category)
        ? prev.service_categories.filter(c => c !== category)
        : [...prev.service_categories, category]
    }));
  };

  const handleRegionToggle = (region: string) => {
    setFormData(prev => ({
      ...prev,
      service_regions: prev.service_regions.includes(region)
        ? prev.service_regions.filter(r => r !== region)
        : [...prev.service_regions, region]
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
          Thank you for applying to become a vendor. Our team will review your application and get back to you soon.
        </p>
        <a
          href="/dashboard"
          className="inline-block px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors"
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

      {/* Business Name */}
      <Input
        label="Business Name"
        placeholder="Your business or organization name"
        value={formData.business_name}
        onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
        required
      />

      {/* Business Type */}
      <Select
        label="Business Type"
        value={formData.business_type}
        onChange={(e) => setFormData({ ...formData, business_type: e.target.value })}
        options={BUSINESS_TYPES}
        required
      />

      {/* Business Description */}
      <TextArea
        label="Business Description"
        placeholder="Tell us about your business—what you do, who you serve, and what makes you unique"
        value={formData.business_description}
        onChange={(e) => setFormData({ ...formData, business_description: e.target.value })}
        rows={4}
        required
      />

      {/* Service Categories */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white/80">
          What services do you offer? <span className="text-red-400">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {SERVICE_CATEGORIES.map(category => (
            <Badge
              key={category}
              variant={formData.service_categories.includes(category) ? 'primary' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleCategoryToggle(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Service Regions */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white/80">
          Where do you operate? <span className="text-red-400">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {SERVICE_REGIONS.map(region => (
            <Badge
              key={region}
              variant={formData.service_regions.includes(region) ? 'primary' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleRegionToggle(region)}
            >
              {region}
            </Badge>
          ))}
        </div>
      </div>

      {/* Website URL */}
      <Input
        label="Website URL (Optional)"
        type="url"
        placeholder="https://..."
        value={formData.website_url}
        onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
      />

      {/* Experience */}
      <TextArea
        label="Your Experience"
        placeholder="Share your background and experience in the services you offer"
        value={formData.experience}
        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
        rows={4}
        required
      />

      {/* Motivation */}
      <TextArea
        label="Why do you want to join AUDHDITIES as a vendor?"
        placeholder="What drew you to our community? How do you align with our values?"
        value={formData.motivation}
        onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
        rows={3}
        required
      />

      {/* Additional Info */}
      <TextArea
        label="Additional Information (Optional)"
        placeholder="Anything else you'd like us to know?"
        value={formData.additional_info}
        onChange={(e) => setFormData({ ...formData, additional_info: e.target.value })}
        rows={3}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-500"
      >
        {loading ? 'Submitting...' : 'Submit Application'}
      </Button>

      <p className="text-xs text-white/30 text-center">
        Fields marked with <span className="text-red-400">*</span> are required
      </p>
    </form>
  );
}