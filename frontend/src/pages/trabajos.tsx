<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ROPO - Formacion</title>
  <link rel="stylesheet" href="css/trabajos.css" />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
  />
  <img
    src="imagenes/artes_visuales.png"
    alt="Decoración"
    className="imagen-fija"
  />
  {/* Header */}
  <header>
    <nav>
      <a href="index.html" className="logo">
        <img src="imagenes/logo.png" alt="logo" />
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
          <a href="Login.html">Ingresa</a>
        </li>
      </ul>
      <a href="usuario.html" className="user-icon">
        <img
          src="imagenes/icono-user.png"
          alt="Usuario"
          className="user-icon-image"
        />
      </a>
    </nav>
  </header>
  {/* Contenido principal */}
  <div className="contenido-principal">
    <section className="publicaciones">
      <div className="publicaciones-grid">
        {/* Publicación 1 */}
        <div className="post-card">
          <div className="post-img">
            <a href="html/publicacion.html">
              <img
                src="imagenes/trabajos/albaniles.jpg"
                alt="Imagen del trabajo"
              />
            </a>
          </div>
          <div className="post-info">
            <h5 className="post-title">Albañil</h5>
            <p className="post-location">Ubicación: Olavarría</p>
            <p className="post-solicitante">Solicitante: Juan Pérez</p>
          </div>
        </div>
        {/* Publicación 2 (duplicada como ejemplo) */}
        <div className="post-card">
          <div className="post-img">
            <a href="html/publicacion.html">
              <img
                src="imagenes/trabajos/electricistas.jpg"
                alt="Imagen del trabajo"
              />
            </a>
          </div>
          <div className="post-info">
            <h5 className="post-title">Electricista</h5>
            <p className="post-location">Ubicación: Azul</p>
            <p className="post-solicitante">Solicitante: Ana Gómez</p>
          </div>
        </div>
        <div className="post-card">
          <div className="post-img">
            <a href="html/publicacion.html">
              <img
                src="imagenes/trabajos/plomeros.jpg"
                alt="Imagen del trabajo"
              />
            </a>
          </div>
          <div className="post-info">
            <h5 className="post-title">Plomero</h5>
            <p className="post-location">Ubicación: Loma Negra</p>
            <p className="post-solicitante">Solicitante: Juan Rutia</p>
          </div>
        </div>
        <div className="post-card">
          <div className="post-img">
            <a href="html/publicacion.html">
              <img
                src="imagenes/trabajos/personaltrainers.jpg"
                alt="Imagen del trabajo"
              />
            </a>
          </div>
          <div className="post-info">
            <h5 className="post-title">Personal Trainer</h5>
            <p className="post-location">Ubicación: Olavarría</p>
            <p className="post-solicitante">Solicitante: Laura Gimenez</p>
          </div>
        </div>
        <div className="post-card">
          <div className="post-img">
            <a href="html/publicacion.html">
              <img
                src="imagenes/trabajos/albaniles2.jpg"
                alt="Imagen del trabajo"
              />
            </a>
          </div>
          <div className="post-info">
            <h5 className="post-title">Albañil</h5>
            <p className="post-location">Ubicación: Sierra Chica</p>
            <p className="post-solicitante">Solicitante: Marcos Gutierrez</p>
          </div>
        </div>
        {/* Publicación 2 (duplicada como ejemplo) */}
        <div className="post-card">
          <div className="post-img">
            <a href="html/publicacion.html">
              <img
                src="imagenes/trabajos/electricistas2.jpg"
                alt="Imagen del trabajo"
              />
            </a>
          </div>
          <div className="post-info">
            <h5 className="post-title">Electricista</h5>
            <p className="post-location">Ubicación: Olavarría</p>
            <p className="post-solicitante">Solicitante: Nestor Díaz</p>
          </div>
        </div>
        <div className="post-card">
          <div className="post-img">
            <a href="html/publicacion.html">
              <img
                src="imagenes/trabajos/plomeros2.jpg"
                alt="Imagen del trabajo"
              />
            </a>
          </div>
          <div className="post-info">
            <h5 className="post-title">Plomero</h5>
            <p className="post-location">Ubicación: Sierras Bayas</p>
            <p className="post-solicitante">Solicitante: Gustavo Álvarez</p>
          </div>
        </div>
        <div className="post-card">
          <div className="post-img">
            <a href="html/publicacion.html">
              <img
                src="imagenes/trabajos/personaltrainers2.jpg"
                alt="Imagen del trabajo"
              />
            </a>
          </div>
          <div className="post-info">
            <h5 className="post-title">Personal Trainer</h5>
            <p className="post-location">Ubicación: Olavarría</p>
            <p className="post-solicitante">Solicitante: Diego Zamudio</p>
          </div>
        </div>
      </div>
    </section>
  </div>
  
</>
