// components/profile-dashboard/ProfileNavigation.tsx
import { Eye, RadioIcon, Wallet, Target, Settings, Package } from 'lucide-react';

const tabs = [
  { id: 'overview', label: 'Vessel Status', icon: Eye },
  { id: 'channels', label: 'My Emergence', icon: RadioIcon },
  { id: 'products', label: 'My Products', icon: Package }, 
  { id: 'residuals', label: 'Residual Ledger', icon: Wallet },
  { id: 'quests', label: 'Quest Log', icon: Target },
  { id: 'settings', label: 'Sanctum Settings', icon: Settings },
];

// Update the onTabChange type
interface ProfileNavigationProps {
  activeTab: string;
  onTabChange: (tab: 'overview' | 'channels' | 'products' | 'residuals' | 'quests' | 'settings') => void;
}


export default function ProfileNavigation({ activeTab, onTabChange }: ProfileNavigationProps) {
  return (
    <nav className="flex gap-2 mb-8 overflow-x-auto pb-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg whitespace-nowrap transition-all
              ${activeTab === tab.id 
                ? 'bg-white/20 text-white border border-white/20' 
                : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <Icon size={18} />
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}