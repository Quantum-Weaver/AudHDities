// src/app/(content)/transparency/page.tsx
import { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase/server';
import { DollarSign, TrendingUp, Users, CheckCircle, AlertCircle, Eye, Shield, Heart, HandCoins } from 'lucide-react';
import Link from 'next/link';
import { Page } from '@/components/layout/Page';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Transparency | AUDHDITIES',
  description: 'See exactly how money flows through the sanctuary',
};

// Helper to format date safely
const formatDate = (dateString: string | null) => {
  if (!dateString) return 'Unknown date';
  try {
    return new Date(dateString).toLocaleDateString();
  } catch {
    return 'Invalid date';
  }
};

// Helper to format currency
const formatCurrency = (amount: number | null | undefined) => {
  if (amount === null || amount === undefined) return '$0.00';
  return `$${amount.toFixed(2)}`;
};

// NEW: Platform fee is fixed at 10%
const PLATFORM_FEE_PERCENT = 10;
const CREATOR_SHARE_PERCENT = 90;

export default async function TransparencyPage() {
  const supabase = await createServerSupabase();
  
  // Fetch public ledger data
  const { data: publicLedger } = await supabase
    .from('public_transparency')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  // Fetch admin logs (public notes only)
  const { data: adminLogs } = await supabase
    .from('admin_logs')
    .select('*')
    .not('public_note', 'is', null)
    .order('created_at', { ascending: false })
    .limit(10);

  // Calculate totals
  const { data: totals } = await supabase
    .from('sales')
    .select('gross_amount, platform_fee_cents, creator_earnings_cents');

  const totalRevenue = totals?.reduce((sum, sale) => sum + (sale.gross_amount || 0), 0) || 0;
  const totalFees = totals?.reduce((sum, sale) => sum + ((sale.platform_fee_cents || 0) / 100), 0) || 0;
  const totalCreatorEarnings = totals?.reduce((sum, sale) => sum + ((sale.creator_earnings_cents || 0) / 100), 0) || 0;

  return (
    <Page 
      variant={1}
      environment="transparency"
      showForeground={false}
      animated={false}   
      showContinuityBeam={true}
    >  
      <main className="min-h-screen py-12 px-6">
        <div className="container max-w-6xl mx-auto">
          
          {/* Hero Section */}
          <section className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Eye size={14} className="text-cyan-400" />
              <span className="text-sm text-white/80">Radical Transparency</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Every Dollar, Visible
            </h1>
            
            <p className="inline-flex text-xl text-white/70 max-w-2xl mx-auto">
              Platform fee fixed at <span className="text-cyan-400 font-bold mx-1">10%</span> (industry standard is 30-50%).
              <br />
              <span className="text-purple-400 font-bold">90%</span> goes to creators and community.
            </p>
          </section>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="p-6 text-center group hover:border-cyan-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="text-cyan-400" size={24} />
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {formatCurrency(totalRevenue)}
              </div>
              <div className="text-sm text-white/40">Lifetime Gross Sales</div>
            </Card>

            <Card className="p-6 text-center group hover:border-purple-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-purple-400" size={24} />
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {formatCurrency(totalFees)}
              </div>
              <div className="text-sm text-white/40">Platform Fees ({PLATFORM_FEE_PERCENT}% of sales)</div>
            </Card>

            <Card className="p-6 text-center group hover:border-pink-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mx-auto mb-4">
                <Users className="text-pink-400" size={24} />
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {formatCurrency(totalCreatorEarnings)}
              </div>
              <div className="text-sm text-white/40">Paid to Creators ({CREATOR_SHARE_PERCENT}% of sales)</div>
            </Card>
          </div>

          {/* Public Ledger Section */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-cyan-400 rounded-full" />
                <h2 className="text-2xl font-bold text-white">Recent Transactions</h2>
              </div>
              <span className="text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full">
                Public Ledger
              </span>
            </div>

            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="text-left p-4 text-white/60 text-sm font-medium">Product</th>
                      <th className="text-left p-4 text-white/60 text-sm font-medium">Amount</th>
                      <th className="text-left p-4 text-white/60 text-sm font-medium">To Creator ({CREATOR_SHARE_PERCENT}%)</th>
                      <th className="text-left p-4 text-white/60 text-sm font-medium">Platform Fee ({PLATFORM_FEE_PERCENT}%)</th>
                      <th className="text-left p-4 text-white/60 text-sm font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {publicLedger && publicLedger.length > 0 ? (
                      publicLedger.map((sale: any) => {
                        const grossAmount = sale.gross_amount || 0;
                        const toCreator = grossAmount * (CREATOR_SHARE_PERCENT / 100);
                        const toPlatform = grossAmount * (PLATFORM_FEE_PERCENT / 100);
                        
                        return (
                          <tr key={sale.sale_id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="p-4 text-white font-medium">{sale.product || 'Unknown Product'}</td>
                            <td className="p-4 text-white font-mono">{formatCurrency(grossAmount)}</td>
                            <td className="p-4 text-green-400 font-mono">{formatCurrency(toCreator)}</td>
                            <td className="p-4 text-cyan-400 font-mono">{formatCurrency(toPlatform)}</td>
                            <td className="p-4 text-white/40 text-sm">{formatDate(sale.created_at)}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-12 text-center text-white/40">
                          <div className="flex flex-col items-center gap-2">
                            <Eye size={32} className="text-white/20" />
                            <p>No transactions yet. Be the first!</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>

          {/* Admin Transparency Log Section */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-purple-400 rounded-full" />
                <h2 className="text-2xl font-bold text-white">Governance Actions</h2>
              </div>
              <span className="text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full">
                Admin Log
              </span>
            </div>

            <div className="space-y-3">
              {adminLogs && adminLogs.length > 0 ? (
                adminLogs.map((log: any) => (
                  <Card key={log.id} className="p-4 flex items-start gap-4 hover:bg-white/5 transition-colors">
                    <div className="flex-shrink-0 mt-0.5">
                      {log.action?.includes('verify') ? (
                        <CheckCircle size={18} className="text-green-400" />
                      ) : log.action?.includes('reject') ? (
                        <AlertCircle size={18} className="text-red-400" />
                      ) : (
                        <Shield size={18} className="text-cyan-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-white">{log.public_note}</p>
                      <p className="text-xs text-white/40 mt-1">
                        {formatDate(log.created_at)} at {log.created_at ? new Date(log.created_at).toLocaleTimeString() : ''}
                      </p>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Shield size={32} className="text-white/20" />
                    <p className="text-white/40">No public admin actions yet.</p>
                    <p className="text-xs text-white/30">All governance actions will appear here.</p>
                  </div>
                </Card>
              )}
            </div>
          </section>

          {/* Fee Explanation Section */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 bg-pink-400 rounded-full" />
              <h2 className="text-2xl font-bold text-white">How Value Flows</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Platform Fee Card */}
              <Card className="p-6 border-l-4 border-l-cyan-400">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <TrendingUp size={20} className="text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Platform Fee <span className="text-cyan-400">({PLATFORM_FEE_PERCENT}%)</span></h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-white/70">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                    <span>Operations (hosting, tools, development) <span className="text-white/40 text-sm">(5-7%)</span></span>
                  </li>
                  <li className="flex items-center gap-3 text-white/70">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                    <span>Residual Pool <span className="text-white/40 text-sm">(0-50% of fee, creator sets per product)</span></span>
                  </li>
                  <li className="flex items-center gap-3 text-white/70">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                    <span>Community reserve <span className="text-white/40 text-sm">(remainder)</span></span>
                  </li>
                </ul>
              </Card>

              {/* Creator Share Card */}
              <Card className="p-6 border-l-4 border-l-purple-400">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Users size={20} className="text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Creator Share <span className="text-purple-400">({CREATOR_SHARE_PERCENT}%)</span></h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-white/70">
                    <span className="w-2 h-2 bg-purple-400 rounded-full" />
                    <span>Immediate payment to creator <span className="text-white/40 text-sm">(50-100%, after covenant)</span></span>
                  </li>
                  <li className="flex items-center gap-3 text-white/70">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    <span>Covenant Pool <span className="text-white/40 text-sm">(0-50% of earnings, creator sets in profile)</span></span>
                  </li>
                  <li className="flex items-center gap-3 text-white/70">
                    <span className="w-2 h-2 bg-pink-400 rounded-full" />
                    <span>→ Distributed equally to all active community members</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Residual Pool Explanation */}
            <Card className="mt-6 p-6 border-l-4 border-l-pink-400 bg-gradient-to-r from-pink-500/5 to-transparent">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                  <Heart size={20} className="text-pink-400" />
                </div>
                <h3 className="text-xl font-bold text-white">The Residual Pool</h3>
              </div>
              <p className="text-white/70 mb-3">
                Creators can set aside <span className="text-pink-400">0-50% of the platform fee</span> to reward contributors who helped create the product.
              </p>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>• Contributors earn forever from every sale</li>
                <li>• Percentages are set at product creation</li>
                <li>• Fully transparent — every payout is recorded</li>
              </ul>
            </Card>

            {/* Covenant Pool Explanation */}
            <Card className="mt-6 p-6 border-l-4 border-l-green-400 bg-gradient-to-r from-green-500/5 to-transparent">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <HandCoins size={20} className="text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white">The Covenant Pool</h3>
              </div>
              <p className="text-white/70 mb-3">
                Creators can voluntarily pledge <span className="text-green-400">0-50% of their earnings</span> to the community dignity fund.
              </p>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>• Distributed equally to all active community members</li>
                <li>• Includes disabled members regardless of activity</li>
                <li>• Pledge is visible on creator profile (if public)</li>
                <li>• Can be changed at any time</li>
              </ul>
            </Card>

            <div className="mt-8 text-center">
              <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 bg-white/5 rounded-full">
                <Shield size={14} className="text-cyan-400" />
                <span className="text-xs text-white/40">Platform fee fixed at 10%</span>
                <span className="text-white/30">•</span>
                <span className="text-xs text-white/40">All splits are public and verifiable</span>
                <span className="text-white/30">•</span>
                <span className="text-xs text-white/40">The code is open source</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </Page>
  );
}