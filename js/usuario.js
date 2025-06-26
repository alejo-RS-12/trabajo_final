document.addEventListener("DOMContentLoaded", function () {
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

  // Estado login
  loginToggle.addEventListener("click", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    localStorage.setItem("isLoggedIn", !isLoggedIn);
    updateDescriptionState();
  });

  function updateDescriptionState() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    userDescription.disabled = !isLoggedIn;
    userDescription.placeholder = isLoggedIn
      ? "Escribe una descripción..."
      : "Debes estar registrado para editar esta descripción";
  }

  updateDescriptionState();

  // Imagen de perfil
  profileInput.addEventListener("change", function () {
    const file = profileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profileImage.src = e.target.result;
        navUserIcon.src = e.target.result;
        document.body.style.backgroundImage = `url('${e.target.result}')`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
      };
      reader.readAsDataURL(file);
    }
  });

  // Fondo de cabecera
  backgroundInput.addEventListener("change", function () {
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

  // Filtro (si usás clases guardados/ofrecidos en las post-cards)
  filtroSelect.addEventListener("change", () => {
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

  // Agregar tarjetas nuevas
  addCardBtn.addEventListener("click", () => {
    const titulo = prompt("Título del trabajo:");
    const ubicacion = prompt("Ubicación:");
    const solicitante = prompt("Nombre del solicitante:");
    const tipo = prompt("¿Es 'guardados' o 'ofrecidos'? (opcional para filtro)");

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
  });

  // Eliminar tarjetas
  cardsSection.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const card = e.target.closest(".post-card");
      if (confirm("¿Estás seguro de que querés eliminar esta publicación?")) {
        card.remove();
      }
    }
  });
});
