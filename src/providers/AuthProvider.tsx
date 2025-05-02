import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import UserService from "../services/UserService";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const HTTP_AUTH_HEADER = "authorization";
const TOKEN_KEY_IN_LOCAL_STORAGE = "token";

interface IUser {
  name: string;
}

interface IAuthContextType {
  user: IUser | null;
  loading: boolean;
  login: (name: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Try to load a user from local storage (a previously saved token)
   */
  const tryLoadUserFromLocalStorage = () => {
    const storedToken = localStorage.getItem(TOKEN_KEY_IN_LOCAL_STORAGE);
    
    if (storedToken) {
      logInUserFromToken(storedToken, false);
    }

    setLoading(false);
  };

  /**
   * Log in the user based on their token
   * @param token A JWT token received from API
   * @param saveToken Whether to save the provided token to local storage for persistent logins
   */
  const logInUserFromToken = (token: string, saveToken: boolean) => {
    // Get the user from token payload
    const user = jwtDecode(token!) as IUser;
    setUser(user);
    console.log(user);

    // Save the token to local storage for persistance ("keep me logged in"), for now always true
    if (saveToken) localStorage.setItem("token", token);

    // Include the token in axios headers
    axios.defaults.headers[HTTP_AUTH_HEADER] = `Bearer ${token}`;
  }

  /**
   * Tries to get an API token and sets axios headers and the user to context
   */
  const login = async (name: string, password: string, rememberMe: boolean = true): Promise<void> => {
    // Get the token from API
    const token = await UserService.getToken(name, password);

    if (!token) throw "Unable to receive token from API";

    logInUserFromToken(token, rememberMe);
  };

  /**
   * Removes all user imprints from the session
   */
  const logout = (): void => {
    // Remove the user from auth context
    setUser(null);

    // Remove the user form local storage
    localStorage.removeItem(TOKEN_KEY_IN_LOCAL_STORAGE);

    // Remove the auth header from axios
    axios.defaults.headers[HTTP_AUTH_HEADER] = null;
  };

  // On start, try to load user from local storage
  useEffect(tryLoadUserFromLocalStorage, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext) as IAuthContextType;
}
