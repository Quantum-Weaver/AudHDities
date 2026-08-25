// src/components/forge/ProtectedRoutesTable.tsx
'use client';

import { Shield, Lock } from 'lucide-react';

// 2026-08-24, the truth pass — this table listed /dashboard/*, /profile/*,
// /checkout/*, /creator/*, /vendor/* and /admin/*. Of those six, only
// /dashboard exists, and only as a legacy redirect stub to /vessel; the
// other five have no page anywhere under src/app. Generic boilerplate that
// never met the deity-named routes it was shipped beside. Below are the
// routes that actually change with sign-in state today, read from the files
// that do the changing. Recount from those files before editing this list.
const protectedRoutes = [
  {
    path: '/reset-password',
    description:
      'AuthGuard requires a live recovery session. Without one it returns you to /login and says the link has been spent — no one transitions unaccompanied.',
  },
  {
    path: '/login · /signup · /forgot-password',
    description:
      'AuthGuard, inverted: a vessel already signed in on arrival is sent to /vessel rather than shown the door twice.',
  },
  {
    path: '/council/applications/creator · /council/applications/vendor',
    description:
      'The form renders only for a signed-in vessel; a visitor is asked to sign in first, and is turned away from nothing else.',
  },
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