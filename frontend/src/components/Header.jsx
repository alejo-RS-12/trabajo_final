import { useState } from "react";


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <nav>
          <a href="/" className="logo"> <img src="imagenes/logo.png" alt="logo" /> </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}> ☰ </button>

        <ul className={`navbar ${menuOpen ? "show" : ""}`}>
          <li><a href="/formacion">Formación</a></li>
          <li><a href="/trabajos">Trabajos</a></li>
          <li><a href="/bienestar">Bienestar</a></li>
          <li><a href="/nosotros">Nosotros</a></li>
          <li><a href="/login">Ingresa</a></li>
        </ul>
          <a href="usuario.html" className="user-icon"><img src="imagenes/icono-user.png" alt="Usuario" className="user-icon-image"/></a>
      </nav>
    </header>
  );
}
