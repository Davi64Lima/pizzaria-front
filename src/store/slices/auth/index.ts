import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ESliceNames } from "../types";
import {
  IAuthState,
  ILoginRequest,
  IRegisterRequest,
  IAuthResponse,
  IUser,
} from "./types";
import { api } from "@service/api";
import {
  setAuthTokens,
  getAuthToken,
  getRefreshToken,
  clearAuthTokens,
} from "@utils/cookies";

// Tipo para erros da API
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

// Estado inicial
const initialState: IAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Thunks assíncronos
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: ILoginRequest, { rejectWithValue }) => {
    try {
      const response = await api.post<IAuthResponse>(
        "/auth/login",
        credentials
      );

      // Salvar tokens nos cookies
      setAuthTokens(response.data.access_token, response.data.refresh_token);

      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message =
        apiError?.response?.data?.message || "Erro ao fazer login";
      return rejectWithValue(message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: IRegisterRequest, { rejectWithValue }) => {
    try {
      const response = await api.post<IAuthResponse>(
        "/auth/register",
        userData
      );

      // Salvar tokens nos cookies
      setAuthTokens(response.data.access_token, response.data.refresh_token);

      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const message =
        apiError?.response?.data?.message || "Erro ao criar conta";
      return rejectWithValue(message);
    }
  }
);

export const loadUserFromToken = createAsyncThunk(
  "auth/loadFromToken",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue("Token não encontrado");
      }

      // Verificar se o token é válido fazendo uma request para o backend
      const response = await api.get<{ user: IUser }>("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return { user: response.data.user, access_token: token };
    } catch (error: unknown) {
      // Token inválido, remover dos cookies
      clearAuthTokens();
      const apiError = error as ApiError;
      const message = apiError?.response?.data?.message || "Token inválido";
      return rejectWithValue(message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const refreshTokenValue = getRefreshToken();
      if (!refreshTokenValue) {
        return rejectWithValue("Refresh token não encontrado");
      }

      const response = await api.post<{
        access_token: string;
        refresh_token?: string;
      }>("/auth/refresh", {
        refresh_token: refreshTokenValue,
      });

      setAuthTokens(response.data.access_token, response.data.refresh_token);

      return response.data.access_token;
    } catch (error: unknown) {
      clearAuthTokens();
      const apiError = error as ApiError;
      const message =
        apiError?.response?.data?.message || "Erro ao renovar token";
      return rejectWithValue(message);
    }
  }
);

// Slice
export const authSlice = createSlice({
  name: ESliceNames.AUTH,
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      // Remover tokens dos cookies
      clearAuthTokens();
    },
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Load user from token
    builder
      .addCase(loadUserFromToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadUserFromToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loadUserFromToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });

    // Refresh token
    builder
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError, setUser, setToken } = authSlice.actions;
export const authSliceActions = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
