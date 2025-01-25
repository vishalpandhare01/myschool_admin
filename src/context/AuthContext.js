import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isClient, setIsClient] = useState(false); // Add a client-side check
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // We now know we are on the client side
  }, []);

  useEffect(() => {
    if (isClient) {
      // Only run this effect on the client side
      try {
        const storedUser = sessionStorage.getItem("token");
        if (storedUser) {
          setUser(storedUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error loading user data from sessionStorage:", error);
      }
    }
  }, [isClient]);

  const login = (token) => {
    try {
      setUser(token);
      sessionStorage.setItem("token", token); // Store token as a string
      location.replace("/dashboard");
    } catch (error) {
      console.log("errror in login: ", error);
    }
  };

  const logout = () => {
    try {
      setUser(null);
      sessionStorage.removeItem("token");
      location.replace("/login")
    } catch (error) {}
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
