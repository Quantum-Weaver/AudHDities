// components/profile-dashboard/tabs/SettingsTab.tsx
'use client';

import { useState } from 'react';
import { useSupabase } from '@/utils/supabase/client';
import { Profile } from '@/types/supabase';
import { Palette, Accessibility, Coins, Save } from 'lucide-react';

interface SettingsTabProps {
  profile: Profile;
  userId: string;
}

export default function SettingsTab({ profile, userId }: SettingsTabProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    display_name: profile.display_name || '',
    dyslexia_mode: profile.dyslexia_mode || false,
    sensory_mode: profile.sensory_mode || 'hearth',
    residual_pledge_percent: profile.residual_pledge_percent || 0
  });
  
  const supabase = useSupabase();

const handleSave = async () => {
  setLoading(true);
  
  // Create an update object with explicit typing
  const updateData: {
    display_name?: string | null;
    dyslexia_mode?: boolean;
    sensory_mode?: string;
    residual_pledge_percent?: number;
    updated_at?: string;
  } = {
    ...formData,
    updated_at: new Date().toISOString()
  };

  await supabase
    .from('profiles')
    .update(updateData)
    .eq('id', userId);
    
  setLoading(false);
};

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Personal Settings */}
      <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl p-6 space-y-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Palette size={20} className="text-pink-400" />
          Identity
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-white/60 mb-2">Display Name</label>
            <input
              type="text"
              value={formData.display_name}
              onChange={(e) => setFormData({...formData, display_name: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Accessibility */}
      <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl p-6 space-y-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Accessibility size={20} className="text-orange-400" />
          Accessibility
        </h3>
        
        <div className="space-y-4">
          <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer">
            <span className="text-white">Dyslexia-Friendly Font</span>
            <input
              type="checkbox"
              checked={formData.dyslexia_mode}
              onChange={(e) => setFormData({...formData, dyslexia_mode: e.target.checked})}
              className="w-5 h-5 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500"
            />
          </label>

          <div>
            <label className="block text-sm text-white/60 mb-2">Sensory Environment</label>
            <select
              value={formData.sensory_mode}
              onChange={(e) => setFormData({...formData, sensory_mode: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="hearth">Hearth (Calm, Warm)</option>
              <option value="quantum">Quantum (High Contrast)</option>
              <option value="void">Void (OLED Dark)</option>
            </select>
          </div>
        </div>
      </div>

      {/* The 50% Covenant */}
      <div className="md:col-span-2 bg-gradient-to-r from-purple-900/40 to-cyan-900/40 backdrop-blur-lg border border-white/20 rounded-xl p-6 space-y-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Coins size={20} className="text-green-400" />
          The 50% Covenant (Residual Pledge)
        </h3>
        
        <p className="text-white/70">
          Pledge a percentage of your future earnings to the Sanctuary Commons. 
          This funds free access for community members and infrastructure.
        </p>

        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="50"
            value={formData.residual_pledge_percent}
            onChange={(e) => setFormData({...formData, residual_pledge_percent: parseInt(e.target.value)})}
            className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
          <div className="w-20 text-right">
            <span className="text-2xl font-bold text-white">{formData.residual_pledge_percent}%</span>
          </div>
        </div>

        {formData.residual_pledge_percent > 0 && (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-green-400 text-sm">
              ✨ You are pledging <strong>{formData.residual_pledge_percent}%</strong> of your future residuals 
              to the Sanctuary Commons. This directly enables subsidized access for others.
            </p>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="md:col-span-2">
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 disabled:bg-white/5 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
        >
          <Save size={20} />
          {loading ? 'Updating Sanctum...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}