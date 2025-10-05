export default function Header() {
  return (
    <header>
      <nav>
  <a href="index.html" className="logo">
    <img src="/imagenes/logo.png" alt="logo" />
  </a>
  <button className="menu-toggle" id="btn-menu">
    ☰
  </button>
  <ul className="navbar" id="navbar">
    <li>
      <a href="Formacion.html">Formación</a>
    </li>
    <li>
      <a href="Trabajos.html">Trabajos</a>
    </li>
    <li>
      <a href="Bienestar.html">Bienestar</a>
    </li>
    <li>
      <a href="Nosotros.html">Nosotros</a>
    </li>
    <li>
      <a href="/html/Login.html">Ingresa</a>
    </li>
  </ul>
  <a href="usuario.html" className="user-icon">
    <img
      src="/imagenes/icono-user.png"
      alt="Usuario"
      className="user-icon-image"
    />
  </a>
</nav>

    </header>
  );
}