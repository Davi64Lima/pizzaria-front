"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@hooks/redux/useAppDispatch";
import { setupAuthInterceptors } from "@midlewares/auth";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Configurar interceptadores do axios
    setupAuthInterceptors();

    // Verificar se há uma sessão ativa via cookie
    const checkSession = async () => {
      try {
        const response = await fetch("/api/auth/session", {
          credentials: "include",
        });
        if (response.ok) {
          // A sessão será gerenciada pelo middleware e server actions
          // Não precisamos mais carregar do localStorage
        }
      } catch {
        console.log("Nenhuma sessão ativa");
      }
    };

    checkSession();
  }, [dispatch]);

  return <>{children}</>;
}
