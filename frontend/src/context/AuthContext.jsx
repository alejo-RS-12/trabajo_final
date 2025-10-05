import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 🔹 Cargamos usuario desde localStorage al iniciar
  const [usuario, setUsuario] = useState(() => {
    const saved = localStorage.getItem("usuario");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async ({ nombreDeUsuario, contrasena }) => {
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombreDeUsuario, contrasena }),
      });

      if (!res.ok) return false;

      const usuarioData = await res.json();

      // 🔹 Guardamos en estado + localStorage
      setUsuario(usuarioData);
      localStorage.setItem("usuario", JSON.stringify(usuarioData));

      return true;
    } catch (err) {
      console.error("Error en login:", err);
      return false;
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario"); // 🔹 Limpia storage
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

