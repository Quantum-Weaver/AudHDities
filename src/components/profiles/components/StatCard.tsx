// components/profile-dashboard/components/StatCard.tsx
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color: string;
}

export default function StatCard({ icon: Icon, label, value, color }: StatCardProps) {
  return (
    <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl p-6 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center ${color}`}>
        <Icon size={24} />
      </div>
      <div>
        <div className="text-white/50 text-sm mb-1">{label}</div>
        <div className={`text-2xl font-bold text-white`}>{value}</div>
      </div>
    </div>
  );
}