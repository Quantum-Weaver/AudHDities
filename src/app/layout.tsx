// src/app/layout.tsx
import { ReactNode } from 'react';
import '@/app/globals.css';

import '@/styles/generated/variables.css';
import '@/styles/generated/domains.css';
import '@/styles/generated/text_effects.css';
import '@/styles/generated/animations.css';
import '@/styles/generated/typography.css';
import '@/styles/generated/zoom.css';
import '@/styles/generated/parallax.css';
import '@/styles/custom_overrides.css';

import { LayoutChrome } from '@/components/bifrost/LayoutChrome';

export const metadata = {
  title: 'AudHDities — Sovereign Sanctuary',
  description: 'A place where you belong.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-x-hidden">

          {children}

      </body>
    </html>
  );
}