import { NextResponse } from "next/server";
import { getAuthToken, getUserData } from "@/lib/auth-cookies";

export async function GET() {
  try {
    const token = await getAuthToken();
    const userData = await getUserData();

    if (!token || !userData) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    return NextResponse.json({
      user: userData,
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
