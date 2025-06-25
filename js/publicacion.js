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

  // Funcionalidad del Modal de Denuncia
  const btnDenunciar = document.getElementById('btnDenunciar');
  const modalDenuncia = document.getElementById('modalDenuncia');
  const cerrarModalBtn = document.getElementById('cerrarModalBtn');
  const btnEnviarDenuncia = modalDenuncia ? modalDenuncia.querySelector('.btn-enviar') : null; // Seleccionar el botón de enviar denuncia dentro del modal
  const selectMotivo = modalDenuncia ? modalDenuncia.querySelector('select') : null;
  const textareaDetalles = modalDenuncia ? modalDenuncia.querySelector('textarea') : null;


  if (btnDenunciar && modalDenuncia && cerrarModalBtn) {
    // Mostrar el modal
    btnDenunciar.addEventListener('click', () => {
      modalDenuncia.style.display = 'flex';
    });

    // Ocultar el modal con el botón de cerrar
    cerrarModalBtn.addEventListener('click', () => {
      modalDenuncia.style.display = 'none';
    });

    // Ocultar el modal haciendo clic fuera
    modalDenuncia.addEventListener('click', (event) => {
      if (event.target === modalDenuncia) {
        modalDenuncia.style.display = 'none';
      }
    });

    // Ocultar el modal con la tecla 'Escape'
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modalDenuncia.style.display === 'flex') {
        modalDenuncia.style.display = 'none';
      }
    });

    // Funcionalidad del botón de enviar denuncia
    if (btnEnviarDenuncia && selectMotivo && textareaDetalles) {
        btnEnviarDenuncia.addEventListener('click', () => {
            const motivo = selectMotivo.value;
            const detalles = textareaDetalles.value.trim();

            if (motivo === "") {
                alert("Por favor, selecciona un motivo para la denuncia.");
                return;
            }

            // Aquí es donde enviarías la denuncia a tu servidor
            console.log("Denuncia enviada:");
            console.log("Motivo:", motivo);
            console.log("Detalles:", detalles);
            
            alert("Denuncia enviada con éxito. Gracias por tu reporte.");
            modalDenuncia.style.display = 'none'; // Cerrar el modal después de enviar
            
            // Opcional: Limpiar el formulario
            selectMotivo.value = "";
            textareaDetalles.value = "";
        });
    }
  }
});