import "../assets/css/NavMenu.css";

export default function NavMenu({ open }) {
  return (
    <ul className={`hd-menu ${open ? "open" : ""}`}>
      <li>
        <a href="/formacion">Formación</a>
      </li>
      <li>
        <a href="/trabajos">Trabajos</a>
      </li>
      <li>
        <a href="/bienestar">Bienestar</a>
      </li>
      <li>
        <a href="/nosotros">Nosotros</a>
      </li>
      <li>
        <a href="/login">Ingresa</a>
      </li>
    </ul>
  );
}
