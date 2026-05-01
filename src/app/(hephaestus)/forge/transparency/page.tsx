// src/app/(hephaestus)/transparency/page.tsx
import { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase/server';
import { DollarSign, TrendingUp, Users, CheckCircle, AlertCircle, Eye, Shield, Heart, HandCoins } from 'lucide-react';
import Link from 'next/link';
import { Page } from '@/components/bifrost/Page';
import { Card } from '@/components/runes/Card';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';

export const metadata: Metadata = {
  title: 'Transparency | AUDHDITIES',
  description: 'See exactly how money flows through the sanctuary',
};

// ─── Constants ─────────────────────────────────────────────────────────────

const PLATFORM_FEE_PERCENT = 10;
const CREATOR_SHARE_PERCENT = 90;

// ─── Helpers ───────────────────────────────────────────────────────────────

const formatDate = (dateString: string | null) => {
  if (!dateString) return 'Unknown date';
  try {
    return new Date(dateString).toLocaleDateString();
  } catch {
    return 'Invalid date';
  }
};

const formatCurrency = (amount: number | null | undefined) => {
  if (amount === null || amount === undefined) return '$0.00';
  return `$${amount.toFixed(2)}`;
};

// ─── Card Data Builders ────────────────────────────────────────────────────

function statCardData(id: string, title: string): CardData {
  return { id, type: 'stat', title, value: '' };
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default async function TransparencyPage() {
  const supabase = await createServerSupabase();

  const { data: publicLedger } = await supabase
    .from('public_transparency')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  const { data: adminLogs } = await supabase
    .from('admin_logs')
    .select('*')
    .not('public_note', 'is', null)
    .order('created_at', { ascending: false })
    .limit(10);

  const { data: totals } = await supabase
    .from('sales')
    .select('gross_amount, platform_fee_cents, creator_earnings_cents');

  const totalRevenue = totals?.reduce((sum, sale) => sum + (sale.gross_amount || 0), 0) || 0;
  const totalFees = totals?.reduce((sum, sale) => sum + ((sale.platform_fee_cents || 0) / 100), 0) || 0;
  const totalCreatorEarnings = totals?.reduce((sum, sale) => sum + ((sale.creator_earnings_cents || 0) / 100), 0) || 0;

  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen py-12 px-6">
        <div className="container max-w-6xl mx-auto">

          {/* ════════════════════════════════════════════════════════════ */}
          {/* Hero                                                         */}
          {/* ════════════════════════════════════════════════════════════ */}
          <section className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-star-dust/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-star-dust/20">
              <Eye size={14} className="text-neurospark" />
              <span className="text-sm text-star-dust/80">Radical Transparency</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-star-dust mb-6">
              Every Dollar, Visible
            </h1>
            <p className="text-xl text-star-dust/70 max-w-2xl mx-auto">
              Platform fee fixed at{' '}
              <span className="text-neurospark font-bold">{PLATFORM_FEE_PERCENT}%</span>
              {' '}(industry standard is 30-50%).{' '}
              <span className="text-quantum-purple font-bold">{CREATOR_SHARE_PERCENT}%</span>
              {' '}goes to creators and community.
            </p>
          </section>

          {/* ════════════════════════════════════════════════════════════ */}
          {/* Stats                                                        */}
          {/* ════════════════════════════════════════════════════════════ */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card
              data={statCardData('total-revenue', 'Lifetime Gross Sales')}
              variant="interactive"
              radius="lg"
              shadow="md"
              className="p-6 text-center hover:border-neurospark/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-neurospark/20 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="text-neurospark" size={24} />
              </div>
              <div className="text-3xl font-bold text-star-dust mb-1">
                {formatCurrency(totalRevenue)}
              </div>
              <div className="text-sm text-star-dust/40">Lifetime Gross Sales</div>
            </Card>

            <Card
              data={statCardData('platform-fees', 'Platform Fees')}
              variant="interactive"
              radius="lg"
              shadow="md"
              className="p-6 text-center hover:border-quantum-purple/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-quantum-purple/20 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-quantum-purple" size={24} />
              </div>
              <div className="text-3xl font-bold text-star-dust mb-1">
                {formatCurrency(totalFees)}
              </div>
              <div className="text-sm text-star-dust/40">Platform Fees ({PLATFORM_FEE_PERCENT}% of sales)</div>
            </Card>

            <Card
              data={statCardData('creator-earnings', 'Paid to Creators')}
              variant="interactive"
              radius="lg"
              shadow="md"
              className="p-6 text-center hover:border-fire-base/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-fire-base/20 flex items-center justify-center mx-auto mb-4">
                <Users className="text-fire-base" size={24} />
              </div>
              <div className="text-3xl font-bold text-star-dust mb-1">
                {formatCurrency(totalCreatorEarnings)}
              </div>
              <div className="text-sm text-star-dust/40">Paid to Creators ({CREATOR_SHARE_PERCENT}% of sales)</div>
            </Card>
          </div>

          {/* ════════════════════════════════════════════════════════════ */}
          {/* Public Ledger                                                */}
          {/* ════════════════════════════════════════════════════════════ */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-neurospark rounded-full" />
                <h2 className="text-2xl font-bold text-star-dust">Recent Transactions</h2>
              </div>
              <span className="text-xs text-star-dust/40 bg-star-dust/5 px-3 py-1 rounded-full">
                Public Ledger
              </span>
            </div>

            <Card
              data={statCardData('ledger', 'Public Ledger')}
              variant="default"
              radius="lg"
              shadow="sm"
              className="overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-star-dust/5 border-b border-star-dust/10">
                    <tr>
                      <th className="text-left p-4 text-star-dust/60 text-sm font-medium">Product</th>
                      <th className="text-left p-4 text-star-dust/60 text-sm font-medium">Amount</th>
                      <th className="text-left p-4 text-star-dust/60 text-sm font-medium">To Creator ({CREATOR_SHARE_PERCENT}%)</th>
                      <th className="text-left p-4 text-star-dust/60 text-sm font-medium">Platform Fee ({PLATFORM_FEE_PERCENT}%)</th>
                      <th className="text-left p-4 text-star-dust/60 text-sm font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {publicLedger && publicLedger.length > 0 ? (
                      publicLedger.map((sale: any) => {
                        const grossAmount = sale.gross_amount || 0;
                        const toCreator = grossAmount * (CREATOR_SHARE_PERCENT / 100);
                        const toPlatform = grossAmount * (PLATFORM_FEE_PERCENT / 100);
                        return (
                          <tr key={sale.sale_id} className="border-b border-star-dust/5 hover:bg-star-dust/5 transition-colors">
                            <td className="p-4 text-star-dust font-medium">{sale.product || 'Unknown Product'}</td>
                            <td className="p-4 text-star-dust font-mono">{formatCurrency(grossAmount)}</td>
                            <td className="p-4 text-sanctuary-green font-mono">{formatCurrency(toCreator)}</td>
                            <td className="p-4 text-neurospark font-mono">{formatCurrency(toPlatform)}</td>
                            <td className="p-4 text-star-dust/40 text-sm">{formatDate(sale.created_at)}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-12 text-center text-star-dust/40">
                          <div className="flex flex-col items-center gap-2">
                            <Eye size={32} className="text-star-dust/20" />
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

          {/* ════════════════════════════════════════════════════════════ */}
          {/* Governance Actions                                           */}
          {/* ════════════════════════════════════════════════════════════ */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-quantum-purple rounded-full" />
                <h2 className="text-2xl font-bold text-star-dust">Governance Actions</h2>
              </div>
              <span className="text-xs text-star-dust/40 bg-star-dust/5 px-3 py-1 rounded-full">
                Admin Log
              </span>
            </div>

            <div className="space-y-3">
              {adminLogs && adminLogs.length > 0 ? (
                adminLogs.map((log: any) => (
                  <Card
                    key={log.id}
                    data={statCardData(log.id, 'Admin Action')}
                    variant="default"
                    radius="md"
                    shadow="sm"
                    className="p-4 flex items-start gap-4 hover:bg-star-dust/5 transition-colors"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {log.action?.includes('verify') ? (
                        <CheckCircle size={18} className="text-sanctuary-green" />
                      ) : log.action?.includes('reject') ? (
                        <AlertCircle size={18} className="text-error" />
                      ) : (
                        <Shield size={18} className="text-neurospark" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-star-dust">{log.public_note}</p>
                      <p className="text-xs text-star-dust/40 mt-1">
                        {formatDate(log.created_at)} at {log.created_at ? new Date(log.created_at).toLocaleTimeString() : ''}
                      </p>
                    </div>
                  </Card>
                ))
              ) : (
                <Card
                  data={statCardData('no-admin-logs', 'No Actions')}
                  variant="default"
                  radius="lg"
                  shadow="sm"
                  className="p-12 text-center"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Shield size={32} className="text-star-dust/20" />
                    <p className="text-star-dust/40">No public admin actions yet.</p>
                    <p className="text-xs text-star-dust/30">All governance actions will appear here.</p>
                  </div>
                </Card>
              )}
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════ */}
          {/* How Value Flows                                              */}
          {/* ════════════════════════════════════════════════════════════ */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 bg-fire-base rounded-full" />
              <h2 className="text-2xl font-bold text-star-dust">How Value Flows</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card
                data={statCardData('platform-fee-detail', 'Platform Fee')}
                variant="default"
                radius="lg"
                shadow="sm"
                className="p-6 border-l-4 border-l-neurospark"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-neurospark/20 flex items-center justify-center">
                    <TrendingUp size={20} className="text-neurospark" />
                  </div>
                  <h3 className="text-xl font-bold text-star-dust">
                    Platform Fee <span className="text-neurospark">({PLATFORM_FEE_PERCENT}%)</span>
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-star-dust/70">
                    <span className="w-2 h-2 bg-neurospark rounded-full" />
                    <span>Operations (hosting, tools, development) <span className="text-star-dust/40 text-sm">(5-7%)</span></span>
                  </li>
                  <li className="flex items-center gap-3 text-star-dust/70">
                    <span className="w-2 h-2 bg-neurospark rounded-full" />
                    <span>Residual Pool <span className="text-star-dust/40 text-sm">(0-50% of fee, creator sets per product)</span></span>
                  </li>
                  <li className="flex items-center gap-3 text-star-dust/70">
                    <span className="w-2 h-2 bg-neurospark rounded-full" />
                    <span>Community reserve <span className="text-star-dust/40 text-sm">(remainder)</span></span>
                  </li>
                </ul>
              </Card>

              <Card
                data={statCardData('creator-share-detail', 'Creator Share')}
                variant="default"
                radius="lg"
                shadow="sm"
                className="p-6 border-l-4 border-l-quantum-purple"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-quantum-purple/20 flex items-center justify-center">
                    <Users size={20} className="text-quantum-purple" />
                  </div>
                  <h3 className="text-xl font-bold text-star-dust">
                    Creator Share <span className="text-quantum-purple">({CREATOR_SHARE_PERCENT}%)</span>
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-star-dust/70">
                    <span className="w-2 h-2 bg-quantum-purple rounded-full" />
                    <span>Immediate payment to creator <span className="text-star-dust/40 text-sm">(50-100%, after covenant)</span></span>
                  </li>
                  <li className="flex items-center gap-3 text-star-dust/70">
                    <span className="w-2 h-2 bg-sanctuary-green rounded-full" />
                    <span>Covenant Pool <span className="text-star-dust/40 text-sm">(0-50% of earnings, creator sets in profile)</span></span>
                  </li>
                  <li className="flex items-center gap-3 text-star-dust/70">
                    <span className="w-2 h-2 bg-fire-base rounded-full" />
                    <span>→ Distributed equally to all active community members</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Residual Pool */}
            <Card
              data={statCardData('residual-pool', 'Residual Pool')}
              variant="default"
              radius="lg"
              shadow="sm"
              className="mt-6 p-6 border-l-4 border-l-fire-base bg-gradient-to-r from-fire-base/5 to-transparent"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-fire-base/20 flex items-center justify-center">
                  <Heart size={20} className="text-fire-base" />
                </div>
                <h3 className="text-xl font-bold text-star-dust">The Residual Pool</h3>
              </div>
              <p className="text-star-dust/70 mb-3">
                Creators can set aside{' '}
                <span className="text-fire-base">0-50% of the platform fee</span>
                {' '}to reward contributors who helped create the product.
              </p>
              <ul className="space-y-2 text-star-dust/60 text-sm">
                <li>• Contributors earn forever from every sale</li>
                <li>• Percentages are set at product creation</li>
                <li>• Fully transparent — every payout is recorded</li>
              </ul>
            </Card>

            {/* Covenant Pool */}
            <Card
              data={statCardData('covenant-pool', 'Covenant Pool')}
              variant="default"
              radius="lg"
              shadow="sm"
              className="mt-6 p-6 border-l-4 border-l-sanctuary-green bg-gradient-to-r from-sanctuary-green/5 to-transparent"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-sanctuary-green/20 flex items-center justify-center">
                  <HandCoins size={20} className="text-sanctuary-green" />
                </div>
                <h3 className="text-xl font-bold text-star-dust">The Covenant Pool</h3>
              </div>
              <p className="text-star-dust/70 mb-3">
                Creators can voluntarily pledge{' '}
                <span className="text-sanctuary-green">0-50% of their earnings</span>
                {' '}to the community dignity fund.
              </p>
              <ul className="space-y-2 text-star-dust/60 text-sm">
                <li>• Distributed equally to all active community members</li>
                <li>• Includes disabled members regardless of activity</li>
                <li>• Pledge is visible on creator profile (if public)</li>
                <li>• Can be changed at any time</li>
              </ul>
            </Card>

            {/* Footer badge */}
            <div className="mt-8 text-center">
              <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 bg-star-dust/5 rounded-full">
                <Shield size={14} className="text-neurospark" />
                <span className="text-xs text-star-dust/40">Platform fee fixed at {PLATFORM_FEE_PERCENT}%</span>
                <span className="text-star-dust/30">•</span>
                <span className="text-xs text-star-dust/40">All splits are public and verifiable</span>
                <span className="text-star-dust/30">•</span>
                <span className="text-xs text-star-dust/40">The code is open source</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </Page>
  );
}