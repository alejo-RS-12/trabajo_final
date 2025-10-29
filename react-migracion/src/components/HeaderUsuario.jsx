import { useState, useEffect } from "react";
import "../styles/usuario.css";

export default function HeaderUsuario({ profileImage, onLogin, onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Cerrar el menú del usuario si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".user-profile")) setShowDropdown(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header>
      <nav>
        {/* Logo */}
        <a href="/" className="logo">
          <img src="logo.png" alt="logo" />
        </a>

        {/* Botón hamburguesa */}
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>

        {/* Menú principal */}
        <ul className={`navbar ${menuOpen ? "show" : ""}`}>
          <li>
            <a href="/Formacion">Formación</a>
          </li>
          <li>
            <a href="/Trabajos">Trabajos</a>
          </li>
          <li>
            <a href="/Bienestar">Bienestar</a>
          </li>
          <li>
            <a href="/Nosotros">Nosotros</a>
          </li>
          <li>
            <a href="/Login">Ingresa</a>
          </li>
        </ul>

        {/* Perfil de usuario con menú desplegable */}
        <div className="user-profile">
          <img
            src={profileImage}
            alt="Usuario"
            className="user-icon-image"
            onClick={(e) => {
              e.stopPropagation();
              toggleDropdown();
            }}
          />

          {showDropdown && (
            <div className="user-dropdown-menu show">
              <ul>
                <li>
                  <button onClick={onLogin}>Mi Perfil</button>
                </li>
                <li>
                  <a href="/Configuracion">Configuración</a>
                </li>
                <li>
                  <button onClick={onLogout}>Cerrar Sesión</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
