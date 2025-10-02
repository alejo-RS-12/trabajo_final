<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Página de Datos del Trabajador</title>
  <link rel="stylesheet" href="css/usuario.css" />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
  />
  <section className="sub-header">
    <div className="background-container" id="background-container">
      <label htmlFor="backgroundImageInput" className="edit-icon bg-edit">
        <i className="fas fa-pencil-alt" />
      </label>
      <input
        type="file"
        id="backgroundImageInput"
        accept="image/*"
        style={{ display: "none" }}
      />
    </div>
    <div className="profile-container">
      <img
        src="imagenes/icono-user.png"
        alt="Usuario"
        className="user-profile-image"
        id="profileImage"
      />
      <label htmlFor="profileImageInput" className="edit-icon profile-edit">
        <i className="fas fa-pencil-alt" />
      </label>
      <input
        type="file"
        id="profileImageInput"
        accept="image/*"
        style={{ display: "none" }}
      />
    </div>
    <textarea
      className="user-description"
      placeholder="Escribe una descripción..."
      defaultValue={""}
    />
  </section>
  <section className="grilla">
    <p className="subtitulo">empleos o capacitaciones</p>
  </section>
  <section className="filtro-section">
    <label htmlFor="filtroSelect">Ver:</label>
    <select id="filtroSelect">
      <option value="todos">Todas</option>
      <option value="guardados">Guardados</option>
      <option value="ofrecidos">Ofrecidos</option>
    </select>
    <button id="addCardBtn">Agregar publicación</button>
  </section>
  <section className="cards-section">
    <div className="post-card">
      <div className="post-img">
        <a href="html/publicacion.html">
          <img src="imagenes/trabajos/albaniles.jpg" alt="Imagen del trabajo" />
        </a>
      </div>
      <div className="post-info">
        <h5 className="post-title">Albañil</h5>
        <p className="post-location">Ubicación: Olavarría</p>
        <p className="post-solicitante">Solicitante: Juan Pérez</p>
        <button className="delete-btn">×</button>
        {/* <- este botón */}
      </div>
    </div>
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
        <button className="delete-btn">×</button>
        {/* <- este botón */}
      </div>
    </div>
    <div className="post-card">
      <div className="post-img">
        <a href="html/publicacion.html">
          <img src="imagenes/trabajos/plomeros.jpg" alt="Imagen del trabajo" />
        </a>
      </div>
      <div className="post-info">
        <h5 className="post-title">Plomero</h5>
        <p className="post-location">Ubicación: Loma Negra</p>
        <p className="post-solicitante">Solicitante: Juan Rutia</p>
        <button className="delete-btn">×</button>
        {/* <- este botón */}
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
        <button className="delete-btn">×</button>
        {/* <- este botón */}
      </div>
    </div>
  </section>
  <button
    id="loginToggle"
    style={{ position: "fixed", top: 10, right: 10, zIndex: 10 }}
  >
    Simular Login
  </button>
</>
