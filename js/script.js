document.addEventListener("DOMContentLoaded", function () {
  // --- Imagen de usuario ---
  const isLoggedIn = false;
  if (isLoggedIn) {
    document.body.classList.add("logged-in");
  } else {
    document.body.classList.remove("logged-in");
  }

  // --- Carrusel ---
  const track = document.getElementById("carousel-track");
  const carousel = document.querySelector(".carousel");
  const totalSlides = track.children.length;
  let index = 0;

  const nextBtn = document.querySelector(".carousel-button.next");
  const prevBtn = document.querySelector(".carousel-button.prev");

  function updateCarousel() {
    track.style.transform = `translateX(-${index * 600}px)`;
  }

  function nextSlide() {
    index = (index + 1) % totalSlides;
    updateCarousel();
  }

  function prevSlide() {
    index = (index - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  let autoSlideInterval = setInterval(nextSlide, 5000);

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }

  function startAutoSlide() {
    if (!autoSlideInterval) {
      autoSlideInterval = setInterval(nextSlide, 5000);
    }
  }

  function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
    restartAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    restartAutoSlide();
  });

  carousel.addEventListener("mouseenter", () => {
    stopAutoSlide();
  });

  carousel.addEventListener("mouseleave", () => {
    startAutoSlide();
  });
});
