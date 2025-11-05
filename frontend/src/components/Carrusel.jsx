import { useEffect, useState } from "react";


const images = [
  "/imagenes/carrusel_pub/isft130.webp",
  "/imagenes/carrusel_pub/iteco20.png",
  "/imagenes/carrusel_pub/santotomas.png",
  "/imagenes/carrusel_pub/usiglo21.png",
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showNextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const showPrevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto cambio cada 5 segundos
  useEffect(() => {
    const interval = setInterval(showNextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container">
      {/* Flechas */}
      <div className="flechas">
        <button onClick={showPrevImage}>◀</button>
        <button onClick={showNextImage}>▶</button>
      </div>

      {/* Imágenes */}
      <div className="carousel">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Slide ${i + 1}`}
            className={i === currentIndex ? "active" : ""}
          />
        ))}
      </div>
    </div>
  );
}
