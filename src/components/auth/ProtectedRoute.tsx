"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@hooks/redux/useAppSelector";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  requireAuth = true,
  requireAdmin = false,
  redirectTo = "/auth/login",
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // Se ainda está carregando, não fazer nada
    if (isLoading) return;

    // Se precisa de autenticação e não está autenticado
    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    // Se precisa ser admin e não é admin
    if (requireAdmin && user?.role !== "ADMIN") {
      router.push("/"); // Redirecionar para home se não for admin
      return;
    }

    // Se está autenticado e está tentando acessar páginas de auth, redirecionar
    if (
      isAuthenticated &&
      (window.location.pathname.includes("/auth/login") ||
        window.location.pathname.includes("/auth/register"))
    ) {
      router.push("/");
      return;
    }
  }, [
    isAuthenticated,
    user,
    isLoading,
    requireAuth,
    requireAdmin,
    router,
    redirectTo,
  ]);

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // Se precisa de auth e não está autenticado, não renderizar nada
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  // Se precisa ser admin e não é admin, não renderizar nada
  if (requireAdmin && user?.role !== "ADMIN") {
    return null;
  }

  return <>{children}</>;
}
