"use client";

import { AdminSidebar } from "@/components/AdminSidebar";
import { ProtectedRoute } from "@/hooks/useProtectedRoute";
import { UserRole } from "@/store/slices/auth/types";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <ProtectedRoute requiredRole={UserRole.ADMIN} redirectTo="/auth/login">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6 bg-gray-50 min-h-screen">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
