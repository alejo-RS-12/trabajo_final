import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import "../assets/css/UserMenu.css";

export default function UserMenu({ open, setOpen }) {
  const ref = useRef(null);
  const { logout } = useAuth();

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpen]);

  return (
    <div className="um-container" ref={ref}>
      <img
        src="imagenes/icono-user.png"
        alt="usuario"
        className="um-icon"
        onClick={() => setOpen(!open)}
      />

      {open && (
        <ul className="um-menu">
          <li>
            <a href="/admin">Administrador</a>
          </li>
          <li>
            <a href="/mensajes">Mensajes</a>
          </li>
          <li>
            <a href="/favoritos">Favoritos</a>
          </li>
          <li>
            <a href="/configuracion-de-usuario">Configuración</a>
          </li>

          {/*CERRAR SESIÓN*/}
          <li onClick={logout} style={{ cursor: "pointer" }}>
            Salir
          </li>
        </ul>
      )}
    </div>
  );
}
