import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Check for user session on page load
  useEffect(() => {
    // You can replace this with a real authentication check (cookie, session, etc.)
    const storedUser = JSON.parse(sessionStorage.getItem("token"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      setUser(null);
    }
  }, []);

  const login = (token) => {
    setUser(token);
    sessionStorage.setItem("token", token);
    router.push("/dashbord");
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("token");
    router.push("/login"); // redirect to login
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
