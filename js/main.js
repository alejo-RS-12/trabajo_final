    // Carrusel
    const carousel = document.querySelector('.carousel');
    const images = document.querySelectorAll('.carousel a');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);
    window.addEventListener('resize', updateCarousel);
     
    let currentIndex = 0;

    function updateCarousel() {
        const offset = -currentIndex * images[0].clientWidth;
        carousel.style.transform = `translateX(${offset}px)`;
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
    }

    setInterval(showNextImage, 3000);

