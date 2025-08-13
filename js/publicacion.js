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
  // Seleccion elementos del modal de chat
  const cerrarModalChat = document.getElementById("cerrar-modal");
  const inputMensaje = document.getElementById("mensaje-chat");
  const chatMensajes = document.getElementById("chat-mensajes");
  const enviarMensaje = document.getElementById("enviar-mensaje");
  const textareaComentario = document.querySelector("textarea");

  // Selectores para el modal de denuncia (Añadidos/Verificados)
  const btnDenunciar = document.getElementById('btnDenunciar'); // El icono de la bandera
  const modalDenuncia = document.getElementById('modalDenuncia');
  const cerrarModalDenunciaBtn = document.getElementById('cerrarModalDenunciaBtn');
  const motivoDenuncia = document.getElementById('motivoDenuncia');
  const detallesDenuncia = document.getElementById('detallesDenuncia');
  const enviarDenunciaBtn = document.getElementById('enviarDenunciaBtn');


  const loginToggle = document.getElementById("loginToggle"); // Seleccionar el botón existente
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
    // Deshabilitar elementos del modal de denuncia si no está logueado
    if (motivoDenuncia) {
        motivoDenuncia.disabled = true;
        detallesDenuncia.disabled = true;
        enviarDenunciaBtn.disabled = true;
        btnDenunciar.style.pointerEvents = "none";
        btnDenunciar.style.opacity = "0.5";
        btnDenunciar.title = "Debes iniciar sesión para denunciar";
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
  if (btnComentario && modalChat && cerrarModalChat && inputMensaje && chatMensajes && enviarMensaje) {
    btnComentario.addEventListener("click", () => {
      modalChat.style.display = "flex";
    });

    cerrarModalChat.addEventListener("click", () => {
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

  // Abrir modal desde ícono mensaje
  iconoMensajes?.addEventListener("click", () => {
    if (isLoggedIn && modalChat) {
      modalChat.style.display = "flex";
    }
  });

  // --- Modal de denuncias---
  if (btnDenunciar && modalDenuncia && cerrarModalDenunciaBtn && motivoDenuncia && detallesDenuncia && enviarDenunciaBtn) {
    btnDenunciar.addEventListener('click', () => {
      if (isLoggedIn) { // Solo abrir si está logueado
        modalDenuncia.style.display = 'flex';
      }
    });

    cerrarModalDenunciaBtn.addEventListener('click', () => {
      modalDenuncia.style.display = 'none';
      // Limpiar campos al cerrar
      motivoDenuncia.value = '';
      detallesDenuncia.value = '';
    });

    // Ocultar el modal de denuncia haciendo clic fuera
    modalDenuncia.addEventListener('click', (event) => {
      if (event.target === modalDenuncia) {
        modalDenuncia.style.display = 'none';
        motivoDenuncia.value = '';
        detallesDenuncia.value = '';
      }
    });

    // Ocultar el modal de denuncia con la tecla 'Escape'
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modalDenuncia.style.display === 'flex') {
        modalDenuncia.style.display = 'none';
        motivoDenuncia.value = '';
        detallesDenuncia.value = '';
      } else if (event.key === 'Escape' && modalChat.style.display === 'flex') {
        modalChat.style.display = 'none';
      }
    });

    // Funcionalidad del botón de enviar denuncia
    enviarDenunciaBtn.addEventListener('click', () => {
        const motivo = motivoDenuncia.value;
        const detalles = detallesDenuncia.value.trim();

        if (motivo === "") {
            alert("Por favor, selecciona un motivo para la denuncia.");
            return;
        }

        console.log("Denuncia enviada:");
        console.log("Motivo:", motivo);
        console.log("Detalles:", detalles);
        
        alert("Denuncia enviada con éxito. Gracias por tu reporte.");
        modalDenuncia.style.display = 'none'; // Cerrar el modal después de enviar
        motivoDenuncia.value = ''; // Limpiar select
        detallesDenuncia.value = ''; // Limpiar textarea
    });
  }
});