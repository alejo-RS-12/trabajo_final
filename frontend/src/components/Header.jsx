import { useState, useEffect, useRef } from "react";
import "../assets/css/Header.css";
import NavMenu from "./NavMenu";
import UserMenu from "./UserMenu";

export default function Header() {
  // Estados para ambos menús
  const [navOpen, setNavOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const headerRef = useRef(null);

  // 👇 Detecta clic fuera y cierra ambos
  useEffect(() => {
    function handleClickOutside(e) {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setNavOpen(false); //cierra hamburguesa
        setUserOpen(false); // cierra menú usuario
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Abrir/Cerrar hamburguesa
  const handleToggleNav = () => {
    setNavOpen(!navOpen);
    setUserOpen(false); // cerrar user menu si estaba abierto
  };

  // Abrir/Cerrar user menu (y cerrar nav)
  const handleSetUserOpen = (value) => {
    setUserOpen(value);
    if (value) setNavOpen(false); //cerrar nav si se abre user
  };

  return (
    <header className="hd-header" ref={headerRef}>
      <nav className="hd-nav">
        <a href="/" className="hd-logo">
          <img src="imagenes/logo.png" alt="logo" />
        </a>

        <button className="hd-menu-btn" onClick={handleToggleNav}>
          ☰
        </button>

        <NavMenu open={navOpen} />

        <UserMenu open={userOpen} setOpen={handleSetUserOpen} />
      </nav>
    </header>
  );
}
