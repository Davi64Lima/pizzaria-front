import { NextRequest, NextResponse } from "next/server";
import { setAuthCookies } from "@/lib/auth-cookies";
import { api } from "@/service/api";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    // Fazer login através da API backend
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const { access_token, refresh_token } = response.data;

    if (!access_token) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    // Decodificar o JWT para extrair informações do usuário
    const payload = JSON.parse(atob(access_token.split(".")[1]));
    const user = {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      phone: payload.phone,
    };

    // Salvar nos cookies HTTP-only
    await setAuthCookies(access_token, refresh_token, user);

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
      success: true,
    });
  } catch (error: unknown) {
    console.error("Erro no login:", error);

    const apiError = error as {
      response?: { data?: { message?: string }; status?: number };
    };
    const message =
      apiError?.response?.data?.message || "Erro interno do servidor";
    const status = apiError?.response?.status || 500;

    return NextResponse.json({ error: message }, { status });
  }
}
