// src/app/(dashboard)/vendor/edit/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/lib/supabase/client';
import AuthGuard from '@/components/auth/AuthGuard';
import ProfileHeader from '@/components/profiles/ProfileHeader';
import Tabs from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Loader2, Store, Truck, Globe, Info, Save, PlusCircle, X } from 'lucide-react';
import type { Database } from '@/types/supabase/database.types';
import Link from 'next/link';

type Profile = Database['public']['Tables']['profiles']['Row'];
type CommunityProfile = Database['public']['Tables']['community_profiles']['Row'];
type CreatorProfile = Database['public']['Tables']['creator_profiles']['Row'];
type VendorProfile = Database['public']['Tables']['vendor_profiles']['Row'];

const BUSINESS_TYPES = [
  { value: 'sole_proprietor', label: 'Sole Proprietor' },
  { value: 'llc', label: 'LLC' },
  { value: 'nonprofit', label: 'Nonprofit' },
  { value: 'cooperative', label: 'Cooperative' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'other', label: 'Other' },
];

const SERVICE_CATEGORIES = [
  'Shipping / Logistics', 'Packaging', 'Transportation', 'Venues / Spaces',
  'Marketing / Promotion', 'Legal Services', 'Accounting / Finance',
  'Manufacturing', 'Printing', 'Event Planning', 'Consulting',
  'Technology / IT', 'Translation / Localization', 'Accessibility Services', 'Other'
];

export default function VendorEditPage() {
  const supabase = useSupabase();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [communityProfile, setCommunityProfile] = useState<CommunityProfile | null>(null);
  const [creatorProfile, setCreatorProfile] = useState<CreatorProfile | null>(null);
  const [vendorProfile, setVendorProfile] = useState<VendorProfile | null>(null);
  const [badges, setBadges] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    display_name: '',
    bio: '',
    business_name: '',
    business_type: '',
    business_description: '',
    product_categories: [] as string[],
    website_url: '',
  });
  const [newCategory, setNewCategory] = useState('');

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
        business_name: vendorResult.data?.business_name || '',
        business_type: vendorResult.data?.business_type || '',
        business_description: vendorResult.data?.business_description || '',
        product_categories: vendorResult.data?.product_categories || [],
        website_url: vendorResult.data?.website_url || '',
      });

      setLoading(false);
    };
    loadProfile();
  }, [supabase, router]);

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    try {
      await supabase.from('profiles').update({ display_name: formData.display_name, bio: formData.bio, updated_at: new Date().toISOString() }).eq('id', profile.id);
      if (vendorProfile) {
        await supabase.from('vendor_profiles').update({ business_name: formData.business_name, business_type: formData.business_type, business_description: formData.business_description, product_categories: formData.product_categories, website_url: formData.website_url, updated_at: new Date().toISOString() }).eq('id', profile.id);
      } else {
        await supabase.from('vendor_profiles').insert({ id: profile.id, business_name: formData.business_name, business_type: formData.business_type, business_description: formData.business_description, product_categories: formData.product_categories, website_url: formData.website_url });
      }
      router.push('/vendor');
    } catch (error) { console.error('Error saving vendor profile:', error); } finally { setSaving(false); }
  };

  const handleAddCategory = () => { if (newCategory && !formData.product_categories.includes(newCategory)) { setFormData({ ...formData, product_categories: [...formData.product_categories, newCategory] }); setNewCategory(''); } };
  const handleRemoveCategory = (category: string) => { setFormData({ ...formData, product_categories: formData.product_categories.filter(c => c !== category) }); };

  if (loading) return (<AuthGuard><div className="min-h-screen flex items-center justify-center"><Loader2 size={32} className="animate-spin text-purple-400" /></div></AuthGuard>);
  if (!profile) return (<AuthGuard><div className="min-h-screen flex items-center justify-center"><div className="text-center"><p className="text-white/60 mb-4">Profile not found</p><button onClick={() => router.push('/')} className="px-4 py-2 bg-purple-600 text-white rounded-lg">Return Home</button></div></div></AuthGuard>);

  const editTabs = [
    { id: 'basic', label: 'Basic Info', content: (<div className="space-y-6"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center"><Info size={20} className="text-cyan-400" /></div><h2 className="text-xl font-bold text-white">Basic Information</h2></div><Input label="Display Name" value={formData.display_name} onChange={(e) => setFormData({ ...formData, display_name: e.target.value })} /><TextArea label="Bio" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} rows={4} /></div>) },
    { id: 'vendor', label: 'Vendor Workshop', content: (<div className="space-y-6"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center"><Store size={20} className="text-purple-400" /></div><h2 className="text-xl font-bold text-white">Business Profile</h2></div><Input label="Business Name" value={formData.business_name} onChange={(e) => setFormData({ ...formData, business_name: e.target.value })} required /><Select label="Business Type" value={formData.business_type} onChange={(e) => setFormData({ ...formData, business_type: e.target.value })} options={BUSINESS_TYPES} /><TextArea label="Business Description" value={formData.business_description} onChange={(e) => setFormData({ ...formData, business_description: e.target.value })} rows={3} placeholder="Describe your business and the services you offer..." /><div className="space-y-2"><label className="block text-sm font-medium text-white/80">Service Categories</label><div className="flex flex-wrap gap-2 mb-2">{formData.product_categories.map(cat => (<Badge key={cat} variant="primary" className="flex items-center gap-1 px-3 py-1">{cat}<button onClick={() => handleRemoveCategory(cat)}><X size={12} /></button></Badge>))}</div><div className="flex gap-2"><select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"><option value="">Add a category...</option>{SERVICE_CATEGORIES.filter(c => !formData.product_categories.includes(c)).map(cat => <option key={cat} value={cat}>{cat}</option>)}</select><Button onClick={handleAddCategory} variant="outline" size="sm"><PlusCircle size={16} /></Button></div></div><Input label="Website URL" value={formData.website_url} onChange={(e) => setFormData({ ...formData, website_url: e.target.value })} placeholder="https://yourbusiness.com" /><div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4"><div className="flex items-start gap-3"><Info size={18} className="text-purple-400 mt-0.5" /><p className="text-sm text-white/70">Vendors help creators reach their audience. Your services are essential to the sanctuary economy.</p></div></div></div>) }
  ];

  if (profile.is_creator) editTabs.push({ id: 'creator', label: 'Creator', content: <div className="text-white/60 text-center py-8 bg-white/5 rounded-lg"><p>Creator settings are managed in the Creator Dashboard.</p><Link href="/creator" className="text-cyan-400 hover:underline mt-2 inline-block">Go to Creator Hub →</Link></div> });

  return (<AuthGuard><main className="min-h-screen pb-20"><ProfileHeader profile={profile} communityProfile={communityProfile} creatorProfile={creatorProfile} vendorProfile={vendorProfile} badges={badges} isOwnProfile={true} /><div className="container max-w-4xl mx-auto px-6 mt-16"><div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8"><div className="flex items-center justify-between mb-6"><h1 className="text-2xl font-bold text-white">Edit Vendor Profile</h1><Button onClick={handleSave} disabled={saving} className="gap-2 bg-purple-600 hover:bg-purple-500"><Save size={18} />{saving ? 'Saving...' : 'Save Changes'}</Button></div><Tabs tabs={editTabs} activeTab={activeTab} onChange={setActiveTab} /></div></div></main></AuthGuard>);
}