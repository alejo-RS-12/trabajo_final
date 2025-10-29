document.addEventListener("DOMContentLoaded", () => {
  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
  const usuario = document.getElementById("usuario");
  const password = document.getElementById("password");
  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const container = document.getElementById("container");

  const validarNombre = () => {
    const valor = nombre.value.trim();
    const icon = document.getElementById("icon-nombre");
    const error = document.getElementById("error-nombre");

    if (valor === "" || valor.length < 3) {
      icon.textContent = "✗";
      icon.className = "icon invalid";
      error.textContent =
        "El nombre es obligatorio y debe tener al menos 3 caracteres.";
      return false;
    }
    icon.textContent = "✓";
    icon.className = "icon valid";
    error.textContent = "";
    return true;
  };

  const validarEmail = () => {
    const valor = email.value.trim();
    const icon = document.getElementById("icon-email");
    const error = document.getElementById("error-email");
    const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

    if (!regex.test(valor)) {
      icon.textContent = "✗";
      icon.className = "icon invalid";
      error.textContent = "Correo inválido (ejemplo: nombre@ropo.com).";
      return false;
    }
    icon.textContent = "✓";
    icon.className = "icon valid";
    error.textContent = "";
    return true;
  };

  const validarUsuario = () => {
    const valor = usuario.value.trim();
    const icon = document.getElementById("icon-usuario");
    const error = document.getElementById("error-usuario");

    if (valor.length < 4 || valor.length > 20) {
      icon.textContent = "✗";
      icon.className = "icon invalid";
      error.textContent =
        "El nombre de usuario debe tener entre 4 y 20 caracteres.";
      return false;
    }
    icon.textContent = "✓";
    icon.className = "icon valid";
    error.textContent = "";
    return true;
  };

  const validarPassword = () => {
    const valor = password.value.trim();
    const icon = document.getElementById("icon-password");
    const error = document.getElementById("error-password");

    if (valor.length < 6) {
      icon.textContent = "✗";
      icon.className = "icon invalid";
      error.textContent = "La contraseña debe tener al menos 6 caracteres.";
      return false;
    }
    icon.textContent = "✓";
    icon.className = "icon valid";
    error.textContent = "";
    return true;
  };

  nombre.addEventListener("input", validarNombre);
  email.addEventListener("input", validarEmail);
  usuario.addEventListener("input", validarUsuario);
  password.addEventListener("input", validarPassword);

  // Event listener para el botón de Registrarse (en el panel derecho)
  signUpButton.addEventListener("click", () => {
    // Añade la clase que activa las animaciones CSS para mostrar el registro
    container.classList.add("right-panel-active");
  });

  // Event listener para el botón de Iniciar Sesión (en el panel izquierdo)
  signInButton.addEventListener("click", () => {
    // Remueve la clase para volver al estado inicial (mostrar inicio de sesión)
    container.classList.remove("right-panel-active");
  });
});
