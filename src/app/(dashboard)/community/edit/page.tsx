// src/(dashboard)/community/edit/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import AuthGuard from '@/components/auth/AuthGuard';
import { Page } from '@/components/layout/Page';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Toggle } from '@/components/ui/Toggle';
import { Loader2, Heart, Users, Shield, Award, Save, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import type { Database } from '@/types/supabase/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type CommunityProfile = Database['public']['Tables']['community_profiles']['Row'];

const COUNCIL_HOUSES = [
  { value: 'hearth_keeper', label: 'Hearth Keeper' },
  { value: 'chancellor', label: 'Chancellor' },
  { value: 'seer', label: 'Seer' },
  { value: 'aethelred', label: 'Aethelred' },
  { value: 'curator', label: 'Curator' },
  { value: 'archivist', label: 'Archivist' },
  { value: 'skald', label: 'Skald' },
  { value: 'codex', label: 'Codex' },
  { value: 'executioner', label: 'Executioner' },
];

const ND_IDENTITY_OPTIONS = [
  { value: 'autistic', label: 'Autistic' },
  { value: 'adhd', label: 'ADHD' },
  { value: 'dyslexic', label: 'Dyslexic' },
  { value: 'dyspraxic', label: 'Dyspraxic' },
  { value: 'tourettes', label: 'Tourette\'s' },
  { value: 'ocd', label: 'OCD' },
  { value: 'anxiety', label: 'Anxiety' },
  { value: 'depression', label: 'Depression' },
  { value: 'bipolar', label: 'Bipolar' },
  { value: 'other', label: 'Other' },
];

const SENSORY_ACCOMMODATIONS = [
  { value: 'quiet_spaces', label: 'Quiet Spaces' },
  { value: 'dim_lights', label: 'Dim Lights' },
  { value: 'no_fragrances', label: 'No Fragrances' },
  { value: 'clear_signage', label: 'Clear Signage' },
  { value: 'earplugs_allowed', label: 'Earplugs Allowed' },
  { value: 'written_instructions', label: 'Written Instructions' },
  { value: 'flexible_seating', label: 'Flexible Seating' },
  { value: 'visual_schedules', label: 'Visual Schedules' },
  { value: 'stim_allowed', label: 'Stimming Allowed' },
];

const SUPPORT_NEEDS = [
  { value: 'extra_time', label: 'Extra Time for Tasks' },
  { value: 'written_communication', label: 'Written Communication Preferred' },
  { value: 'advance_notice', label: 'Advance Notice of Changes' },
  { value: 'one_on_one', label: 'One-on-One Support' },
  { value: 'body_doubling', label: 'Body Doubling' },
  { value: 'sensory_breaks', label: 'Sensory Breaks' },
];

export default function CommunityEditPage() {
  const supabase = createClient();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [community, setCommunity] = useState<CommunityProfile | null>(null);
  
  // Form state
  const [primaryHouse, setPrimaryHouse] = useState('');
  const [ndIdentity, setNdIdentity] = useState<string[]>([]);
  const [sensoryAccommodations, setSensoryAccommodations] = useState<string[]>([]);
  const [supportNeeds, setSupportNeeds] = useState<string[]>([]);
  const [communicationNotes, setCommunicationNotes] = useState('');
  const [crisisContactName, setCrisisContactName] = useState('');
  const [crisisContactPhone, setCrisisContactPhone] = useState('');
  const [crisisContactEmail, setCrisisContactEmail] = useState('');
  const [crisisInstructions, setCrisisInstructions] = useState('');
  const [isMentor, setIsMentor] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      // Fetch community profile
      const { data: communityData } = await supabase
        .from('community_profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      setProfile(profileData);
      setCommunity(communityData);
      
      // Populate form
      if (profileData) {
        setPrimaryHouse(profileData.primary_house || '');
      }
      
      if (communityData) {
        setNdIdentity(communityData.nd_identity || []);
        setSensoryAccommodations(communityData.sensory_accommodations || []);
        setSupportNeeds(communityData.support_needs || []);
        setCommunicationNotes(communityData.communication_notes || '');
        setCrisisContactName(communityData.crisis_contact_name || '');
        setCrisisContactPhone(communityData.crisis_contact_phone || '');
        setCrisisContactEmail(communityData.crisis_contact_email || '');
        setCrisisInstructions(communityData.crisis_instructions || '');
        setIsMentor(communityData.is_mentor || false);
      }
      
      setLoading(false);
    };

    loadProfile();
  }, [supabase, router]);

  const toggleArrayItem = (array: string[], setter: (arr: string[]) => void, value: string) => {
    if (array.includes(value)) {
      setter(array.filter(item => item !== value));
    } else {
      setter([...array, value]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Update profile (primary_house)
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          primary_house: primaryHouse || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Update or insert community profile
      const communityData = {
        id: user.id,
        nd_identity: ndIdentity.length > 0 ? ndIdentity : null,
        sensory_accommodations: sensoryAccommodations.length > 0 ? sensoryAccommodations : null,
        support_needs: supportNeeds.length > 0 ? supportNeeds : null,
        communication_notes: communicationNotes || null,
        crisis_contact_name: crisisContactName || null,
        crisis_contact_phone: crisisContactPhone || null,
        crisis_contact_email: crisisContactEmail || null,
        crisis_instructions: crisisInstructions || null,
        is_mentor: isMentor,
        updated_at: new Date().toISOString(),
      };

      const { error: communityError } = await supabase
        .from('community_profiles')
        .upsert(communityData, { onConflict: 'id' });

      if (communityError) throw communityError;

      setSuccess(true);
      setTimeout(() => {
        router.push('/community');
      }, 1500);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AuthGuard>
        <Page 
            variant={1}
            environment="community"
            showForeground={false}
            animated={true}   
            showContinuityBeam={true}
        >
          <div className="min-h-screen flex items-center justify-center">
            <Loader2 size={32} className="animate-spin text-cyan-400" />
          </div>
        </Page>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <Page 
        variant={1}
        environment="community"
        showForeground={false}
        animated={true}   
        showContinuityBeam={true}
      >
        <main className="min-h-screen py-20 px-6">
          <div className="container max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="mb-8">
              <Link
                href="/community"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors"
              >
                ← Back to Community
              </Link>
              <div className="flex items-center gap-3">
                <Heart className="text-pink-400" size={32} />
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Edit Community Profile
                </h1>
              </div>
              <p className="text-white/60 mt-2">
                Tell us how you want to be seen, heard, and supported in the sanctuary.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Success Message */}
              {success && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3">
                  <CheckCircle className="text-green-400" size={20} />
                  <p className="text-green-400">Profile updated successfully!</p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3">
                  <AlertCircle className="text-red-400" size={20} />
                  <p className="text-red-400">{error}</p>
                </div>
              )}

              {/* Council House Selection */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="text-cyan-400" size={24} />
                  <h2 className="text-xl font-bold text-white">Council House</h2>
                </div>
                <p className="text-white/60 text-sm mb-4">
                  Choose the council entity you resonate with most. This helps others understand your perspective.
                </p>
                <Select
                  label="Primary House"
                  value={primaryHouse}
                  onChange={(e) => setPrimaryHouse(e.target.value)}
                  options={COUNCIL_HOUSES}
                />
              </Card>

              {/* Neurodivergent Identity */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="text-purple-400" size={24} />
                  <h2 className="text-xl font-bold text-white">Neurodivergent Identity</h2>
                </div>
                <p className="text-white/60 text-sm mb-4">
                  How do you identify? Select all that apply. (Optional)
                </p>
                <div className="flex flex-wrap gap-2">
                  {ND_IDENTITY_OPTIONS.map(option => (
                    <Badge
                      key={option.value}
                      variant={ndIdentity.includes(option.value) ? 'primary' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => toggleArrayItem(ndIdentity, setNdIdentity, option.value)}
                    >
                      {option.label}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Sensory Accommodations */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <EyeIcon className="text-green-400" size={24} />
                  <h2 className="text-xl font-bold text-white">Sensory Accommodations</h2>
                </div>
                <p className="text-white/60 text-sm mb-4">
                  What helps you feel comfortable? Select all that apply.
                </p>
                <div className="flex flex-wrap gap-2">
                  {SENSORY_ACCOMMODATIONS.map(option => (
                    <Badge
                      key={option.value}
                      variant={sensoryAccommodations.includes(option.value) ? 'primary' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => toggleArrayItem(sensoryAccommodations, setSensoryAccommodations, option.value)}
                    >
                      {option.label}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Support Needs */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="text-orange-400" size={24} />
                  <h2 className="text-xl font-bold text-white">Support Needs</h2>
                </div>
                <p className="text-white/60 text-sm mb-4">
                  What helps you thrive? Select all that apply.
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUPPORT_NEEDS.map(option => (
                    <Badge
                      key={option.value}
                      variant={supportNeeds.includes(option.value) ? 'primary' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => toggleArrayItem(supportNeeds, setSupportNeeds, option.value)}
                    >
                      {option.label}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Communication Preferences */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MessageIcon className="text-blue-400" size={24} />
                  <h2 className="text-xl font-bold text-white">Communication Preferences</h2>
                </div>
                <TextArea
                  label="Communication Notes"
                  value={communicationNotes}
                  onChange={(e) => setCommunicationNotes(e.target.value)}
                  placeholder="How do you prefer to communicate? What should others know about your communication style?"
                  rows={3}
                />
              </Card>

              {/* Crisis Support */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="text-yellow-400" size={24} />
                  <h2 className="text-xl font-bold text-white">Crisis Support (Optional)</h2>
                </div>
                <p className="text-white/60 text-sm mb-4">
                  This information is private and only visible to you and sanctuary stewards.
                </p>
                <div className="space-y-4">
                  <Input
                    label="Crisis Contact Name"
                    value={crisisContactName}
                    onChange={(e) => setCrisisContactName(e.target.value)}
                    placeholder="Name of someone to contact in crisis"
                  />
                  <Input
                    label="Crisis Contact Phone"
                    value={crisisContactPhone}
                    onChange={(e) => setCrisisContactPhone(e.target.value)}
                    placeholder="Phone number"
                  />
                  <Input
                    label="Crisis Contact Email"
                    value={crisisContactEmail}
                    onChange={(e) => setCrisisContactEmail(e.target.value)}
                    placeholder="Email address"
                    type="email"
                  />
                  <TextArea
                    label="Crisis Instructions"
                    value={crisisInstructions}
                    onChange={(e) => setCrisisInstructions(e.target.value)}
                    placeholder="What should someone know to support you in a crisis?"
                    rows={3}
                  />
                </div>
              </Card>

              {/* Mentor Status */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="text-pink-400" size={24} />
                  <h2 className="text-xl font-bold text-white">Mentor Status</h2>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Become a Mentor</p>
                    <p className="text-white/40 text-sm">Share your experience and support others in the community</p>
                  </div>
                  <Toggle
                    checked={isMentor}
                    onChange={setIsMentor}
                  />
                </div>
              </Card>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={saving}
                  className="flex-1"
                >
                  {saving ? (
                    <>
                      <Loader2 size={18} className="animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} className="mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
                <Link href="/community">
                  <Button variant="outline">Cancel</Button>
                </Link>
              </div>
            </form>
          </div>
        </main>
      </Page>
    </AuthGuard>
  );
}

// Helper icons (since we can't import from lucide if they don't exist)
function EyeIcon(props: any) {
  return (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function MessageIcon(props: any) {
  return (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}