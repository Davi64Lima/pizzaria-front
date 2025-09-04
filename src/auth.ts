import NextAuth from "@auth/nextjs";
import Credentials from "@auth/nextjs/providers/credentials";
import { api } from "@service/api";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await api.post("/auth/login", {
            email: credentials.email,
            password: credentials.password,
          });

          const { user, access_token, refresh_token } = response.data;

          if (user && access_token) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
              accessToken: access_token,
              refreshToken: refresh_token,
            };
          }
        } catch (error) {
          console.error("Erro de autenticação:", error);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Salvar dados do usuário no token JWT na primeira vez
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Enviar propriedades para o cliente
      if (session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
      }
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 dias
  },
  pages: {
    signIn: "/auth/login",
  },
});
