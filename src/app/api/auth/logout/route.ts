import { NextResponse } from "next/server";
import { clearAuthCookies } from "@/lib/auth-cookies";

export async function POST() {
  try {
    // Limpar todos os cookies de autenticação
    await clearAuthCookies();

    return NextResponse.json({
      success: true,
      message: "Logout realizado com sucesso",
    });
  } catch (error) {
    console.error("Erro no logout:", error);

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
