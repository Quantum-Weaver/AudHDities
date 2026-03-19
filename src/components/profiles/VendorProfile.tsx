// components/profiles/VendorProfile.tsx
'use client';

import { Package, DollarSign, TrendingUp, ExternalLink, CheckCircle, Clock, Store } from 'lucide-react';
import type { Database } from '@/types/supabase/database.types';

type VendorProfile = Database['public']['Tables']['vendor_profiles']['Row'];

interface VendorProfileProps {
  vendor: VendorProfile;
  productCount?: number;
  showActions?: boolean;
}

export default function VendorProfile({ 
  vendor, 
  productCount = 0,
  showActions = false 
}: VendorProfileProps) {

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

  const getBusinessTypeDisplay = (type: string | null) => {
    if (!type) return null;
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const verification = getVerificationStatus(vendor.verification_status);

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
      {/* Header with business name */}
      <div className="flex items-start gap-4">
        {/* Business logo placeholder */}
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
          {vendor.business_logo_url ? (
            <img 
              src={vendor.business_logo_url} 
              alt={vendor.business_name} 
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <Store size={24} className="text-white/40" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">{vendor.business_name}</h3>
              {vendor.business_type && (
                <p className="text-sm text-white/40">
                  {getBusinessTypeDisplay(vendor.business_type)}
                </p>
              )}
            </div>
            
            {/* Verification badge */}
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm border ${verification.color} border-current/20`}>
              {vendor.verified_badge ? (
                <CheckCircle size={14} className="text-green-400" />
              ) : (
                <Clock size={14} />
              )}
              <span>{verification.label}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Business Description */}
      {vendor.business_description && (
        <p className="text-white/70">{vendor.business_description}</p>
      )}

      {/* Product Categories */}
      {vendor.product_categories && vendor.product_categories.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-white/60 mb-2">Categories</h4>
          <div className="flex flex-wrap gap-2">
            {vendor.product_categories.map((category, index) => (
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
          <p className="text-xl font-bold text-white">{vendor.total_sales || 0}</p>
        </div>

        <div>
          <div className="flex items-center gap-1 text-purple-400 mb-1">
            <DollarSign size={14} />
            <span className="text-xs">Earnings</span>
          </div>
          <p className="text-xl font-bold text-white">
            ${(vendor.total_earnings || 0).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Admin Actions (optional) */}
      {showActions && (
        <div className="flex gap-3 pt-4 border-t border-white/10">
          <button className="px-4 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg text-sm transition-colors">
            Verify Vendor
          </button>
          <button className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg text-sm transition-colors">
            Reject
          </button>
        </div>
      )}
    </div>
  );
}