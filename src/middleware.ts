import { NextRequest, NextResponse } from "next/server";
import { getAuthToken } from "@/lib/auth-cookies";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rotas que requerem autenticação
  const protectedRoutes = ["/dashboard", "/orders", "/admin"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Rotas de autenticação (não devem ser acessadas se já logado)
  const authRoutes = ["/auth/login", "/auth/register"];
  const isAuthRoute = authRoutes.includes(pathname);

  try {
    const token = await getAuthToken();
    const isAuthenticated = !!token;

    // Se está tentando acessar rota protegida sem estar autenticado
    if (isProtectedRoute && !isAuthenticated) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Se está autenticado e tentando acessar página de auth
    if (isAuthRoute && isAuthenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Erro no middleware de auth:", error);

    // Em caso de erro, redirecionar para login se for rota protegida
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
