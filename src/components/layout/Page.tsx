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
    <div className={`min-h-screen p-4 ${className}`}>
      {title && (
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
      )}
      {children}
    </div>
  );
};

export default Page;
