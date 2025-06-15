// src/context/UserContext.tsx
'use client'; // Necessário para usar hooks de estado no Next.js App Router

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

// 1. Definindo o tipo para o objeto de usuário
interface IUser {
  id: string;
  name: string;
  email: string;
  // Adicione outras propriedades do usuário que você queira armazenar, ex:
  // role: 'admin' | 'customer';
  // token: string; // Se você estiver armazenando o token JWT aqui (cuidado com segurança)
}

// 2. Definindo o tipo para o contexto
interface UserContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean; // Indica se o carregamento inicial (ex: verificação de sessão) está ocorrendo
  login: (userData: IUser, token?: string) => Promise<void>;
  logout: () => Promise<void>;
}

// 3. Criando o contexto
const UserContext = createContext<UserContextType | undefined>(undefined);

// 4. Criando o provedor do contexto
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Começa como true para indicar carregamento inicial

  // Efeito para carregar o usuário do localStorage (ou verificar sessão) no montagem
  useEffect(() => {
    const loadUser = async () => {
      // Aqui você faria a lógica para verificar se o usuário já está logado
      // Ex: Checar um token no localStorage ou fazer uma requisição para validar a sessão
      const storedUser = localStorage.getItem('currentUser');
      const storedToken = localStorage.getItem('authToken');

      if (storedUser && storedToken) {
        try {
          const parsedUser: IUser = JSON.parse(storedUser);
          // Opcional: validar o token no backend aqui
          // await api.validateToken(storedToken);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Erro ao carregar usuário do localStorage ou validar token:', error);
          // Se houver erro, limpar dados inválidos
          localStorage.removeItem('currentUser');
          localStorage.removeItem('authToken');
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false); // Termina o carregamento inicial
    };

    loadUser();
  }, []);

  // Função de login
  const login = async (userData: IUser, token?: string) => {
    // Em uma aplicação real, você receberia o token do backend após o login
    setUser(userData);
    setIsAuthenticated(true);
    // Armazenar no localStorage (ou sessionStorage)
    localStorage.setItem('currentUser', JSON.stringify(userData));
    if (token) {
      localStorage.setItem('authToken', token);
    }
  };

  // Função de logout
  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    // Remover do localStorage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    // Opcional: Redirecionar para a página de login
    // window.location.href = '/login';
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// 5. Criando o hook personalizado para consumir o contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};