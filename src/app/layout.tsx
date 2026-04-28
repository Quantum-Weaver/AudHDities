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
import { Navigation } from '@/components/bifrost/Navigation';
import { LayoutChrome } from '@/components/bifrost/LayoutChrome';
import AuthButton from '@/components/asgard/auth/AuthButton';
import Footer from '@/components/bifrost/Footer';

export const metadata = {
  title: 'AudHDities — Sovereign Sanctuary',
  description: 'A place where you belong.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-x-hidden">
        
        <LayoutChrome>
          <div className='items-center justify-center flex-cols flex'>
            <AuthButton/>
            <Navigation/>
          </div>
          {children}                  
        </LayoutChrome>
        
      </body>
    </html>
  );
}