// src/app/(dashboard)/profile/edit/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/lib/supabase/client';
import AuthGuard from '@/components/auth/AuthGuard';
import ProfileHeader from '@/components/profiles/ProfileHeader';
import Tabs from '@/components/ui/Tabs';
import ProfileForm from '@/components/profiles/ProfileForm';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Loader2, User, Heart, Eye, PlusCircle, Shield, Save, Info, Palette, Truck, X } from 'lucide-react';
import type { Database } from '@/types/supabase/database.types';
import Link from 'next/link';

type Profile = Database['public']['Tables']['profiles']['Row'];
type CommunityProfile = Database['public']['Tables']['community_profiles']['Row'];
type CreatorProfile = Database['public']['Tables']['creator_profiles']['Row'];
type VendorProfile = Database['public']['Tables']['vendor_profiles']['Row'];

const ND_IDENTITY_OPTIONS = ['Autistic', 'ADHD', 'Dyslexic', 'Dyspraxic', 'Tourette\'s', 'Other Neurodivergence', 'Prefer not to say'];
const COMMUNICATION_STYLES = [{ value: 'direct', label: 'Direct - Straightforward, minimal social preamble' }, { value: 'gentle', label: 'Gentle - Softened, with emotional context' }, { value: 'detailed', label: 'Detailed - Comprehensive, all information included' }, { value: 'concise', label: 'Concise - Brief, tl;dr friendly' }];
const SENSITIVITY_OPTIONS = [{ value: 'low', label: 'Low' }, { value: 'medium', label: 'Medium' }, { value: 'high', label: 'High' }, { value: 'avoidant', label: 'Avoidant' }];

export default function EditProfilePage() {
  const supabase = useSupabase(); const router = useRouter();
  const [loading, setLoading] = useState(true); const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [communityProfile, setCommunityProfile] = useState<CommunityProfile | null>(null);
  const [creatorProfile, setCreatorProfile] = useState<CreatorProfile | null>(null);
  const [vendorProfile, setVendorProfile] = useState<VendorProfile | null>(null);
  const [badges, setBadges] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({ display_name: '', bio: '', preferred_name: '', communication_style: '', nd_identity: [] as string[], light_sensitivity: 'medium', sound_sensitivity: 'medium', crowd_sensitivity: 'medium' });
  const [newIdentity, setNewIdentity] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      const [profileResult, communityResult, creatorResult, vendorResult, badgesResult] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('community_profiles').select('*').eq('id', user.id).maybeSingle(),
        supabase.from('creator_profiles').select('*').eq('id', user.id).maybeSingle(),
        supabase.from('vendor_profiles').select('*').eq('id', user.id).maybeSingle(),
        supabase.from('user_badges').select('*, badge').eq('user_id', user.id)
      ]);
      if (profileResult.error) { router.push('/dashboard'); return; }
      setProfile(profileResult.data);
      setCommunityProfile(communityResult.data || null);
      setCreatorProfile(creatorResult.data || null);
      setVendorProfile(vendorResult.data || null);
      setBadges(badgesResult.data || []);
      setFormData({
        display_name: profileResult.data.display_name || '',
        bio: profileResult.data.bio || '',
        preferred_name: profileResult.data.preferred_name || '',
        communication_style: profileResult.data.communication_style || 'direct',
        nd_identity: communityResult.data?.nd_identity || [],
        light_sensitivity: (profileResult.data.sensory_preferences as any)?.light_sensitivity || 'medium',
        sound_sensitivity: (profileResult.data.sensory_preferences as any)?.sound_sensitivity || 'medium',
        crowd_sensitivity: (profileResult.data.sensory_preferences as any)?.crowd_sensitivity || 'medium',
      });
      setLoading(false);
    };
    loadProfile();
  }, [supabase, router]);

  const handleSave = async () => {
    if (!profile) return; setSaving(true);
    try {
      await supabase.from('profiles').update({ display_name: formData.display_name, bio: formData.bio, preferred_name: formData.preferred_name, communication_style: formData.communication_style, sensory_preferences: { light_sensitivity: formData.light_sensitivity, sound_sensitivity: formData.sound_sensitivity, crowd_sensitivity: formData.crowd_sensitivity }, updated_at: new Date().toISOString() }).eq('id', profile.id);
      if (communityProfile) { await supabase.from('community_profiles').update({ nd_identity: formData.nd_identity }).eq('id', profile.id); } 
      else { await supabase.from('community_profiles').insert({ id: profile.id, nd_identity: formData.nd_identity }); }
      router.push('/profile');
    } catch (error) { console.error('Error saving profile:', error); } finally { setSaving(false); }
  };

  const handleAddIdentity = () => { if (newIdentity && !formData.nd_identity.includes(newIdentity)) { setFormData({ ...formData, nd_identity: [...formData.nd_identity, newIdentity] }); setNewIdentity(''); } };
  const handleRemoveIdentity = (identity: string) => { setFormData({ ...formData, nd_identity: formData.nd_identity.filter(i => i !== identity) }); };

  if (loading) return (<AuthGuard><div className="min-h-screen flex items-center justify-center"><Loader2 size={32} className="animate-spin text-cyan-400" /></div></AuthGuard>);
  if (!profile) return (<AuthGuard><div className="min-h-screen flex items-center justify-center"><div className="text-center"><p className="text-white/60 mb-4">Profile not found</p><button onClick={() => router.push('/')} className="px-4 py-2 bg-cyan-600 text-white rounded-lg">Return Home</button></div></div></AuthGuard>);

  const editTabs = [
    { id: 'basic', label: 'Basic Info', content: (<div className="space-y-6"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center"><User size={20} className="text-cyan-400" /></div><h2 className="text-xl font-bold text-white">Basic Information</h2></div><Input label="Display Name" value={formData.display_name} onChange={(e) => setFormData({ ...formData, display_name: e.target.value })} placeholder="How you want to be known" /><Input label="Preferred Name" value={formData.preferred_name} onChange={(e) => setFormData({ ...formData, preferred_name: e.target.value })} placeholder="Name used for communication (optional)" /><TextArea label="Bio" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} rows={4} placeholder="Tell the community about yourself..." /></div>) },
    { id: 'community', label: 'Community', content: (<div className="space-y-6"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center"><Heart size={20} className="text-pink-400" /></div><h2 className="text-xl font-bold text-white">Community Identity</h2></div><Select label="Communication Style" value={formData.communication_style} onChange={(e) => setFormData({ ...formData, communication_style: e.target.value })} options={COMMUNICATION_STYLES} /><div className="space-y-2"><label className="block text-sm font-medium text-white/80">Neurodivergent Identity (Optional)</label><div className="flex flex-wrap gap-2 mb-2">{formData.nd_identity.map(id => (<Badge key={id} variant="primary" className="flex items-center gap-1 px-3 py-1">{id}<button onClick={() => handleRemoveIdentity(id)}><X size={12} /></button></Badge>))}</div><div className="flex gap-2"><select value={newIdentity} onChange={(e) => setNewIdentity(e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"><option value="">Select identity...</option>{ND_IDENTITY_OPTIONS.filter(i => !formData.nd_identity.includes(i)).map(i => <option key={i} value={i}>{i}</option>)}</select><Button onClick={handleAddIdentity} variant="outline" size="sm"><PlusCircle size={16} /></Button></div></div><div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4"><Info size={18} className="text-pink-400 mb-2" /><p className="text-sm text-white/70">Your identity helps us build community and provide better support. Totally optional, always private.</p></div></div>) },
    { id: 'sensory', label: 'Sensory', content: (<div className="space-y-6"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center"><Eye size={20} className="text-purple-400" /></div><h2 className="text-xl font-bold text-white">Sensory Preferences</h2></div><Select label="Light Sensitivity" value={formData.light_sensitivity} onChange={(e) => setFormData({ ...formData, light_sensitivity: e.target.value })} options={SENSITIVITY_OPTIONS} /><Select label="Sound Sensitivity" value={formData.sound_sensitivity} onChange={(e) => setFormData({ ...formData, sound_sensitivity: e.target.value })} options={SENSITIVITY_OPTIONS} /><Select label="Crowd Sensitivity" value={formData.crowd_sensitivity} onChange={(e) => setFormData({ ...formData, crowd_sensitivity: e.target.value })} options={SENSITIVITY_OPTIONS} /><div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4"><Info size={18} className="text-purple-400 mb-2" /><p className="text-sm text-white/70">These preferences help us customize your experience. Nothing is shared without your consent.</p></div></div>) }
  ];
  if (profile.is_creator) editTabs.push({ id: 'creator', label: 'Creator', content: (<div className="text-center py-8"><Palette size={32} className="text-cyan-400 mx-auto mb-4" /><p className="text-white/60">Creator settings are managed in the Creator Dashboard.</p><Link href="/creator/edit" className="text-cyan-400 hover:underline mt-2 inline-block">Go to Creator Settings →</Link></div>) });
  if (profile.is_vendor) editTabs.push({ id: 'vendor', label: 'Vendor', content: (<div className="text-center py-8"><Truck size={32} className="text-purple-400 mx-auto mb-4" /><p className="text-white/60">Vendor settings are managed in the Vendor Dashboard.</p><Link href="/vendor/edit" className="text-purple-400 hover:underline mt-2 inline-block">Go to Vendor Settings →</Link></div>) });

  return (<AuthGuard><main className="min-h-screen pb-20"><ProfileHeader profile={profile} communityProfile={communityProfile} creatorProfile={creatorProfile} vendorProfile={vendorProfile} badges={badges} isOwnProfile={true} /><div className="container max-w-4xl mx-auto px-6 mt-16"><div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8"><div className="flex items-center justify-between mb-6"><h1 className="text-2xl font-bold text-white">Edit Profile</h1><Button onClick={handleSave} disabled={saving} className="gap-2"><Save size={18} />{saving ? 'Saving...' : 'Save Changes'}</Button></div><Tabs tabs={editTabs} activeTab={activeTab} onChange={setActiveTab} /></div></div></main></AuthGuard>);
}