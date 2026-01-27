'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import TopBar from '@/components/dashboard/TopBar';
import DashboardFooter from '@/components/dashboard/DashboardFooter';
import { UserProvider } from '@/contexts/UserContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AdminAuthGuard>
      <UserProvider>
        <div className="flex h-screen bg-gray-50">
          <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Mobile Hamburger Menu */}
            <div className="lg:hidden fixed top-4 left-4 z-30">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
                aria-label="Open menu"
              >
                <Menu size={24} className="text-gray-700" />
              </button>
            </div>

            <TopBar />
            <main className="flex-1 overflow-y-auto">
              {children}
              <DashboardFooter />
            </main>
          </div>
        </div>
      </UserProvider>
    </AdminAuthGuard>
  );
}
