import React, { createContext, useContext, useEffect, useState } from 'react';

interface Utente {
  id: number;
  email: string;
  ruolo: string;
  studio_id: number;
}

interface AuthContextType {
  utente: Utente | null;
  isAuthenticated: boolean;
  login: (token: string, utente: Utente) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [utente, setUtente] = useState<Utente | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('utente');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUtente(JSON.parse(storedUser));
    }
  }, []);

  const login = (token: string, utente: Utente) => {
    setToken(token);
    setUtente(utente);
    localStorage.setItem('token', token);
    localStorage.setItem('utente', JSON.stringify(utente));
  };

  const logout = () => {
    setToken(null);
    setUtente(null);
    localStorage.removeItem('token');
    localStorage.removeItem('utente');
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ utente, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve essere usato dentro AuthProvider');
  return context;
};
