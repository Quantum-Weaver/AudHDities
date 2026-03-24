// components/profiles/CreatorProfile.tsx
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Palette, DollarSign, TrendingUp, CheckCircle } from 'lucide-react';
import type { Database } from '@/types/supabase/database.types';

type CreatorProfile = Database['public']['Tables']['creator_profiles']['Row'];

interface CreatorProfileProps {
  userId: string;
}

export function CreatorProfile({ userId }: CreatorProfileProps) {
  const [creator, setCreator] = useState<CreatorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function loadCreatorProfile() {
      const { data, error } = await supabase
        .from('creator_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (!error && data) {
        setCreator(data);
      }
      setLoading(false);
    }

    loadCreatorProfile();
  }, [userId, supabase]);

  if (loading) return <div className="text-white/60 text-center py-8">Loading creator profile...</div>;
  if (!creator) return null;

  return (
    <div className="space-y-6">
      {/* Creator Status Badge */}
      {creator.verified_badge && (
        <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-2 rounded-lg w-fit">
          <CheckCircle size={18} />
          <span>Verified Creator</span>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <DollarSign className="mx-auto mb-2 text-cyan-400" size={24} />
          <div className="text-2xl font-bold text-white">{creator.total_products || 0}</div>
          <div className="text-xs text-white/40">Products</div>
        </Card>
        
        <Card className="p-4 text-center">
          <TrendingUp className="mx-auto mb-2 text-purple-400" size={24} />
          <div className="text-2xl font-bold text-white">{creator.total_sales || 0}</div>
          <div className="text-xs text-white/40">Sales</div>
        </Card>
        
        <Card className="p-4 text-center">
          <Palette className="mx-auto mb-2 text-pink-400" size={24} />
          <div className="text-2xl font-bold text-white">${creator.total_earnings || 0}</div>
          <div className="text-xs text-white/40">Earnings</div>
        </Card>
      </div>

      {/* Creative Categories */}
      {creator.creative_categories && creator.creative_categories.length > 0 && (
        <div>
          <h3 className="text-white font-medium mb-2">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {creator.creative_categories.map((cat: string) => ( 
              <Badge key={cat} variant="outline">{cat}</Badge>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      {creator.creative_description && (
        <div>
          <h3 className="text-white font-medium mb-2">About</h3>
          <p className="text-white/70">{creator.creative_description}</p>
        </div>
      )}

      {/* Portfolio */}
      {creator.portfolio_url && (
        <div>
          <a 
            href={creator.portfolio_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:underline"
          >
            View Portfolio →
          </a>
        </div>
      )}
    </div>
  );
}