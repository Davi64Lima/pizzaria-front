"use client";

import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { UserRole } from "@/store/slices/auth/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  requiredRole,
  redirectTo = "/auth/login",
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth
  );
  const router = useRouter();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    // Aguarda o carregamento inicial terminar
    if (!isLoading) {
      setHasCheckedAuth(true);

      // Se não está autenticado, redireciona para login
      if (!isAuthenticated || !user) {
        router.push(redirectTo);
        return;
      }

      // Se requer uma role específica e o usuário não tem essa role
      if (requiredRole && user.role !== requiredRole) {
        router.push("/"); // Redireciona para home se não tem permissão
        return;
      }
    }
  }, [user, isAuthenticated, isLoading, requiredRole, router, redirectTo]);

  // Mostra loading enquanto verifica autenticação OU ainda não verificou
  if (isLoading || !hasCheckedAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Se não está autenticado ou não tem permissão, não renderiza
  if (
    !isAuthenticated ||
    !user ||
    (requiredRole && user.role !== requiredRole)
  ) {
    return null;
  }

  return <>{children}</>;
}
