// src/components/docs/ProtectedRoutesTable.tsx
'use client';

import { Shield, Lock } from 'lucide-react';

const protectedRoutes = [
  { path: '/dashboard/*', description: 'Main dashboard and user overview' },
  { path: '/profile/*', description: 'Profile viewing and editing' },
  { path: '/checkout/*', description: 'Payment and checkout flows' },
  { path: '/creator/*', description: 'Creator dashboard and tools' },
  { path: '/vendor/*', description: 'Vendor dashboard and tools' },
  { path: '/admin/*', description: 'Admin panel (requires admin role)' },
];

export function ProtectedRoutesTable() {
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <div className="bg-white/5 px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Shield className="text-neurospark" size={16} />
          <span className="text-star-dust font-medium">Protected Routes</span>
        </div>
      </div>
      <div className="divide-y divide-white/5">
        {protectedRoutes.map((route) => (
          <div key={route.path} className="px-4 py-3 flex items-start gap-3">
            <Lock size={14} className="text-star-dust/40 mt-1 flex-shrink-0" />
            <div>
              <code className="text-neurospark text-sm bg-cyan-400/10 px-2 py-0.5 rounded">
                {route.path}
              </code>
              <p className="text-star-dust/60 text-sm mt-1">{route.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}