import { type ReactNode } from 'react';
import { Navigation } from '../Navigation/Navigation';
import { FloatingElements } from '../FloatingElements/FloatingElements';

interface LayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
  showFloatingElements?: boolean;
}

export const Layout = ({ 
  children, 
  showNavigation = true, 
  showFloatingElements = true 
}: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {showFloatingElements && <FloatingElements count={8} />}
      {showNavigation && <Navigation />}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
};