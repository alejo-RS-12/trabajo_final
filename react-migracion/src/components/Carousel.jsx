import { useState, useEffect } from "react";

const images = [
  { src: "/imagenes/carrusel_pub/santotomas.png", alt: "Santo Tomás" },
  { src: "/imagenes/carrusel_pub/iteco20.png", alt: "ITECO" },
  { src: "/imagenes/carrusel_pub/usiglo21.png", alt: "Siglo 21" },
  { src: "/imagenes/carrusel_pub/isft130.webp", alt: "Instituto 130" },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // cambio cada 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const showPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        {images.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={img.alt}
            className={index === currentIndex ? "active" : ""}
          />
        ))}
      </div>
      <div className="flechas">
        <button onClick={showPrev}>◀</button>
        <button onClick={showNext}>▶</button>
      </div>
    </div>
  );
}
