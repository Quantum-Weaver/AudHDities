// app/layout.tsx
import { ReactNode } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import '@/app/globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">      
        <AppShell>
          {children}
        </AppShell>      
    </html>
  );
}