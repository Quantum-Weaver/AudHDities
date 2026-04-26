// src/app/layout.tsx
// Root layout — pure server component
// HTML shell only. Pages wrap themselves in AppShell/Page as needed.

import { ReactNode } from 'react';
import '@/app/globals.css';

export const metadata = {
  title: 'AudHDities — Sovereign Sanctuary',
  description: 'A place where you belong. For neurodivergent creators, contributors, and community.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}