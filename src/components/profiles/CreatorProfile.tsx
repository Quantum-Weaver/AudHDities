// components/profiles/CreatorProfile.tsx
'use client';

import { Package, DollarSign, TrendingUp, ExternalLink, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import type { Database } from '@/types/supabase/database.types';

type CreatorProfile = Database['public']['Tables']['creator_profiles']['Row'];

interface CreatorProfileProps {
  creator: CreatorProfile;
  productCount?: number;
  showActions?: boolean;
}

export default function CreatorProfile({ 
  creator, 
  productCount = 0,
  showActions = false 
}: CreatorProfileProps) {

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

  const verification = getVerificationStatus(creator.verification_status);

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Creator Profile</h3>
          {creator.creative_description && (
            <p className="text-white/70">{creator.creative_description}</p>
          )}
        </div>
        
        {/* Verification badge */}
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm border ${verification.color} border-current/20`}>
          {creator.verified_badge ? (
            <CheckCircle size={14} className="text-green-400" />
          ) : (
            <Clock size={14} />
          )}
          <span>{verification.label}</span>
        </div>
      </div>

      {/* Categories */}
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

      {/* Residual Pool Setting */}
      <div>
        <h4 className="text-sm font-medium text-white/60 mb-2">Residual Pool</h4>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-cyan-400 rounded-full"
              style={{ width: `${creator.default_residual_pool || 30}%` }}
            />
          </div>
          <span className="text-sm text-white font-mono">
            {creator.default_residual_pool || 30}%
          </span>
        </div>
        <p className="text-xs text-white/40 mt-1">
          Default pool for contributor residuals
        </p>
      </div>

      {/* Portfolio Link */}
      {creator.portfolio_url && (
        <div className="pt-2">
          <a
            href={creator.portfolio_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ExternalLink size={16} />
            <span>View Portfolio</span>
          </a>
        </div>
      )}

      {/* Admin Actions (optional) */}
      {showActions && (
        <div className="flex gap-3 pt-4 border-t border-white/10">
          <button className="px-4 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg text-sm transition-colors">
            Verify Creator
          </button>
          <button className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg text-sm transition-colors">
            Reject
          </button>
        </div>
      )}
    </div>
  );
}