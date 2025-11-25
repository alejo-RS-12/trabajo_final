import { useEffect, useRef } from "react";
import "../assets/css/UserMenu.css";

export default function UserMenu({ open, setOpen }) {
  const ref = useRef(null);

  // 👇 Cerrar solo el user menu al hacer click fuera de él
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false); //esto nO toca el hamburguesa
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
        onClick={() => setOpen(!open)} // llama a handleSetUserOpen del Header
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
          <li>
            <a href="/logout">Salir</a>
          </li>
        </ul>
      )}
    </div>
  );
}
