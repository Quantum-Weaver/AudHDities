// components/profile-dashboard/tabs/ResidualsTab.tsx
import { Residual } from '../ProfileDashboard';
import ResidualRow from '../components/ResidualRow';

interface ResidualsTabProps {
  residuals: Residual[];
  total: number;
}

export default function ResidualsTab({ residuals, total }: ResidualsTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl p-6">
        <div>
          <h3 className="text-lg font-bold text-white">Lifetime Earnings</h3>
          <p className="text-white/50 text-sm">From all Sanctuary products</p>
        </div>
        <div className="text-4xl font-bold text-green-400">${total.toFixed(2)}</div>
      </div>

      <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10 grid grid-cols-12 text-sm text-white/50 font-medium">
          <div className="col-span-4">Product</div>
          <div className="col-span-3">Date</div>
          <div className="col-span-3">Calculation</div>
          <div className="col-span-2 text-right">Amount</div>
        </div>
        
        <div className="max-h-[500px] overflow-y-auto">
          {residuals.length === 0 ? (
            <div className="p-12 text-center text-white/40">
              <p>No residual payments yet.</p>
              <p className="text-sm mt-2">When products you contributed to sell, payments appear here.</p>
            </div>
          ) : (
            residuals.map((payment) => (
              <ResidualRow key={payment.id} payment={payment} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}