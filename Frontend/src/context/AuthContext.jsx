import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const login = (token) => {
    try {

      localStorage.setItem("token", token);

      const decodedToken = jwtDecode(token);

      setUser({
        userId: decodedToken.userId,
        name: decodedToken.name,
        role: decodedToken.role,
      });

    } catch (error) {

      console.error("Invalid token:", error);

      localStorage.removeItem("token");
      setUser(null);

    }
  };


  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {

      try {

        const decodedToken = jwtDecode(token);

        setUser({
          userId: decodedToken.userId,
          name: decodedToken.name,
          role: decodedToken.role,
        });

      } catch (error) {

        console.error("Invalid token:", error);

        localStorage.removeItem("token");
        setUser(null);

      }

    }

  }, []);


  const logout = () => {

    localStorage.removeItem("token");

    setUser(null);

  };


  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

}


// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}