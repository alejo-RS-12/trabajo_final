document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle-btn');
    const filterSearch = document.getElementById('filter-search');
    const searchBox = filterSearch.closest('.search-box'); //  Contenedor del buscador
    const sidebarContent = sidebar.querySelector('.sidebar-content');
    const filterItems = sidebarContent.querySelectorAll('li');

    // Función para alternar el sidebar
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        // Cambiar el icono de la flecha
        const icon = toggleBtn.querySelector('i');
        if (sidebar.classList.contains('collapsed')) {
            icon.classList.remove('fa-chevron-left');
            icon.classList.add('fa-chevron-right');
            searchBox.style.display = 'none'; // Oculta el contenedor del buscador
        } else {
            icon.classList.remove('fa-chevron-right');
            icon.classList.add('fa-chevron-left');
            searchBox.style.display = 'block'; // Muestra el contenedor del buscador
        }
    });

    // Búsqueda en los filtros
    filterSearch.addEventListener('keyup', () => {
        const searchTerm = filterSearch.value.toLowerCase();

    // Recorremos los elementos de la lista de filtros    
        filterItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.style.display = 'flex'; // Muestra el elemento si coincide
            } else {
                item.style.display = 'none'; // Oculta el elemento si no coincide
            }
        });
    });

    //Cards dinámicas

        // Carga dinámica de publicaciones
    const publicaciones = [
        {
            titulo: "Albañil",
            imagen: "/imagenes/trabajos/albaniles.jpg",
            ubicacion: "Olavarría",
            solicitante: "Juan Pérez"
        },
        {
            titulo: "Electricista",
            imagen: "/imagenes/trabajos/electricistas.jpg",
            ubicacion: "Azul",
            solicitante: "Ana Gómez"
        },
        {
            titulo: "Plomero",
            imagen: "/imagenes/trabajos/plomeros.jpg",
            ubicacion: "Loma Negra",
            solicitante: "Juan Rutia"
        },
        {
            titulo: "Entrenador",
            imagen: "/imagenes/trabajos/personaltrainers.jpg",
            ubicacion: "Sierras Bayas",
            solicitante: "Clara Díaz"
        },
        {
            titulo: "Albañil",
            imagen: "/imagenes/trabajos/albaniles.jpg",
            ubicacion: "Olavarría",
            solicitante: "Juan Pérez"
        },
        {
            titulo: "Electricista",
            imagen: "/imagenes/trabajos/electricistas.jpg",
            ubicacion: "Azul",
            solicitante: "Ana Gómez"
        },
        {
            titulo: "Plomero",
            imagen: "/imagenes/trabajos/plomeros.jpg",
            ubicacion: "Loma Negra",
            solicitante: "Juan Rutia"
        },
        {
            titulo: "Entrenador",
            imagen: "/imagenes/trabajos/personaltrainers.jpg",
            ubicacion: "Sierras Bayas",
            solicitante: "Clara Díaz"
        },
        {
            titulo: "Albañil",
            imagen: "/imagenes/trabajos/albaniles.jpg",
            ubicacion: "Olavarría",
            solicitante: "Juan Pérez"
        },
        {
            titulo: "Electricista",
            imagen: "/imagenes/trabajos/electricistas.jpg",
            ubicacion: "Azul",
            solicitante: "Ana Gómez"
        },
        {
            titulo: "Plomero",
            imagen: "/imagenes/trabajos/plomeros.jpg",
            ubicacion: "Loma Negra",
            solicitante: "Juan Rutia"
        },
        {
            titulo: "Entrenador",
            imagen: "/imagenes/trabajos/personaltrainers.jpg",
            ubicacion: "Sierras Bayas",
            solicitante: "Clara Díaz"
        },
        {
            titulo: "Albañil",
            imagen: "/imagenes/trabajos/albaniles.jpg",
            ubicacion: "Olavarría",
            solicitante: "Juan Pérez"
        },
        {
            titulo: "Electricista",
            imagen: "/imagenes/trabajos/electricistas.jpg",
            ubicacion: "Azul",
            solicitante: "Ana Gómez"
        },
        {
            titulo: "Plomero",
            imagen: "/imagenes/trabajos/plomeros.jpg",
            ubicacion: "Loma Negra",
            solicitante: "Juan Rutia"
        },
        {
            titulo: "Entrenador",
            imagen: "/imagenes/trabajos/personaltrainers.jpg",
            ubicacion: "Sierras Bayas",
            solicitante: "Clara Díaz"
        }
    ];

    const contenedor = document.querySelector(".publicaciones-grid");

    if (contenedor) {
        publicaciones.forEach(pub => {
            const card = document.createElement("div");
            card.className = "post-card";
            card.innerHTML = `
                <div class="post-img">
                    <a href="/html/publicacion.html"><img src="${pub.imagen}" alt="Imagen del trabajo"></a>
                </div>
                <div class="post-info">
                    <h5 class="post-title">${pub.titulo}</h5>
                    <p class="post-location">Ubicación: ${pub.ubicacion}</p>
                    <p class="post-solicitante">Solicitante: ${pub.solicitante}</p>
                </div>
            `;
            contenedor.appendChild(card);
        });
    }
    // Fin de carga dinámica de publicaciones
});