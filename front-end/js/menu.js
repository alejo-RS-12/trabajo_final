document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");

    if (menuBtn && navbar) {
        menuBtn.addEventListener("click", function () {
            navbar.classList.toggle("show");
        });
    }
});
