// components/profiles/CreatorProfile.tsx
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Palette, Clock, DollarSign, TrendingUp, CheckCircle, Store, Package } from 'lucide-react';
import type { Database } from '@/types/supabase/database.types';

type CreatorProfile = Database['public']['Tables']['creator_profiles']['Row'];

interface CreatorProfileProps {
  userId: string;
  showActions?: boolean;
}

export function CreatorProfile({
  userId,
  showActions = false 
}: CreatorProfileProps) {
  const [creator, setCreator] = useState<CreatorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [productCount, setProductCount] = useState(0);
  const supabase = createClient();

  useEffect(() => {
    async function loadCreatorProfile() {
      const { data: creatorrData, error: creatorError } = await supabase
        .from('creator_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (!creatorError && creatorrData) {
        setCreator(creatorrData);
      }

      // Fetch product count for this creator
      const { count, error: countError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('owner_type', 'creator')
        .eq('creator_id', userId); // Note: products use creator_id, not creator_id

      if (!countError && count !== null) {
        setProductCount(count);
      }

      setLoading(false);
    }

    loadCreatorProfile();
  }, [userId, supabase]);

  const getVerificationStatus = (status: string | null) => {
    if (!status) return { color: 'text-white/40', label: 'Not verified' };
    
    const statusMap: Record<string, { color: string; label: string }> = {
      pending: { color: 'text-yellow-400', label: 'Pending' },
      verified: { color: 'text-green-400', label: 'Verified' },
      rejected: { color: 'text-red-400', label: 'Rejected' },
      suspended: { color: 'text-red-400', label: 'Suspended' }
    };
    
    return statusMap[status] || { color: 'text-white/40', label: status };
  };

  const getCreatorMonikerDisplay = (type: string | null) => {
    if (!type) return null;
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (loading) return <div className="text-white/60 text-center py-8">Loading creator profile...</div>;
  if (!creator) return null;

  const verification = getVerificationStatus(creator.verification_status);

  return (
   <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
      {/* Header with business name */}
      <div className="flex items-start gap-4">
        {/* Business logo placeholder */}
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
          {creator.creator_logo_url ? (
            <img 
              src={creator.creator_logo_url} 
              alt={creator.creator_moniker} 
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <Store size={24} className="text-white/40" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4">
            <div className="truncate">
              <h3 className="text-xl font-bold text-white truncate">{creator.creator_moniker}</h3>
              {creator.creative_categories && (
                <p className="text-sm text-white/40">
                  {getCreatorMonikerDisplay(creator.creative_categories[0])}
                </p>
              )}
            </div>
           
            {/* Verification badge */}
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm border ${verification.color} border-current/20 flex-shrink-0`}>
              {creator.verified_badge ? (
                <CheckCircle size={14} className="text-green-400" />
              ) : (
                <Palette size={14} />
              )}
              <span>{verification.label}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Creative Description */}
      {creator.creative_description && (
        <p className="text-white/70">{creator.creative_description}</p>
      )}

      {/* Creative Categories */}
      {creator.creative_categories && creator.creative_categories.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-white/60 mb-2">Categories</h4>
          <div className="flex flex-wrap gap-2">
            {creator.creative_categories.map((category, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-white/70"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/10">
        <div>
          <div className="flex items-center gap-1 text-cyan-400 mb-1">
            <Package size={14} />
            <span className="text-xs">Products</span>
          </div>
          <p className="text-xl font-bold text-white">{productCount}</p>
        </div>

        <div>
          <div className="flex items-center gap-1 text-green-400 mb-1">
            <TrendingUp size={14} />
            <span className="text-xs">Sales</span>
          </div>
          <p className="text-xl font-bold text-white">{creator.total_sales || 0}</p>
        </div>

        <div>
          <div className="flex items-center gap-1 text-purple-400 mb-1">
            <DollarSign size={14} />
            <span className="text-xs">Earnings</span>
          </div>
          <p className="text-xl font-bold text-white">
            ${(creator.total_earnings || 0).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Admin Actions (optional) */}
      {showActions && (
        <div className="flex gap-3 pt-4 border-t border-white/10">
          <button className="px-4 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg text-sm transition-colors">
            Verify creator
          </button>
          <button className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg text-sm transition-colors">
            Reject
          </button>
        </div>
      )}
    </div>
  );
}