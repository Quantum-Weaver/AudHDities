// src/components/admin/UserCard.tsx
'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface UserCardProps {
  user: {
    id: string;
    username: string;
    display_name: string | null;
    email: string;
    is_creator: boolean;
    is_vendor: boolean;
    is_admin: boolean;
    created_at: string;
    avatar_url?: string;
  };
}

export default function UserCard({ user }: UserCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-colors">
      {/* Summary view - always visible */}
      <div 
        className="p-4 cursor-pointer flex items-center justify-between"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
            {user.avatar_url ? (
              <img src={user.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="text-cyan-400 font-bold">
                {user.display_name?.[0] || user.username?.[0] || '?'}
              </span>
            )}
          </div>
          <div>
            <p className="font-medium text-white">
              {user.display_name || user.username}
            </p>
            <p className="text-sm text-white/40">@{user.username}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {user.is_creator && <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded">Creator</span>}
            {user.is_vendor && <span className="px-2 py-0.5 bg-pink-500/20 text-pink-400 text-xs rounded">Vendor</span>}
            {user.is_admin && <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs rounded">Admin</span>}
          </div>
          {expanded ? <ChevronUp size={18} className="text-white/40" /> : <ChevronDown size={18} className="text-white/40" />}
        </div>
      </div>

      {/* Expanded details - toggle visibility */}
      {expanded && (
        <div className="px-4 pb-4 pt-0 border-t border-white/10">
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <div>
              <p className="text-white/40">Email</p>
              <p className="text-white">{user.email}</p>
            </div>
            <div>
              <p className="text-white/40">Joined</p>
              <p className="text-white">{new Date(user.created_at).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-white/40">User ID</p>
              <p className="text-white text-xs font-mono">{user.id.slice(0, 8)}...</p>
            </div>
            <div className="flex items-end justify-end">
              <Link
                href={`/profile/${user.username || user.id}`}
                className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                View Full Profile <ExternalLink size={12} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}