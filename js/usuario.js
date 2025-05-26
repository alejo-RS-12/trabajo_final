document.addEventListener("DOMContentLoaded", function () {
  const profileInput = document.getElementById("profileImageInput");
  const profileImage = document.getElementById("profileImage");
  const navUserIcon = document.getElementById("nav-user-icon"); // Nuevo

  const backgroundInput = document.getElementById("backgroundImageInput");
  const backgroundContainer = document.getElementById("background-container"); // Corregido ID

  // Imagen de perfil
  profileInput.addEventListener("change", function () {
    const file = profileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profileImage.src = e.target.result;
        navUserIcon.src = e.target.result; // También actualizar la del navbar
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
