
const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.carousel a');
let currentIndex = 0;

function showNextImage() {
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    const offset = -currentIndex * images[0].clientWidth;
    carousel.style.transform = `translateX(${offset}px)`;
}

// Cambiar cada 3 segundos
setInterval(showNextImage, 3000);

// Ajuste en caso de que cambie el tamaño de ventana
window.addEventListener('resize', () => {
    const offset = -currentIndex * images[0].clientWidth;
    carousel.style.transform = `translateX(${offset}px)`;
});
