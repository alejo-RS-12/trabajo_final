import { useState } from "react";


export default function RegisterLogin() {
 

    const [isRegister, setIsRegister] = useState(false); // alterna entre login y registro
  
    // Estados de los formularios
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
  
    // Estados de validación
    const [errors, setErrors] = useState({});
  
    // 🔎 Validaciones
    const validar = () => {
      const newErrors = {};
  
      if (isRegister && (nombre.trim().length < 3)) {
        newErrors.nombre = "El nombre es obligatorio y debe tener al menos 3 caracteres.";
      }
  
      const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!regex.test(email)) {
        newErrors.email = "Correo inválido (ejemplo: nombre@ropo.com).";
      }
  
      if (isRegister && (usuario.length < 4 || usuario.length > 20)) {
        newErrors.usuario = "El usuario debe tener entre 4 y 20 caracteres.";
      }
  
      if (password.length < 6) {
        newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    // 🚀 SUBMIT
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validar()) return;
  
      const datos = isRegister
        ? { nombre, email, username: usuario, password }
        : { email, password };
  
      try {
        const res = await fetch(
          `http://localhost:3000/auth/${isRegister ? "register" : "login"}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos),
          }
        );
  
        const data = await res.json();
  
        if (res.ok) {
          if (isRegister) {
            alert("✅ Registro exitoso, ahora inicia sesión");
            setIsRegister(false); // cambiar a login
          } else {
            alert("✅ Login correcto");
            localStorage.setItem("token", data.access_token);
            window.location.href = "/dashboard"; // ⚡ en React Router sería navigate("/dashboard")
          }
        } else {
          alert("❌ " + data.message);
        }
      } catch (err) {
        console.error("Error:", err);
        alert("Error al conectar con el servidor");
      }
    };
  
    return (
     <div className="all-register">
      <div className={`container ${isRegister ? "right-panel-active" : ""}`} id="container">
        {/* Registro */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSubmit}>
            <h1>Registrarse</h1>
            <input
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            {errors.nombre && <small className="error-text">{errors.nombre}</small>}
  
            <input
              type="email"
              placeholder="ejemplo@ropo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <small className="error-text">{errors.email}</small>}
  
            <input
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            {errors.usuario && <small className="error-text">{errors.usuario}</small>}
  
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <small className="error-text">{errors.password}</small>}
  
            <button type="submit">Registrarse</button>
          </form>
        </div>
  
        {/* Login */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit}>
            <h1>Iniciar Sesión</h1>
            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Iniciar Sesión</button>
          </form>
        </div>
  
        {/* Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>¿Ya tienes cuenta?</h1>
              <p>Inicia sesión</p>
              <button className="ghost" onClick={() => setIsRegister(false)}>Iniciar Sesión</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>¡Hola!</h1>
              <p>Ingresa tus datos para registrarte</p>
              <button className="ghost" onClick={() => setIsRegister(true)}>Registrarse</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
