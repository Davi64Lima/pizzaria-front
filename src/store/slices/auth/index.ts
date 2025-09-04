import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ESliceNames } from "../types";
import { IAuthState, ILoginRequest, IRegisterRequest } from "./types";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: ILoginRequest, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (!response.ok)
        return rejectWithValue(data.error || "Erro ao fazer login");
      return { user: data.user, access_token: "stored-in-httponly-cookie" };
    } catch {
      return rejectWithValue("Erro ao fazer login");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: IRegisterRequest, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok)
        return rejectWithValue(data.error || "Erro ao registrar usuário");
      return { user: data.user, access_token: "stored-in-httponly-cookie" };
    } catch {
      return rejectWithValue("Erro ao registrar usuário");
    }
  }
);

export const loadUserFromSession = createAsyncThunk(
  "auth/loadFromSession",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/auth/session", {
        credentials: "include",
      });
      if (!response.ok) {
        return rejectWithValue("Nenhuma sessão ativa");
      }
      const data = await response.json();
      return { user: data.user, access_token: "stored-in-httponly-cookie" };
    } catch {
      return rejectWithValue("Erro ao carregar sessão");
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
  return true;
});

const initialState: IAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: ESliceNames.AUTH,
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
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
      })
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
      })
      .addCase(loadUserFromSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadUserFromSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loadUserFromSession.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
        state.isLoading = false;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
export default authSlice.reducer;
