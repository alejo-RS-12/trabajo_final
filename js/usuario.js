document.addEventListener("DOMContentLoaded", function () {
  const profileInput = document.getElementById("profileImageInput");
  const profileImage = document.getElementById("profileImage");
  const navUserIcon = document.getElementById("nav-user-icon"); // Nuevo

  const backgroundInput = document.getElementById("backgroundImageInput");
  const backgroundContainer = document.getElementById("background-container"); // Corregido ID

  const userDescription = document.querySelector(".user-description");
  const loginToggle = document.getElementById("loginToggle");

  // Simular login
  loginToggle.addEventListener("click", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    localStorage.setItem("isLoggedIn", !isLoggedIn);
    updateDescriptionState();
  });

  // Habilita o deshabilita la descripción según estado de login
  function updateDescriptionState() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    userDescription.disabled = !isLoggedIn;
    userDescription.placeholder = isLoggedIn
      ? "Escribe una descripción..."
      : "Debes estar registrado para editar esta descripción";
  }

  // Llamar al cargar la página
  updateDescriptionState();

  // Imagen de perfil
  profileInput.addEventListener("change", function () {
    const file = profileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profileImage.src = e.target.result;
        navUserIcon.src = e.target.result; // También actualizar la del navbar
        // Mostrar imagen como fondo de toda la página
        document.body.style.backgroundImage = `url('${e.target.result}')`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
      };
      reader.readAsDataURL(file);
    }
  });

  // Fondo del contenedor
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
});

const filtroSelect = document.getElementById("filtroSelect");
const cards = document.querySelectorAll(".cards-section .card");

filtroSelect.addEventListener("change", () => {
  const filtro = filtroSelect.value;

  cards.forEach((card) => {
    if (filtro === "todos") {
      card.style.display = "flex";
    } else if (card.classList.contains(filtro)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
});

// Agregar y eliminar publicaciones
const addCardBtn = document.getElementById("addCardBtn");
const cardsSection = document.querySelector(".cards-section");

addCardBtn.addEventListener("click", () => {
  const titulo = prompt("Escribí el título de la publicación:");
  if (!titulo) return;

  const tipo = prompt("¿Es 'guardados' o 'ofrecidos'?");
  if (tipo !== "guardados" && tipo !== "ofrecidos") {
    alert("Tipo no válido. Usá 'guardados' o 'ofrecidos'.");
    return;
  }

  const nuevaCard = document.createElement("div");
  nuevaCard.classList.add("card", tipo);
  nuevaCard.innerHTML = `
   <span>${titulo}</span>
    <button class="delete-btn">×</button>
  `;

  cardsSection.appendChild(nuevaCard);
});

// Eliminar tarjetas (delegación de eventos)
cardsSection.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const card = e.target.closest(".card");
    if (confirm("¿Estás seguro de que querés eliminar esta publicación?")) {
      card.remove();
    }
  }
});
