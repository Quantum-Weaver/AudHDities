'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { 
  Home, 
  User, 
  Compass, 
  Gem, 
  LogOut,
  Sparkles
} from 'lucide-react';
import { useSupabase } from '@/utils/supabase/client';

const NAV_ITEMS = [
  { href: '/sanctuary', label: 'Sanctuary', icon: Home },
  { href: '/loom', label: 'Loom', icon: Compass },
  { href: '/profile', label: 'Vessel', icon: User },
];

export default function SanctuaryNav() {
  const pathname = usePathname();
  const { user } = useUser();
  const supabase = useSupabase();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:top-0 md:bottom-auto md:left-0 md:w-64 md:h-screen bg-black/80 backdrop-blur-xl border-t md:border-t-0 md:border-r border-white/10 z-50">
      <div className="flex md:flex-col items-center md:items-start justify-around md:justify-start p-4 md:p-6 h-full">
        {/* Logo */}
        <Link href="/sanctuary" className="hidden md:flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
            <Gem size={20} className="text-white" />
          </div>
          <span className="text-white font-bold text-lg">Sanctuary</span>
        </Link>

        {/* Nav Items */}
        <div className="flex md:flex-col gap-2 w-full">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${isActive 
                    ? 'bg-white/10 text-white' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
              >
                <Icon size={20} />
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* User & Logout */}
        <div className="hidden md:flex flex-col mt-auto w-full gap-2">
          {user && (
            <div className="px-4 py-2 text-white/60 text-sm">
              <div className="font-medium text-white">{user.display_name || user.username}</div>
              <div className="capitalize text-xs">{user.user_tier} tier</div>
            </div>
          )}
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span>Exit Sanctuary</span>
          </button>
        </div>
      </div>
    </nav>
  );
}