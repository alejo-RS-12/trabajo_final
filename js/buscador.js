import { inicializarLogin } from "/js/login.js"; // importo la función que activa los formularios login and register

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("sidebar-toggle-btn");
  const filterSearch = document.getElementById("filter-search");
  const searchBox = filterSearch.closest(".search-box"); //  Contenedor del buscador
  const sidebarContent = sidebar.querySelector(".sidebar-content");
  const filterItems = sidebarContent.querySelectorAll("li");

  // Función para alternar el sidebar
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    // Cambiar el icono de la flecha
    const icon = toggleBtn.querySelector("i");
    if (sidebar.classList.contains("collapsed")) {
      icon.classList.remove("fa-chevron-left");
      icon.classList.add("fa-chevron-right");
      searchBox.style.display = "none"; // Oculta el contenedor del buscador
    } else {
      icon.classList.remove("fa-chevron-right");
      icon.classList.add("fa-chevron-left");
      searchBox.style.display = "block"; // Muestra el contenedor del buscador
    }
  });

  // Búsqueda en los filtros
  filterSearch.addEventListener("keyup", () => {
    const searchTerm = filterSearch.value.toLowerCase();

    // Recorremos los elementos de la lista de filtros
    filterItems.forEach((item) => {
      const text = item.textContent.toLowerCase();
      if (text.includes(searchTerm)) {
        item.style.display = "flex"; // Muestra el elemento si coincide
      } else {
        item.style.display = "none"; // Oculta el elemento si no coincide
      }
    });
  });

  // Ventana modal
  const modal = document.getElementById("ventanaModal"); // contenedor principal del modal
  const boton = document.getElementById("abrirModal"); //  "boton" o link (palabra "aqui") que abre el modal
  const span = document.getElementsByClassName("cerrar")[0]; // es la  X que permite cerrar la ventana modal
  const modalBody = document.getElementById("modal-content"); // contenedor donde se inserta Login.html

  let loginCargado = false; // Asegura Login.html no se cargó, (para evitar múltiples fetch, y que genere los errores como por ejemplo que quede NO funcional los formularios 😡😡😡)

  // Abrir modal
  boton.addEventListener("click", function () {
    // Al hacer clic en "Aqui"
    modal.style.display = "block"; // cambia display de none a block para mostrar el modal

    if (!loginCargado) {
      // acá controlamos si esta cargado o no Login y si no fue cargado
      fetch("Login.html") // lo pedimos al servidor
        .then((response) => response.text()) // convertimos la respuesta a texto
        .then((data) => {
          modalBody.innerHTML = data; //lo asignamos dentro del modal

          const parser = new DOMParser(); //creamos un parser para leer ese HTML
          const doc = parser.parseFromString(data, "text/html"); // Convertimos el texto HTML a DOM

          // Cargar CSS si no está ya agregado
          const cssHref = "/css/login.css"; //ruta del login css
          if (!document.querySelector(`link[href="${cssHref}"]`)) {
            // si no se cargo aún
            const link = document.createElement("link"); // creamos el link
            link.rel = "stylesheet"; // definimos el tipo de relacion como estilo de la página
            link.href = cssHref; //asignamos la ruta del archivo
            document.head.appendChild(link); // lo anexamos al head del html
          }

          // Inicializar interacciones
          inicializarLogin(); // llamamos a la función que carga el contenido de login.js (formularios, botones, validaciones)

          loginCargado = true; //le asignamos el valor true asi la proxima vez no se repite y asi no genera errores!!!
        });
    } else {
      inicializarLogin(); //si ya se cargó antes, aseguramos que los eventos sigan funcionando
    }
  });

  // cerrar modal (usando la X)
  span.addEventListener("click", function () {
    //cuando se hace click en la X
    modal.style.display = "none"; // se vuelve a asignar el valor NONE a la propiedad display
    modalBody.innerHTML = ""; // vaciamos el contenido del modal
    loginCargado = false; //permite recargar el HTML desde cero al volver a abrir
  });

  // cerrar modal (haciendo clic afuera del modal)
  window.addEventListener("click", function (event) {
    // si se hace clic fuera del modal
    if (event.target === modal) {
      // y sobre el fondo oscuro
      modal.style.display = "none"; // se vuelve a asignar el valor NONE a la propiedad display
      modalBody.innerHTML = ""; // vaciamos el contenido del modal
      loginCargado = false; //permite recargar el HTML desde cero al volver a abrir
    }
  });
});
