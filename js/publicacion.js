document.addEventListener('DOMContentLoaded', () => {
  const carruselInner = document.getElementById('carruselInner');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const volverBtn = document.querySelector('.volver-btn');
  const iconoMensajes = document.getElementById("abrir-mensajes");
  const calificacionEstrellasDiv = document.getElementById('calificacionEstrellas');
  const estrellas = calificacionEstrellasDiv?.querySelectorAll('i') || [];

  const btnComentario = document.getElementById("btn-comentario");
  const modalChat = document.getElementById("modal-chat");
  const cerrarModal = document.getElementById("cerrar-modal");
  const inputMensaje = document.getElementById("mensaje-chat");
  const chatMensajes = document.getElementById("chat-mensajes");
  const enviarMensaje = document.getElementById("enviar-mensaje");
  const textareaComentario = document.querySelector("textarea");

  const loginToggle = document.createElement("button");
  loginToggle.id = "loginToggle";
  loginToggle.style.position = "fixed";
  loginToggle.style.top = "10px";
  loginToggle.style.right = "10px";
  loginToggle.style.zIndex = "1000";
  document.body.appendChild(loginToggle);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  loginToggle.textContent = isLoggedIn ? "Cerrar sesión" : "Simular Login";

  loginToggle.addEventListener("click", () => {
    const nuevoEstado = !isLoggedIn;
    localStorage.setItem("isLoggedIn", nuevoEstado);
    location.reload();
  });

  // --- RESTRICCIONES SI NO ESTÁS LOGUEADO ---
  if (!isLoggedIn) {
    const botonesInteractivos = document.querySelectorAll(
      ".fa-bookmark, .fa-share-alt, .fa-flag, #abrir-mensajes, #btn-comentario, #enviar-mensaje"
    );

    botonesInteractivos.forEach(btn => {
      btn.style.pointerEvents = "none";
      btn.style.opacity = "0.5";
      btn.title = "Debes iniciar sesión para usar esta función";
    });

    if (textareaComentario) {
      textareaComentario.disabled = true;
      textareaComentario.placeholder = "Debes iniciar sesión para comentar";
    }

    if (inputMensaje) {
      inputMensaje.disabled = true;
      inputMensaje.placeholder = "Debes iniciar sesión para chatear";
    }

    estrellas.forEach(estrella => {
      estrella.style.pointerEvents = "none";
      estrella.style.opacity = "0.5";
      estrella.title = "Inicia sesión para calificar";
    });

    if (enviarMensaje) {
      enviarMensaje.disabled = true;
    }
  }

  // --- CARRUSEL ---
  let currentIndex = 0;

  if (carruselInner && nextBtn && prevBtn) {
    const images = carruselInner.querySelectorAll('img');

    function updateCarrusel() {
      const offset = -currentIndex * images[0].clientWidth;
      carruselInner.style.transform = `translateX(${offset}px)`;
    }

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateCarrusel();
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateCarrusel();
    });

    window.addEventListener('resize', updateCarrusel);
    updateCarrusel();
  }

  // --- CALIFICACIÓN ---
  let calificacionSeleccionada = 0;

  function actualizarEstrellas(valor) {
    estrellas.forEach((estrella, index) => {
      estrella.classList.toggle('fa-solid', index < valor);
      estrella.classList.toggle('fa-regular', index >= valor);
    });
  }

  estrellas.forEach(estrella => {
    estrella.addEventListener('click', () => {
      calificacionSeleccionada = parseInt(estrella.dataset.value);
      actualizarEstrellas(calificacionSeleccionada);
    });

    estrella.addEventListener('mouseover', () => {
      actualizarEstrellas(parseInt(estrella.dataset.value));
    });

    estrella.addEventListener('mouseout', () => {
      actualizarEstrellas(calificacionSeleccionada);
    });
  });

  volverBtn?.addEventListener('click', () => {
    window.history.back();
  });

  // --- CHAT ---
  if (btnComentario && modalChat && cerrarModal && inputMensaje && chatMensajes && enviarMensaje) {
    btnComentario.addEventListener("click", () => {
      modalChat.style.display = "flex";
    });

    cerrarModal.addEventListener("click", () => {
      modalChat.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modalChat) {
        modalChat.style.display = "none";
      }
    });

    enviarMensaje.addEventListener("click", () => {
      const texto = inputMensaje.value.trim();
      if (texto !== "") {
        const nuevoMensaje = document.createElement("div");
        nuevoMensaje.className = "mensaje";
        nuevoMensaje.textContent = texto;
        chatMensajes.appendChild(nuevoMensaje);
        inputMensaje.value = "";
        chatMensajes.scrollTop = chatMensajes.scrollHeight;
      }
    });
  }

  // Abrir modal desde ícono mensaje (reubicado abajo para que modal exista)
  iconoMensajes?.addEventListener("click", () => {
    if (isLoggedIn && modalChat) {
      modalChat.style.display = "flex";
    }
  });
});
