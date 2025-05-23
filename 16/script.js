document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica del Carrusel ---
    const carruselInner = document.getElementById('carruselInner');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const images = carruselInner.querySelectorAll('img');

    let currentIndex = 0;

    function updateCarrusel() {
        carruselInner.style.transform = `translateX(${-currentIndex * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Vuelve al principio
        }
        updateCarrusel();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = images.length - 1; // Va a la última
        }
        updateCarrusel();
    });

    updateCarrusel(); // Inicializa el carrusel


    // --- Lógica de Calificación por Estrellas ---
    const calificacionEstrellasDiv = document.getElementById('calificacionEstrellas');
    const estrellas = calificacionEstrellasDiv.querySelectorAll('i');

    let calificacionSeleccionada = 0; // Variable para guardar la calificación actual

    // Función para actualizar el color de las estrellas
    function actualizarEstrellas(calificacion) {
        estrellas.forEach((estrella, index) => {
            // Si el índice de la estrella es menor que la calificación, la "llena"
            if (index < calificacion) {
                estrella.classList.remove('fa-regular'); // Quita la clase de estrella vacía
                estrella.classList.add('fa-solid');    // Añade la clase de estrella llena
            } else {
                estrella.classList.remove('fa-solid'); // Quita la clase de estrella llena
                estrella.classList.add('fa-regular');   // Añade la clase de estrella vacía
            }
        });
    }

    // Añadir event listeners a cada estrella
    estrellas.forEach(estrella => {
        estrella.addEventListener('click', () => {
            // Obtiene el valor (1 al 5) de la estrella clickeada
            calificacionSeleccionada = parseInt(estrella.dataset.value);
            actualizarEstrellas(calificacionSeleccionada); // Actualiza visualmente
            
            console.log('Calificación seleccionada:', calificacionSeleccionada);
        });

        // Efecto de hover dinámico ANTES del clic
        estrella.addEventListener('mouseover', () => {
            const hoverValue = parseInt(estrella.dataset.value);
            estrellas.forEach((s, i) => {
                if (i < hoverValue) {
                    s.classList.remove('fa-regular');
                    s.classList.add('fa-solid');
                } else {
                    // Solo si no es una estrella ya seleccionada, la ponemos vacía
                    // Esto evita que las estrellas ya seleccionadas se pongan grises al pasar el mouse por encima
                    if (i >= calificacionSeleccionada) {
                         s.classList.remove('fa-solid');
                         s.classList.add('fa-regular');
                    }
                }
            });
        });

        // Restaurar las estrellas al estado de calificación actual cuando el mouse sale del área
        estrella.addEventListener('mouseout', () => {
            actualizarEstrellas(calificacionSeleccionada);
        });
    });

    // Opcional: Para que las estrellas empiecen con una calificación por defecto (ej. 3 estrellas)
    // calificacionSeleccionada = 3;
    // actualizarEstrellas(calificacionSeleccionada);
});