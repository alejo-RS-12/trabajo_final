document.addEventListener('DOMContentLoaded', () => {
  // Carrusel
  const carruselInner = document.getElementById('carruselInner');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (carruselInner && prevBtn && nextBtn) {
    const images = carruselInner.querySelectorAll('img');
    let currentIndex = 0;

    function updateCarrusel() {
      const offset = -currentIndex * (images.length > 0 ? images[0].clientWidth : 0);
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

  // Calificación por estrellas
  const calificacionEstrellasDiv = document.getElementById('calificacionEstrellas');
  
  if (calificacionEstrellasDiv) {
    const estrellas = calificacionEstrellasDiv.querySelectorAll('i');
    let calificacionSeleccionada = 0;

    function actualizarEstrellas(calificacion) {
      estrellas.forEach((estrella, index) => {
        if (index < calificacion) {
          estrella.classList.remove('fa-regular');
          estrella.classList.add('fa-solid');
        } else {
          estrella.classList.remove('fa-solid');
          estrella.classList.add('fa-regular');
        }
      });
    }

    estrellas.forEach(estrella => {
      estrella.addEventListener('click', () => {
        calificacionSeleccionada = parseInt(estrella.dataset.value);
        actualizarEstrellas(calificacionSeleccionada);
        console.log(`Calificaste con: ${calificacionSeleccionada} estrellas`);
      });

      estrella.addEventListener('mouseover', () => {
        const hoverValue = parseInt(estrella.dataset.value);
        estrellas.forEach((s, i) => {
          if (i < hoverValue) {
            s.classList.remove('fa-regular');
            s.classList.add('fa-solid');
          } else if (i >= calificacionSeleccionada) {
            s.classList.remove('fa-solid');
            s.classList.add('fa-regular');
          }
        });
      });

      estrella.addEventListener('mouseout', () => {
        actualizarEstrellas(calificacionSeleccionada);
      });
    });
    actualizarEstrellas(calificacionSeleccionada);
  }

  // Función para el botón de volver atrás
  const volverBtn = document.querySelector('.volver-btn');
  if (volverBtn) {
    volverBtn.addEventListener('click', () => {
      window.history.back();
    });
  }

  // Modal de Chat
  const btnComentario = document.getElementById("btn-comentario");
  const modalChat = document.getElementById("modal-chat");
  const cerrarModalChat = document.getElementById("cerrar-modal"); // Renombrado 
  const inputMensaje = document.getElementById("mensaje-chat");
  const chatMensajes = document.getElementById("chat-mensajes");
  const enviarMensaje = document.getElementById("enviar-mensaje");

  if (btnComentario && modalChat && cerrarModalChat && inputMensaje && chatMensajes && enviarMensaje) {
    btnComentario.addEventListener("click", () => {
      modalChat.style.display = "flex";
    });

    cerrarModalChat.addEventListener("click", () => {
      modalChat.style.display = "none";
    });

    // Cerrar modal de chat haciendo clic fuera
    modalChat.addEventListener("click", (e) => {
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

  // Funcionalidad del Modal de Denuncia
  const btnDenunciar = document.getElementById('btnDenunciar');
  const modalDenuncia = document.getElementById('modalDenuncia');
  const cerrarModalDenunciaBtn = document.getElementById('cerrarModalDenunciaBtn');
  const enviarDenunciaBtn = document.getElementById('enviarDenunciaBtn');
  const motivoDenuncia = document.getElementById('motivoDenuncia');
  const detallesDenuncia = document.getElementById('detallesDenuncia');

  if (btnDenunciar && modalDenuncia && cerrarModalDenunciaBtn && enviarDenunciaBtn && motivoDenuncia && detallesDenuncia) {
    // Mostrar el modal de denuncia
    btnDenunciar.addEventListener('click', () => {
      modalDenuncia.style.display = 'flex';
    });

    // Ocultar el modal de denuncia con el botón de cerrar
    cerrarModalDenunciaBtn.addEventListener('click', () => {
      modalDenuncia.style.display = 'none';
    });

    // Ocultar el modal de denuncia haciendo clic fuera
    modalDenuncia.addEventListener('click', (event) => {
      if (event.target === modalDenuncia) {
        modalDenuncia.style.display = 'none';
      }
    });

    // Ocultar el modal de denuncia con la tecla 'Escape'
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modalDenuncia.style.display === 'flex') {
        modalDenuncia.style.display = 'none';
      } else if (event.key === 'Escape' && modalChat.style.display === 'flex') { // También para el modal de chat
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
        
        // Opcional: Limpiar el formulario
        motivoDenuncia.value = "";
        detallesDenuncia.value = "";
    });
  }
});