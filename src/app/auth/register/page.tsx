// src/app/register/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Button } from '@components/ui/button';
import { Loader2 } from 'lucide-react'; // Importar ícone de loading

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Limpa erros anteriores
    setSuccess(null); // Limpa mensagens de sucesso anteriores

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      setIsLoading(false);
      return;
    }

    // Em um projeto real, você faria uma chamada para o seu backend aqui
    // Ex: const response = await fetch('/api/register', { method: 'POST', body: JSON.stringify({ name, email, password }) });
    // const data = await response.json();

    try {
      // Simula uma requisição assíncrona
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulação de resposta da API
      const isRegisteredSuccessfully = Math.random() > 0.3; // 70% de chance de sucesso

      if (isRegisteredSuccessfully) {
        setSuccess('Cadastro realizado com sucesso! Você já pode fazer login.');
        // Limpar os campos do formulário
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        // Poderia redirecionar para a página de login
        // router.push('/login');
      } else {
        setError('Falha no registro. Este e-mail já pode estar em uso ou outro erro ocorreu.');
      }
    } catch (err) {
      setError('Ocorreu um erro ao tentar registrar. Tente novamente.');
      console.error('Erro de registro:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">Criar Conta</CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Preencha seus dados para criar uma nova conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirmar Senha</Label>
              <Input
                id="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
            {success && <p className="text-green-600 text-sm mt-2 text-center">{success}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registrando...
                </>
              ) : (
                'Criar Conta'
              )}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link href="/auth/login" className="underline text-blue-600 hover:text-blue-700">
              Entrar
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}