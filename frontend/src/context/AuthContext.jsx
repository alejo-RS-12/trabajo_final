import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // 🧩 Estado del usuario (cargado desde localStorage si existe)
  const [usuario, setUsuario] = useState(() => {
    try {
      const saved = localStorage.getItem("usuario");
      if (!saved || saved === "undefined" || saved === "null") return null;
      return JSON.parse(saved);
    } catch (error) {
      console.error("Error al leer usuario desde localStorage:", error);
      return null;
    }
  });
  // 🔐 LOGIN
  const login = async ({ nombreDeUsuario, contrasena }) => {
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombreDeUsuario, contrasena }),
      });

      const data = await res.json();

      // ❌ Error de autenticación
      if (!res.ok) {
        alert(data.message || "Usuario o contraseña incorrectos");
        return false;
      }

      // ⚠️ Si el usuario no tiene rol asignado
      if (data.needsRoleSelection) {
        localStorage.setItem("userId", data.userId);
        navigate("/botones-rol"); // 👈 Redirige directo sin alert
        return true;
      }

      // ✅ Si el usuario ya tiene rol
      setUsuario(data.user);
      localStorage.setItem("usuario", JSON.stringify(data.user));
      navigate("/"); // 👈 Va al home directamente
      return true;

    } catch (err) {
      console.error("Error en login:", err);
      alert("Ocurrió un error al iniciar sesión.");
      return false;
    }
  };


  // 🚪 LOGOUT
  const logout = () => {
    try {
      setUsuario(null);
      localStorage.removeItem("usuario");
      localStorage.removeItem("userId"); // por si estaba en selección de rol
      navigate("/login");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ usuario, setUsuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🎯 Hook para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext);
