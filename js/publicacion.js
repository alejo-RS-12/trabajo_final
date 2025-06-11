document.addEventListener('DOMContentLoaded', () => {
  // Carrusel
  const carruselInner = document.getElementById('carruselInner');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const images = carruselInner.querySelectorAll('img');


  let currentIndex = 0;

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

  // Calificación por estrellas
  const calificacionEstrellasDiv = document.getElementById('calificacionEstrellas');
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
    // Función para el botón de volver atrás
  const volverBtn = document.querySelector('.volver-btn');
  volverBtn.addEventListener('click', () => {
    window.history.back(); // Regresa a la página anterior
  });

});
