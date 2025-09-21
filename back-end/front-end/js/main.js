document.addEventListener("DOMContentLoaded", function () {
  // Carrusel
  const images = document.querySelectorAll(".carousel img");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");


  let currentIndex = 0;

  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.toggle("active", i === index);
    });
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  function showPrevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", showNextImage);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", showPrevImage);
  }

  // Cambio automático cada 5 segundos
  setInterval(showNextImage, 5000);

  // Mostrar la primera imagen al iniciar
  showImage(currentIndex);

});

