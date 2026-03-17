// app/components/profiles/ProfileForm.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/lib/supabase/client';
import { Save, Loader2 } from 'lucide-react';

interface ProfileFormProps {
  initialProfile: {
    id: string;
    display_name: string | null;
    bio: string | null;
    username: string | null;
    avatar_url: string | null;
    banner_url: string | null;
  };
  onSuccess?: () => void;
}

export default function ProfileForm({ initialProfile, onSuccess }: ProfileFormProps) {
  const supabase = useSupabase();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state - only fields that exist in database
  const [formData, setFormData] = useState({
    display_name: initialProfile.display_name || '',
    bio: initialProfile.bio || '',
    username: initialProfile.username || '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Validate username
      if (formData.username && !/^[a-zA-Z0-9_]{3,30}$/.test(formData.username)) {
        throw new Error('Username must be 3-30 characters and can only contain letters, numbers, and underscores');
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          display_name: formData.display_name || null,
          bio: formData.bio || null,
          username: formData.username || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', initialProfile.id);

      if (updateError) throw updateError;

      router.refresh();
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Username */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-white/60 mb-1">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          pattern="^[a-zA-Z0-9_]{3,30}$"
          title="3-30 characters, letters, numbers, and underscores only"
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
          placeholder="quantum_weaver"
        />
        <p className="text-xs text-white/40 mt-1">
          3-30 characters, letters, numbers, and underscores only
        </p>
      </div>

      {/* Display Name */}
      <div>
        <label htmlFor="display_name" className="block text-sm font-medium text-white/60 mb-1">
          Display Name
        </label>
        <input
          type="text"
          id="display_name"
          name="display_name"
          value={formData.display_name}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
          placeholder="How you want to appear"
        />
      </div>

      {/* Bio */}
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-white/60 mb-1">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          value={formData.bio}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500 focus:outline-none resize-none"
          placeholder="Tell your story..."
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={saving}
        className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-white/5 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
      >
        {saving ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Save size={18} />
        )}
        Save Changes
      </button>
    </form>
  );
}