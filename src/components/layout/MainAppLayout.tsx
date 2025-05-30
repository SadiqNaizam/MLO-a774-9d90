import React from 'react';
import { cn } from '@/lib/utils';
import Header from './Header';

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 grid-rows-[auto_1fr]', // Overall grid structure: Header (auto), Main (1fr)
        'h-screen', // Full viewport height
        'bg-background', // Background for the entire layout
        className
      )}
    >
      <Header />
      <main
        className={cn(
          'overflow-y-auto', // Ensure main content area is scrollable if it overflows
          'flex flex-col gap-6', // Layout for direct children of main: vertical stack with gaps
          'px-6', // Horizontal padding for main content area
          'mt-16', // Top margin for main content area, as per layout requirements
          'pb-6' // Added bottom padding for consistent spacing and better scroll experience
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default MainAppLayout;
