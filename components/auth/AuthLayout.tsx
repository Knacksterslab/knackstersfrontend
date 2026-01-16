'use client';

import Link from 'next/link';
import Logo from '../ui/logo';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-gray-200 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center px-4 py-12 sm:py-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 text-center">
        <p className="text-sm text-gray-500">
          © 2026 Knacksters. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
