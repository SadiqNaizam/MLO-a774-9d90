import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header
      className={cn(
        'sticky top-0 z-50',
        'flex flex-col items-center justify-center',
        'py-6',
        'bg-card', // As per layout requirements 'bg-surface', mapped to 'bg-card'
        'shadow-md',
        className
      )}
    >
      <h1 className="text-2xl text-center sm:text-3xl font-bold text-primary">
        AI Quotient (AIQ) Assessment
      </h1>
      <p className="text-sm text-center sm:text-base text-muted-foreground mt-1">
        Screening AI-Friendly Talent
      </p>
    </header>
  );
};

export default Header;
