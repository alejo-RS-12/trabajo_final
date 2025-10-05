export default function Footer() {
  return (
    <footer>
      <footer className="footer">
  <div className="footer-top">
    <div className="footer-col">
      <img
        src="/imagenes/logo_ropo_fondo_transparente.png"
        className="footer-logo"
        alt="logo"
      />
      <p>Todos los derechos reservados 2025</p>
    </div>
    <div className="footer-col">
      <h3>Contáctanos</h3>
      <p>
        <a href="#">Escríbenos</a>
      </p>
      <p>
        <a href="mailto:ropo@example.com">ropo@example.com</a>
      </p>
    </div>
    <div className="footer-col">
      <h3>Síguenos</h3>
      <p>
        <a href="#">Facebook</a>
      </p>
      <p>
        <a href="#">X</a>
      </p>
      <p>
        <a href="#">Instagram</a>
      </p>
    </div>
    <div className="footer-col subscribe">
      <h3>Suscríbete para recibir más noticias</h3>
      <form>
        <input type="email" placeholder="Ingrese su email" required="" />
        <button type="submit">→</button>
      </form>
    </div>
  </div>
  <div className="footer-bottom">
    <a href="#">Política de Privacidad</a>
    <a href="#">Términos del servicio</a>
    <a href="#">Política de Cookies</a>
    <a href="/html/Nosotros.html">Nosotros</a>
  </div>
</footer>
    </footer>
  );
}