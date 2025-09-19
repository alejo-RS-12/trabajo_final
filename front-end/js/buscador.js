document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar"); // Barra lateral
  const toggleBtn = document.getElementById("sidebar-toggle-btn"); // Botón para colapsar
  const filterSearch = document.getElementById("filter-search"); // Input de búsqueda
  const sidebarContent = sidebar?.querySelector(".sidebar-content"); // Contenedor de la lista
  const filterItems = sidebarContent?.querySelectorAll("li"); // Items de la lista
  const searchBox = filterSearch?.closest(".search-box"); // Caja de búsqueda

  // ----------- COLAPSAR / EXPANDIR BARRA LATERAL -----------
  if (sidebar && toggleBtn && searchBox) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");

      const icon = toggleBtn.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-chevron-left", !sidebar.classList.contains("collapsed"));
        icon.classList.toggle("fa-chevron-right", sidebar.classList.contains("collapsed"));
      }

      // Ocultar o mostrar caja de búsqueda
      searchBox.classList.toggle("oculto", sidebar.classList.contains("collapsed"));
    });
  }

  // ----------- FILTRO DE BÚSQUEDA -----------
  if (filterSearch && filterItems) {
    filterSearch.addEventListener("input", () => {
      const searchTerm = filterSearch.value.trim().toLowerCase();

      filterItems.forEach((item) => {
        const text = item.textContent.toLowerCase();
        item.classList.toggle("oculto", !text.includes(searchTerm));
      });
    });
  }
});
