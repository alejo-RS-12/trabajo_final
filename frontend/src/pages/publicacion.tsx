<>
  {/*<!DOCTYPE html*/}
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Detalle del Servicio</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
  <link rel="stylesheet" href="../assets/css/publicacion.css" />

  <div className="pagina">
    <div className="barra-superior">
      <button className="volver-btn" title="Volver atrás">
        ←
      </button>
      <div className="iconos-superiores">
        <i className="fa-solid fa-bookmark" title="Guardar" />
        <i className="fa-solid fa-share-alt" title="Compartir" />
        <i className="fa-solid fa-flag" title="Denunciar" id="btnDenunciar" />
        <i
          className="fa-solid fa-envelope"
          id="abrir-mensajes"
          title="Bandeja de mensajes"
        />
        <a href="html/usuario.html">
          <i className="fa-solid fa-user" title="Perfil" />
        </a>
      </div>
    </div>
    <div className="contenido">
      <div className="contenido-izquierdo">
        <div className="carrusel">
          <div className="carrusel-inner" id="carruselInner">
            <img src="imagenes/publicacion/uno.jpg" alt="Imagen 1" />
            <img src="imagenes/publicacion/dos.jpg" alt="Imagen 2" />
            <img src="imagenes/publicacion/tres.jpg" alt="Imagen 3" />
            <img src="imagenes/publicacion/cuatro.jpg" alt="Imagen 4" />
            <img src="imagenes/publicacion/cinco.jpg" alt="Imagen 5" />
          </div>
          <div className="flechas">
            <button id="prevBtn">◀</button>
            <button id="nextBtn">▶</button>
          </div>
        </div>
      </div>
      <div className="contenido-derecho">
        <h2 className="titulo-servicio">Título del Servicio</h2>
        <p className="subtitulo">Nombre del solicitante o empresa</p>
        <div className="estrellas" id="calificacionEstrellas">
          <i className="fa-regular fa-star" data-value={1} />
          <i className="fa-regular fa-star" data-value={2} />
          <i className="fa-regular fa-star" data-value={3} />
          <i className="fa-regular fa-star" data-value={4} />
          <i className="fa-regular fa-star" data-value={5} />
        </div>
        <p className="descripcion">Descripción del servicio ofrecido.</p>
        <div className="mapa">
          <img
            src="imagenes/publicacion/mapa.JPG"
            alt="Mapa del área de servicio"
          />
        </div>
        <h3>Envia un mensaje al prestador</h3>
        <div className="comentarios" />
        <textarea
          placeholder="Debes iniciar sesión para comentar"
          defaultValue={""}
        />
        <button className="btn-enviar" id="btn-comentario">
          Enviar
        </button>
      </div>
    </div>
  </div>
  <div id="modal-chat" className="modal">
    <div className="modal-content">
      <button type="button" className="close-btn" id="cerrar-modal">
        ×
      </button>
      <h3>Chat con el solicitante</h3>
      <div id="chat-mensajes" className="chat-box">
        <div className="mensaje">👋 ¡Hola! ¿En qué te puedo ayudar?</div>
      </div>
      <div className="input-chat">
        <input
          type="text"
          id="mensaje-chat"
          placeholder="Escribí tu mensaje..."
        />
        <button id="enviar-mensaje">Enviar</button>
      </div>
    </div>
  </div>
  <div id="modalDenuncia" className="modal">
    <div className="modal-content" id="modalDenunciaContent">
      <button type="button" className="close-btn" id="cerrarModalDenunciaBtn">
        ×
      </button>
      <h1>Denunciar Publicación</h1>
      <p>Por favor, selecciona el motivo de tu denuncia:</p>
      <select id="motivoDenuncia">
        <option value="">Selecciona un motivo</option>
        <option value="spam">Spam</option>
        <option value="contenido-inapropiado">Contenido Inapropiado</option>
        <option value="fraude">Fraude</option>
        <option value="informacion-falsa">Información Falsa</option>
        <option value="otro">Otro</option>
      </select>
      <textarea
        id="detallesDenuncia"
        placeholder="Añade más detalles sobre tu denuncia (opcional)"
        defaultValue={""}
      />
      <button className="btn-enviar" id="enviarDenunciaBtn">
        Enviar Denuncia
      </button>
    </div>
  </div>
  <button
    id="loginToggle"
    style={{ position: "fixed", top: 10, right: 10, zIndex: 10 }}
  >
    Simular Login
  </button>
</>
