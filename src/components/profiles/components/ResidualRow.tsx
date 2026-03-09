// components/profile-dashboard/components/ResidualRow.tsx
import { Residual } from '../ProfileDashboard';

interface ResidualRowProps {
  payment: Residual;
}

export default function ResidualRow({ payment }: ResidualRowProps) {
  return (
    <div className="p-4 border-b border-white/5 grid grid-cols-12 items-center hover:bg-white/5 transition-colors">
      <div className="col-span-4 text-white truncate">
        {payment.products?.title || 'Unknown Product'}
      </div>
      <div className="col-span-3 text-white/60 text-sm">
        {new Date(payment.created_at).toLocaleDateString()}
      </div>
      <div className="col-span-3 text-white/40 text-xs truncate" title={payment.calculation_note || ''}>
        {payment.calculation_note}
      </div>
      <div className={`col-span-2 text-right font-mono ${payment.status === 'paid' ? 'text-green-400' : 'text-yellow-400'}`}>
        ${payment.amount.toFixed(2)}
        <span className="block text-xs text-white/30 uppercase">{payment.status}</span>
      </div>
    </div>
  );
}