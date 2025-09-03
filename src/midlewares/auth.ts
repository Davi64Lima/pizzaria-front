import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { api } from "@service/api";
import { store } from "@store";
import { refreshToken, logout } from "@store/slices/auth";

// Interceptador para adicionar token automaticamente
export const setupAuthInterceptors = () => {
  // Request interceptor - adiciona token em todas as requests
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const state = store.getState();
      const token = state.auth.token || localStorage.getItem("token");

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor - lida com erros de autenticação
  api.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      // Se erro 401 (Unauthorized) e não é uma retry
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Tentar renovar o token
          const result = await store.dispatch(refreshToken());

          if (refreshToken.fulfilled.match(result)) {
            // Token renovado com sucesso, repetir a request original
            const newToken = result.payload;
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }

            return api(originalRequest);
          } else {
            // Falha ao renovar token, fazer logout
            store.dispatch(logout());

            // Redirecionar para login se não estiver já lá
            if (
              typeof window !== "undefined" &&
              !window.location.pathname.includes("/auth/login")
            ) {
              window.location.href = "/auth/login";
            }
          }
        } catch {
          // Erro ao renovar token, fazer logout
          store.dispatch(logout());

          if (
            typeof window !== "undefined" &&
            !window.location.pathname.includes("/auth/login")
          ) {
            window.location.href = "/auth/login";
          }
        }
      }

      return Promise.reject(error);
    }
  );
};

// Hook para verificar se o usuário está autenticado
export const isAuthenticated = (): boolean => {
  const state = store.getState();
  return state.auth.isAuthenticated;
};

// Hook para verificar se o usuário é admin
export const isAdmin = (): boolean => {
  const state = store.getState();
  return state.auth.user?.role === "ADMIN";
};

// Hook para obter o usuário atual
export const getCurrentUser = () => {
  const state = store.getState();
  return state.auth.user;
};

// Hook para obter o token atual
export const getCurrentToken = (): string | null => {
  const state = store.getState();
  return state.auth.token || localStorage.getItem("token");
};
