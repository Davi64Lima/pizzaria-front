"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { useAppDispatch } from "@hooks/redux/useAppDispatch";
import { useAppSelector } from "@hooks/redux/useAppSelector";
import { registerUser, clearError } from "@store/slices/auth";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  // Limpar erro quando componente for desmontado
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    // Validações locais
    if (!name || !email || !password) {
      setLocalError("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("As senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      setLocalError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    const result = await dispatch(
      registerUser({
        name,
        email,
        password,
        phone: phone || undefined,
      })
    );

    if (registerUser.fulfilled.match(result)) {
      // Registro bem-sucedido, redirecionar
      router.push("/");
    }
    // Se houver erro, será exibido automaticamente pelo estado do Redux
  };

  const displayError = localError || error;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">
            Criar Conta
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Cadastre-se para começar a fazer seus pedidos.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Nome */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Nome completo *
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Digite seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full"
                disabled={isLoading}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                E-mail *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
                disabled={isLoading}
              />
            </div>

            {/* Telefone */}
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700"
              >
                Telefone
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(00) 00000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full"
                disabled={isLoading}
              />
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Senha *
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha (mín. 6 caracteres)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
                disabled={isLoading}
                minLength={6}
              />
            </div>

            {/* Confirmar Senha */}
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700"
              >
                Confirmar senha *
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full"
                disabled={isLoading}
              />
            </div>

            {/* Exibir erro */}
            {displayError && (
              <div className="text-sm text-red-600 text-center bg-red-50 p-3 rounded">
                {displayError}
              </div>
            )}

            {/* Botão de Registro */}
            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando conta...
                </>
              ) : (
                "Criar Conta"
              )}
            </Button>
          </form>

          {/* Link para Login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{" "}
              <Link
                href="/auth/login"
                className="text-red-600 font-medium hover:underline"
              >
                Faça login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
