export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col">
          <img src="/imagenes/logo_ropo_fondo_transparente.png" className="footer-logo" alt="logo" />
          <p>Todos los derechos reservados 2025</p>
        </div>
        <div className="footer-col">
          <h3>Contáctanos</h3>
          <p><a href="#">Escríbenos</a></p>
          <p><a href="mailto:ropo@example.com">ropo@example.com</a></p>
        </div>
        <div className="footer-col">
          <h3>Síguenos</h3>
          <p><a href="#">Facebook</a></p>
          <p><a href="#">X</a></p>
          <p><a href="#">Instagram</a></p>
        </div>
        <div className="footer-col subscribe">
          <h3>Suscríbete</h3>
            <input type="email" placeholder="Ingrese su email" required />
            <button type="submit">→</button>
        </div>
      </div>
      <div className="footer-bottom">
        <a href="#">Privacidad</a>
        <a href="#">Términos</a>
        <a href="#">Cookies</a>
        <a href="/nosotros">Nosotros</a>
      </div>
    </footer>
  );
}
