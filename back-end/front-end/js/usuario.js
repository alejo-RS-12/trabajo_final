document.addEventListener("DOMContentLoaded", function () { //Se asegura de que todo el HTML esté cargado antes de ejecutar el código JavaScript.
  // seleccion de elementos del dom
  const profileInput = document.getElementById("profileImageInput");
  const profileImage = document.getElementById("profileImage");
  const navUserIcon = document.getElementById("nav-user-icon");
  const backgroundInput = document.getElementById("backgroundImageInput");
  const backgroundContainer = document.getElementById("background-container");
  const userDescription = document.querySelector(".user-description");
  const loginToggle = document.getElementById("loginToggle");
  const filtroSelect = document.getElementById("filtroSelect");
  const addCardBtn = document.getElementById("addCardBtn");
  const cardsSection = document.querySelector(".cards-section");
  const profileEditIcon = document.querySelector(".profile-edit");
  const bgEditIcon = document.querySelector(".bg-edit");

  // Al cargar la página, inicializa el estado del login
  updateUIBasedOnLogin();

  // Botón de login/logout simulado
  loginToggle.addEventListener("click", () => {// esta funcion alterna el estado del login del usuario momentaneamente
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const newLoginState = !isLoggedIn;
    localStorage.setItem("isLoggedIn", newLoginState);
    updateUIBasedOnLogin();
  });

  function updateUIBasedOnLogin() {// en esta funcion habilita o desabilita la interfaz dependiendo el estado del login 
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    // Habilitar/deshabilitar edición de descripción
    userDescription.disabled = !isLoggedIn;
    userDescription.placeholder = isLoggedIn
      ? "Escribe una descripción..."
      : "Debes estar registrado para editar esta descripción";

    // Inputs de imagen
    profileInput.disabled = !isLoggedIn;
    backgroundInput.disabled = !isLoggedIn;

    // Mostrar íconos de lápiz si logueado
    profileEditIcon.style.display = isLoggedIn ? "block" : "none";
    bgEditIcon.style.display = isLoggedIn ? "block" : "none";

    // Cambiar clase del <body> y texto del botón
    document.body.classList.toggle("logged-in", isLoggedIn);
    loginToggle.textContent = isLoggedIn ? "Cerrar sesión" : "Simular Login";

    // Mostrar botón agregar solo si logueado
    addCardBtn.style.display = isLoggedIn ? "inline-block" : "none";

    // Mostrar botones de eliminar solo si logueado
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.style.display = isLoggedIn ? "inline-block" : "none";
    });
  }

  // Imagen de perfil
  profileInput.addEventListener("change", function () {// funcion que actualiza la imagen de perfil del usuario
    const file = profileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profileImage.src = e.target.result;
        navUserIcon.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Imagen de fondo
  backgroundInput.addEventListener("change", function () {// funcion para actualizar la imagen de fondo del usuario
    const file = backgroundInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        backgroundContainer.style.backgroundImage = `url('${e.target.result}')`;
        backgroundContainer.style.backgroundSize = "cover";
        backgroundContainer.style.backgroundPosition = "center";
      };
      reader.readAsDataURL(file);
    }
  });

  // Filtro de tarjetas
  filtroSelect.addEventListener("change", () => {// funcion del filtrado de publicaciones entre guardados, ofrecidos o todos
    const filtro = filtroSelect.value;
    const cards = document.querySelectorAll(".cards-section .post-card");

    cards.forEach(card => {
      if (filtro === "todos") {
        card.style.display = "block";
      } else if (card.classList.contains(filtro)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });

  // Agregar nueva tarjeta
  addCardBtn.addEventListener("click", () => {// funcion que agrega una nueva card de trabajo si el usuario esta logeado
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para agregar publicaciones.");
      return;
    }

    const titulo = prompt("Título del trabajo:");
    const ubicacion = prompt("Ubicación:");
    const solicitante = prompt("Nombre del solicitante:");
    const tipo = prompt("¿Es 'guardados' o 'ofrecidos'?");

    if (!titulo || !ubicacion || !solicitante) {
      alert("Faltan datos");
      return;
    }

    const nuevaCard = document.createElement("div");
    nuevaCard.classList.add("post-card");
    if (tipo === "guardados" || tipo === "ofrecidos") {
      nuevaCard.classList.add(tipo);
    }

    nuevaCard.innerHTML = `
      <div class="post-img">
        <img src="/imagenes/trabajos/generico.jpg" alt="Imagen del trabajo" />
      </div>
      <div class="post-info">
        <h5 class="post-title">${titulo}</h5>
        <p class="post-location">Ubicación: ${ubicacion}</p>
        <p class="post-solicitante">Solicitante: ${solicitante}</p>
        <button class="delete-btn">×</button>
      </div>
    `;

    cardsSection.appendChild(nuevaCard);
    updateUIBasedOnLogin(); // para aplicar visibilidad del botón eliminar
  });

  // Eliminar tarjeta (solo si logueado)
  cardsSection.addEventListener("click", (e) => { // funcion de eliminar card de trabajo
    if (e.target.classList.contains("delete-btn")) {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (!isLoggedIn) {
        alert("Debes iniciar sesión para eliminar publicaciones.");
        return;
      }

      const card = e.target.closest(".post-card");
      if (confirm("¿Estás seguro de que querés eliminar esta publicación?")) {
        card.remove();
      }
    }
  });
});
