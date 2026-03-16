import { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase/server';
import { DollarSign, TrendingUp, Users, Award, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Transparency | AUDHDITIES',
  description: 'See exactly how money flows through the sanctuary',
};

export default async function TransparencyPage() {
  const supabase = await createServerSupabase();
  
  // Fetch public ledger data
  const { data: publicLedger } = await supabase
    .from('public_ledger')
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
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Every dollar that moves through the sanctuary is visible. No hidden fees. No dark patterns. Just truth.
          </h3>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white/60 text-sm">Total Revenue</h3>
              <DollarSign className="text-cyan-400" size={20} />
            </div>
            <p className="text-3xl font-bold text-white">${totalRevenue.toFixed(2)}</p>
            <p className="text-xs text-white/40 mt-2">Lifetime gross sales</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white/60 text-sm">Platform Fees</h3>
              <TrendingUp className="text-purple-400" size={20} />
            </div>
            <p className="text-3xl font-bold text-white">${totalFees.toFixed(2)}</p>
            <p className="text-xs text-white/40 mt-2">Funds sanctuary operations</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white/60 text-sm">Creator Earnings</h3>
              <Users className="text-pink-400" size={20} />
            </div>
            <p className="text-3xl font-bold text-white">${totalCreatorEarnings.toFixed(2)}</p>
            <p className="text-xs text-white/40 mt-2">Paid to creators & contributors</p>
          </div>
        </div>

        {/* Public Ledger */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Transactions</h2>
            <span className="text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full">
              Public Ledger
            </span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="text-left p-4 text-white/60 text-sm font-medium">Product</th>
                  <th className="text-left p-4 text-white/60 text-sm font-medium">Amount</th>
                  <th className="text-left p-4 text-white/60 text-sm font-medium">To Creators</th>
                  <th className="text-left p-4 text-white/60 text-sm font-medium">To Platform</th>
                  <th className="text-left p-4 text-white/60 text-sm font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {publicLedger && publicLedger.length > 0 ? (
                  publicLedger.map((sale: any) => (
                    <tr key={sale.sale_id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="p-4 text-white">{sale.product}</td>
                      <td className="p-4 text-white">${sale.gross_amount?.toFixed(2)}</td>
                      <td className="p-4 text-green-400">${(sale.gross_amount - (sale.gross_amount * 0.3)).toFixed(2)}</td>
                      <td className="p-4 text-cyan-400">${(sale.gross_amount * 0.3).toFixed(2)}</td>
                      <td className="p-4 text-white/40 text-sm">
                        {new Date(sale.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-white/40">
                      No transactions yet. Be the first!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Admin Transparency Log */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Governance Actions</h2>
            <span className="text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full">
              Admin Log
            </span>
          </div>

          <div className="space-y-4">
            {adminLogs && adminLogs.length > 0 ? (
              adminLogs.map((log: any) => (
                <div key={log.id} className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {log.action.includes('verify') ? (
                      <CheckCircle className="text-green-400" size={18} />
                    ) : (
                      <AlertCircle className="text-yellow-400" size={18} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-white">{log.public_note}</p>
                    <p className="text-xs text-white/40 mt-1">
                      {new Date(log.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center text-white/40">
                No public admin actions yet.
              </div>
            )}
          </div>
        </section>

        {/* Fee Explanation */}
        <section className="bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 border border-white/10 rounded-xl p-8">
          <h2 className="text-xl font-bold text-white mb-4">How Fees Work</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-cyan-400 font-medium mb-2">Platform Fee (30%)</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  <span>Hosting and infrastructure (10%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  <span>Development and maintenance (10%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  <span>Community fund and grants (10%)</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-purple-400 font-medium mb-2">Creator Share (70%)</h3>
              <ul className="space-y-2 text-white/60 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Immediate payment to creator (35-50%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Residual pool for contributors (20-35%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Split percentages set by creator</span>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-white/40 mt-6">
            * All splits are public and verifiable. The code is open source.
          </p>
        </section>
      </div>
    </main>
  );
}
