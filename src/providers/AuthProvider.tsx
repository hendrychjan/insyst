import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import UserService from "../services/UserService";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface IUser {
  name: string;
  isAdmin: boolean;
  token?: string;
}

interface IAuthContextType {
  user: IUser | null;
  login: (name: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /**
   * Tries to get an API token and sets axios headers and the user to context
   */
  const login = async (name: string, password: string) => {
    // Get the API token
    const token = await UserService.getToken(name, password);

    if (!token) throw "Invalid token received from API";

    // Save the user to auth context
    const user = jwtDecode(token!) as IUser;
    user.token = token;
    setUser(user);

    // Save user to local storage
    localStorage.setItem("user", JSON.stringify(user));

    // Save the user to axios headers
    axios.defaults.headers["x-auth-token"] = token;
  };

  /**
   * Removes all user imprints from the session
   */
  const logout = () => {
    // Remove the user from auth context
    setUser(null);

    // Remove the user form local storage
    localStorage.removeItem("user");

    // Remove the auth header from axios
    axios.defaults.headers["x-auth-token"] = null;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext) as IAuthContextType;
}
