// src/app/(dashboard)/creator/edit/page.tsx
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
import { Loader2, Palette, DollarSign, Globe, Award, Info, Save, PlusCircle, X } from 'lucide-react';
import type { Database } from '@/types/supabase/database.types';
import Link from 'next/link';

type Profile = Database['public']['Tables']['profiles']['Row'];
type CommunityProfile = Database['public']['Tables']['community_profiles']['Row'];
type CreatorProfile = Database['public']['Tables']['creator_profiles']['Row'];
type VendorProfile = Database['public']['Tables']['vendor_profiles']['Row'];

const CREATIVE_CATEGORIES = [
  'Visual Art', 'Music', 'Writing / Poetry', 'Code / Software', 
  'Digital Art', 'Crafts / Handmade', 'Photography', 'Film / Video',
  'Performance', 'Education / Teaching', 'Mentorship', 'Other'
];

const RESIDUAL_POOL_OPTIONS = [
  { value: '10', label: '10% - Minimum share' },
  { value: '20', label: '20%' },
  { value: '30', label: '30% - Standard' },
  { value: '40', label: '40%' },
  { value: '50', label: '50% - Maximum share' },
];

export default function CreatorEditPage() {
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
    // Basic profile fields
    display_name: '',
    bio: '',
    
    // Creator fields
    creative_categories: [] as string[],
    creative_description: '',
    portfolio_url: '',
    default_residual_pool: 30,
  });
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const [profileResult, communityResult, creatorResult, vendorResult, badgesResult] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('community_profiles').select('*').eq('id', user.id).maybeSingle(),
        supabase.from('creator_profiles').select('*').eq('id', user.id).maybeSingle(),
        supabase.from('vendor_profiles').select('*').eq('id', user.id).maybeSingle(),
        supabase.from('user_badges').select('*, badge').eq('user_id', user.id)
      ]);

      if (profileResult.error) {
        console.error('Error loading profile:', profileResult.error);
        router.push('/dashboard');
        return;
      }

      setProfile(profileResult.data);
      setCommunityProfile(communityResult.data || null);
      setCreatorProfile(creatorResult.data || null);
      setVendorProfile(vendorResult.data || null);
      setBadges(badgesResult.data || []);

      // Populate form data
      setFormData({
        display_name: profileResult.data.display_name || '',
        bio: profileResult.data.bio || '',
        creative_categories: creatorResult.data?.creative_categories || [],
        creative_description: creatorResult.data?.creative_description || '',
        portfolio_url: creatorResult.data?.portfolio_url || '',
        default_residual_pool: creatorResult.data?.default_residual_pool || 30,
      });

      setLoading(false);
    };

    loadProfile();
  }, [supabase, router]);

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);

    try {
      // Update base profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          display_name: formData.display_name,
          bio: formData.bio,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile.id);

      if (profileError) throw profileError;

      // Update or create creator profile
      if (creatorProfile) {
        const { error: creatorError } = await supabase
          .from('creator_profiles')
          .update({
            creative_categories: formData.creative_categories,
            creative_description: formData.creative_description,
            portfolio_url: formData.portfolio_url,
            default_residual_pool: formData.default_residual_pool,
            updated_at: new Date().toISOString(),
          })
          .eq('id', profile.id);
        if (creatorError) throw creatorError;
      } else {
        const { error: insertError } = await supabase
          .from('creator_profiles')
          .insert({
            id: profile.id,
            creative_categories: formData.creative_categories,
            creative_description: formData.creative_description,
            portfolio_url: formData.portfolio_url,
            default_residual_pool: formData.default_residual_pool,
          });
        if (insertError) throw insertError;
      }

      router.push('/creator');
    } catch (error) {
      console.error('Error saving creator profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleAddCategory = () => {
    if (newCategory && !formData.creative_categories.includes(newCategory)) {
      setFormData({
        ...formData,
        creative_categories: [...formData.creative_categories, newCategory]
      });
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (category: string) => {
    setFormData({
      ...formData,
      creative_categories: formData.creative_categories.filter(c => c !== category)
    });
  };

  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-cyan-400" />
        </div>
      </AuthGuard>
    );
  }

  if (!profile) {
    return (
      <AuthGuard>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-white/60 mb-4">Profile not found</p>
            <button onClick={() => router.push('/')} className="px-4 py-2 bg-cyan-600 text-white rounded-lg">Return Home</button>
          </div>
        </div>
      </AuthGuard>
    );
  }

  const editTabs = [
    {
      id: 'basic',
      label: 'Basic Info',
      content: (
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center"><Info size={20} className="text-cyan-400" /></div>
            <h2 className="text-xl font-bold text-white">Basic Information</h2>
          </div>
          <Input label="Display Name" value={formData.display_name} onChange={(e) => setFormData({ ...formData, display_name: e.target.value })} placeholder="How you want to be known" />
          <TextArea label="Bio" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} placeholder="Tell the community about yourself..." rows={4} />
        </div>
      )
    },
    {
      id: 'creator',
      label: 'Creator Studio',
      content: (
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center"><Palette size={20} className="text-purple-400" /></div>
            <h2 className="text-xl font-bold text-white">Creative Profile</h2>
          </div>
          
          {/* Creative Categories */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Creative Categories</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.creative_categories.map(cat => (
                <Badge key={cat} variant="primary" className="flex items-center gap-1 px-3 py-1">
                  {cat}
                  <button onClick={() => handleRemoveCategory(cat)} className="hover:text-cyan-400"><X size={12} /></button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white">
                <option value="">Add a category...</option>
                {CREATIVE_CATEGORIES.filter(c => !formData.creative_categories.includes(c)).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <Button onClick={handleAddCategory} variant="outline" size="sm"><PlusCircle size={16} /></Button>
            </div>
          </div>

          <TextArea label="Creative Description" value={formData.creative_description} onChange={(e) => setFormData({ ...formData, creative_description: e.target.value })} placeholder="Describe your creative practice, inspiration, and what you create..." rows={4} />
          
          <Input label="Portfolio URL" value={formData.portfolio_url} onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}/>
          
          <Select label="Default Residual Pool" value={formData.default_residual_pool.toString()} onChange={(e) => setFormData({ ...formData, default_residual_pool: parseInt(e.target.value) })} options={RESIDUAL_POOL_OPTIONS} helperText="What percentage of your creator pool goes to contributors?" />
          
          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3"><Info size={18} className="text-cyan-400 mt-0.5" /><p className="text-sm text-white/70">Contributors earn their share forever. Set a residual pool that honors everyone who helps bring your creations to life.</p></div>
          </div>
        </div>
      )
    }
  ];

  if (profile.is_vendor) editTabs.push({ id: 'vendor', label: 'Vendor', content: <div className="text-white/60 text-center py-8 bg-white/5 rounded-lg"><p>Vendor settings are managed in the Vendor Dashboard.</p><Link href="/vendor" className="text-purple-400 hover:underline mt-2 inline-block">Go to Vendor Hub →</Link></div> });

  return (
    <AuthGuard>
      <main className="min-h-screen pb-20">
        <ProfileHeader profile={profile} communityProfile={communityProfile} creatorProfile={creatorProfile} vendorProfile={vendorProfile} badges={badges} isOwnProfile={true} />
        <div className="container max-w-4xl mx-auto px-6 mt-16">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6"><h1 className="text-2xl font-bold text-white">Edit Creator Profile</h1><Button onClick={handleSave} disabled={saving} className="gap-2"><Save size={18} />{saving ? 'Saving...' : 'Save Changes'}</Button></div>
            <Tabs tabs={editTabs} activeTab={activeTab} onChange={setActiveTab} />
          </div>
        </div>
      </main>
    </AuthGuard>
  );
}