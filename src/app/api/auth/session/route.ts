import { NextResponse } from "next/server";
import { getAuthToken } from "@/lib/auth-cookies";
import { api } from "@service/api";

export async function GET() {
  try {
    const token = await getAuthToken();

    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const payload = JSON.parse(atob(token.split(".")[1]));

    if (!payload || payload.exp * 1000 < Date.now()) {
      await api.post("/auth/logout");
      return NextResponse.json({ error: "Token expirado" }, { status: 401 });
    }

    const user = {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      phone: payload.phone,
    };

    return NextResponse.json({
      user: user,
      isAuthenticated: true,
    });
  } catch (error) {
    console.error("Erro ao verificar sessão:", error);

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
