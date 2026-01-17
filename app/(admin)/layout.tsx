'use client';

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
  return (
    <AdminAuthGuard>
      <UserProvider>
        <div className="flex h-screen bg-gray-50">
          <AdminSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
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
