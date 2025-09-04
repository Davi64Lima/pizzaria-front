"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@hooks/redux/useAppDispatch";
import { loadUserFromSession } from "@store/slices/auth";
import { setupAuthInterceptors } from "@midlewares/auth";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Configurar interceptadores do axios
    setupAuthInterceptors();

    // Carregar usuário da sessão se existir
    dispatch(loadUserFromSession());
  }, [dispatch]);

  return <>{children}</>;
}
