import { ReactNode } from 'react';
import { Navigation } from '../Navigation/Navigation';

interface LayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
}

export const Layout = ({ children, showNavigation = true }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {showNavigation && <Navigation />}
      <main className="relative">
        {children}
      </main>
    </div>
  );
};