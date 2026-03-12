'use client';

import type { Database } from '@/types/supabase/database.types'
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Product = Database['public']['Tables']['profiles']['Row']
import { useSupabase } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const supabase = useSupabase();
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [contributors, setContributors] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setUserProfile(profile);
      }
      
      // Fetch contributors for transparency
      const { data: contribs } = await supabase
        .from('contributions')
        .select('*, profiles(display_name)')
        .eq('product_id', product.id);
      setContributors(contribs || []);
    };
    
    fetchData();
  }, [product.id, supabase]);

  // Dynamic pricing based on Acid Test tier
  const getPrice = () => {
    if (!userProfile) return product.price_ally; // Default to ally if not logged in
    
    switch (userProfile.user_tier) {
      case 'community': return product.price_community;
      case 'corporate': return product.price_corporate;
      default: return product.price_ally;
    }
  };

  const price = getPrice();
  const isSubsidized = userProfile?.user_tier === 'community' && price < product.price_ally;

  return (
    <motion.div 
      className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 space-y-4"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-white">{product.title}</h3>
        {isSubsidized && (
          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
            Community Subsidized
          </span>
        )}
      </div>
      
      <p className="text-white/70">{product.description}</p>
      
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-white">${price}</span>
        {isSubsidized && (
          <span className="text-sm text-white/50 line-through">${product.price_ally}</span>
        )}
      </div>

      {/* Residual Transparency */}
      <div className="text-xs text-white/50 space-y-1">
        <p>{product.residual_pool_percent}% flows to contributors</p>
        <div className="flex gap-2">
          {contributors.slice(0, 3).map((c, i) => (
            <span key={i} className="text-cyan-400">
              {c.profiles?.display_name || 'Anonymous'} ({c.percent_share}%)
            </span>
          ))}
        </div>
      </div>

      <button 
        className="w-full py-3 bg-gradient-to-r from-cyan-600 to-purple-600 
                   hover:from-cyan-500 hover:to-purple-500 text-white rounded-lg
                   font-medium transition-all"
        onClick={() => {/* Stripe integration here */}}
      >
        {price === 0 ? 'Access Free' : 'Acquire Tool'}
      </button>
    </motion.div>
  );
}