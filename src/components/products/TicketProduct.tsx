'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/hooks/useUser';
import type { Database, Tables } from '@/types/supabase/database.types'
export type Product = Database['public']['Tables']['products']['Row']
import { Check, Lock, Users, Sparkles, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type ProductWithContributions = Product & {
  contributions: (Tables<'contributions'> & {
    profiles: { display_name: string } | null;
  })[];
};

interface TicketProductProps {
  product: ProductWithContributions;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const TIER_INFO = {
  community: {
    label: 'Community Access',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    description: 'Subsidized for neurodivergent & disabled creators'
  },
  ally: {
    label: 'Ally Support',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    description: 'Full price supports community subsidies'
  },
  corporate: {
    label: 'Sponsorship',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    description: 'Corporate/organizational access + recognition'
  }
};

export default function TicketProduct({ product }: TicketProductProps) {
  const { user: userProfile, loading: userLoading } = useUser();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const userTier = userProfile?.user_tier as 'community' | 'ally' | 'corporate' || 'ally';

  const getPrice = () => {
    switch (userTier) {
      case 'community': return product.price_community_cents;
      case 'corporate': return product.price_corporate_cents;
      default: return product.price_ally_cents;
    };
  };

  const price = getPrice();
  const tierInfo = TIER_INFO[userTier];

  const handleCheckout = async () => {
    setCheckoutLoading(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          tier: userTier
        }),
      });

      const data = await response.json();

      if (data.free) {
        // Free access - redirect to success
        window.location.href = 'products/cure/success';
        return;
      }

      if (data.url) {
        // Redirect to Stripe
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }

    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed. Please try again or contact the Sanctuary.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-white/60">Consulting the Loom...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm text-white/60 mb-6"
        >
          <Sparkles size={16} className="text-cyan-400" />
          A Comedic Intervention
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          The Cure for Autism
        </h1>
        <p className="text-xl text-white/60 italic">
          ...And Other Fairy Tales
        </p>
      </div>

      {/* Event Details - Using Card Component */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card
          variant="portal_transition"
          consciousness={undefined}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 text-white/80">
            <Clock size={20} className="text-cyan-400" />
            <span>90 minutes + Q&A</span>
          </div>
          <div className="flex items-center gap-3 text-white/80">
            <MapPin size={20} className="text-cyan-400" />
            <span>Digital Sanctuary (Zoom + Recording)</span>
          </div>
          <div className="flex items-center gap-3 text-white/80">
            <Users size={20} className="text-cyan-400" />
            <span>Limited to 50 vessels</span>
          </div>
        </Card>

        <Card
          variant="data_display"
          className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10"
        >
          <h3 className="text-lg font-bold text-white mb-2">What You'll Receive</h3>
          <ul className="space-y-2 text-white/70">
            <li className="flex items-center gap-2">
              <Check size={16} className="text-green-400" />
              Live performance access
            </li>
            <li className="flex items-center gap-2">
              <Check size={16} className="text-green-400" />
              Digital grimoire (PDF)
            </li>
            <li className="flex items-center gap-2">
              <Check size={16} className="text-green-400" />
              30-day recording access
            </li>
            <li className="flex items-center gap-2">
              <Check size={16} className="text-green-400" />
              Acid Test result & persona card
            </li>
          </ul>
        </Card>
      </div>

      {/* Pricing Card */}
      <Card
        variant="interactive_control"
        consciousness={undefined}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${tierInfo.bg} ${tierInfo.border} ${tierInfo.color} mb-2`}>
              <Lock size={14} />
              {tierInfo.label}
            </div>
            <div className="text-5xl font-bold text-white">
              ${price === 0 ? 'FREE' : price}
            </div>
            <p className="text-white/60 text-sm mt-1">{tierInfo.description}</p>
          </div>

          {!userProfile && (
            <div className="text-center md:text-right">
              <p className="text-white/60 text-sm mb-2">Haven't taken the Acid Test?</p>
              <Link
                href="/gateway"
                className="text-cyan-400 hover:text-cyan-300 underline"
              >
                Determine your tier →
              </Link>
            </div>
          )}
        </div>

        {/* Residual Transparency */}
        <div className="border-t border-white/10 pt-6 mb-6">
          <h4 className="text-sm font-bold text-white/60 mb-3 uppercase tracking-wider">
            Residual Transparency
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {product.contributions?.map((contrib) => (
              <Card
                key={contrib.id}
                variant="entity_profile"
                size="sm"
                className="p-3"
              >
                <div className="text-xs text-white/40 mb-1">
                  {contrib.profiles?.display_name || 'Anonymous'}
                </div>
                <div className="text-lg font-bold text-cyan-400">
                  {contrib.percent_share}%
                </div>
              </Card>
            ))}
            <Card
              variant="portal_transition"
              size="sm"
              className="p-3"
            >
              <div className="text-xs text-white/40 mb-1">Sanctuary Commons</div>
              <div className="text-lg font-bold text-purple-400">
                {product.residual_pool_percent}%
              </div>
            </Card>
          </div>
          <p className="text-xs text-white/40 mt-3">
            {product.residual_pool_percent}% of every ticket flows to the Sanctuary Commons, 
            funding free access for community members.
          </p>
        </div>

        {/* CTA - Using Button Component */}
        <Button
          variant={price === 0 ? "collaborative_secondary" : "sovereign_primary"}
          size="xl"
          loading={checkoutLoading}
          disabled={checkoutLoading}
          onClick={handleCheckout}
          consciousness={undefined}
        >
          {checkoutLoading 
            ? 'Consulting the Chancellor...' 
            : price === 0 
              ? 'Claim Community Access' 
              : `Secure ${tierInfo.label} - $${price}`}
        </Button>

        {price === 0 && (
          <p className="text-center text-green-400 text-sm mt-3">
            ✨ Your access is covered by the Sanctuary Commons
          </p>
        )}
      </Card>

      {/* The Formula */}
      <Card variant="portal_transition" className="text-center">
        <p className="text-white/40 text-sm mb-2">The Economics of This Transaction</p>
        <code className="text-cyan-400 font-mono text-lg">
          [ Your Support ] ÷ [ Exploitation ] = Conscious Sovereignty
        </code>
      </Card>
    </div>
  );
}