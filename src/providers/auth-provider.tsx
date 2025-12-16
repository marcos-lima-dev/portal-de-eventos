"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Tipo do nosso Usuário Fake
interface User {
  name: string;
  email: string;
  avatar?: string;
}

// Tipo do Contexto
interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Simula o Login (SSO)
  const login = () => {
    // Aqui você poderia redirecionar para o Google, etc.
    // Como é simulado, setamos o usuário direto.
    setUser({
      name: "Administrador Rio",
      email: "admin@rio.rj.gov.br",
      avatar: "https://github.com/shadcn.png" // Imagem fake
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar o contexto facilmente
export const useAuth = () => useContext(AuthContext);