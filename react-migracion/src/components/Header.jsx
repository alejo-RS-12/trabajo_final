import { useState } from "react";
import "../styles/header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Cierra el menú al hacer clic en un link
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header>
      <nav className={menuOpen ? "menu-open" : ""}>
        {/* Logo */}
        <a href="/" className="logo">
          <img src="/imagenes/logo.png" alt="logo" />
        </a>

        {/* Botón hamburguesa */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        {/* Navbar */}
        <ul className={`navbar ${menuOpen ? "show" : ""}`}>
          <li>
            <a href="/formacion" onClick={handleLinkClick}>
              Formación
            </a>
          </li>
          <li>
            <a href="/trabajos" onClick={handleLinkClick}>
              Trabajos
            </a>
          </li>
          <li>
            <a href="/bienestar" onClick={handleLinkClick}>
              Bienestar
            </a>
          </li>
          <li>
            <a href="/nosotros" onClick={handleLinkClick}>
              Nosotros
            </a>
          </li>
          <li>
            <a href="/login" onClick={handleLinkClick}>
              Ingresa
            </a>
          </li>
        </ul>

        {/* Icono usuario */}
        <a href="/usuario" className="user-icon">
          <img
            src="/imagenes/icono-user.png"
            alt="Usuario"
            className="user-icon-image"
          />
        </a>
      </nav>

      {/* Overlay detrás del menú */}
      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)} />
      )}
    </header>
  );
}
