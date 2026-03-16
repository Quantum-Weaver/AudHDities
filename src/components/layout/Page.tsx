// @/components/Page.tsx - ULTRA SIMPLE VERSION

import React from 'react';

interface PageProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const Page: React.FC<PageProps> = ({ 
  children, 
  title, 
  className = '' 
}) => {
  return (
    <div className="relative z-10 text-center min-h-screen">
      <div className="page-content px-6 pb-20">
        <section className="page-title-section mb-8 pt-20 px-6">
        {children}
        </section>
      </div>
    </div>
  );
};

export default Page;
