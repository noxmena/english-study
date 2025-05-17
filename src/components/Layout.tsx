import * as React from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} English Study Platform by Mina Magde
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
