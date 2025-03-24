import { createContext, useContext, useState, ReactNode } from "react";

interface IAuthContextType {
  user: string | null;
  login: (name: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  const login = (username: string) => setUser(username);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext) as IAuthContextType;
}
