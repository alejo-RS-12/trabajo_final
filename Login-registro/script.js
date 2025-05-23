const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

// Event listener para el botón de Registrarse (en el panel derecho)
signUpButton.addEventListener('click', () => {
    // Añade la clase que activa las animaciones CSS para mostrar el registro
    container.classList.add("right-panel-active");
});

// Event listener para el botón de Iniciar Sesión (en el panel izquierdo)
signInButton.addEventListener('click', () => {
    // Remueve la clase para volver al estado inicial (mostrar inicio de sesión)
    container.classList.remove("right-panel-active");
});