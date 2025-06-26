document.addEventListener('DOMContentLoaded', () => {
  const carruselInner = document.getElementById('carruselInner');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const volverBtn = document.querySelector('.volver-btn');
  const iconoMensajes = document.getElementById("abrir-mensajes");
  const calificacionEstrellasDiv = document.getElementById('calificacionEstrellas');
  const estrellas = calificacionEstrellasDiv?.querySelectorAll('i') || [];

  let currentIndex = 0;

  iconoMensajes?.addEventListener("click", () => {
  modalChat.style.display = "flex";
});

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

  // Chat Modal
  const btnComentario = document.getElementById("btn-comentario");
  const modalChat = document.getElementById("modal-chat");
  const cerrarModal = document.getElementById("cerrar-modal");
  const inputMensaje = document.getElementById("mensaje-chat");
  const chatMensajes = document.getElementById("chat-mensajes");
  const enviarMensaje = document.getElementById("enviar-mensaje");

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
});
