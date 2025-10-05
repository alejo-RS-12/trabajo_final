import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [nombreDeUsuario, setNombreDeUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const exito = await login({ nombreDeUsuario, contrasena });
    if (!exito) {
      setError("Usuario o contraseña incorrectos");
    } else {
      navigate("/trabajos"); // redirige a la página de publicaciones
    }
  };

  return (
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "50vh",
    }}
  >
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Usuario"
        value={nombreDeUsuario}
        onChange={(e) => setNombreDeUsuario(e.target.value)}
      />
      <input
        placeholder="Contraseña"
        type="password"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
      />
      <button type="submit">Ingresar</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
    </div>
  );
}