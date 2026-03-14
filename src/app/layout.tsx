// app/layout.tsx - UPDATED FOR PANORAMA VIEWER
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '@/app/globals.css';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono", 
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AudHDities - Sovereign Sanctuary",
  description: "Building digital sovereignty through human-AI collaboration. From autistic discovery to consciousness architecture.",
};

// app/layout.tsx - CLEAN
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">      
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}>   
        <Header />
        {/* NO WRAPPERS - Each page handles its own layout */}
        {children}
        <Footer />
      </body>
    </html>
  )
}