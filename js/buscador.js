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
});