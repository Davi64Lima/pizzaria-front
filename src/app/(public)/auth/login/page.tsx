"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Button } from "@components/ui/button";
import { Loader2 } from "lucide-react";
import { api } from "@service/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Limpa erros anteriores

    console.log(email, password);

    try {
      const response = await api.post(`/auth/login`, {
        email,
        password,
      });

      // Armazenar token no localStorage ao invés de cookies no client
      localStorage.setItem("token", response.data.access_token);
      console.log("Login realizado com sucesso");

      // Redirecionar para dashboard ou página inicial
      window.location.href = "/";
    } catch (err) {
      setError("Ocorreu um erro ao tentar fazer login. Tente novamente.");
      console.error("Erro de login:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">
            Entrar
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Acesse sua conta para gerenciar seus pedidos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@exemplo.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline text-blue-600 hover:text-blue-700"
                >
                  Esqueceu sua senha?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600">
            Não tem uma conta?{" "}
            <Link
              href="/auth/register"
              className="underline text-blue-600 hover:text-blue-700"
            >
              Registrar-se
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
