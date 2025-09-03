"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@hooks/redux/useAppDispatch";
import { loadUserFromToken } from "@store/slices/auth";
import { setupAuthInterceptors } from "@midlewares/auth";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Configurar interceptadores do axios
    setupAuthInterceptors();

    // Tentar carregar usuário do token salvo
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loadUserFromToken());
    }
  }, [dispatch]);

  return <>{children}</>;
}
