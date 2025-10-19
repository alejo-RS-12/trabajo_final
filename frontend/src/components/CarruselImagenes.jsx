import { useState } from "react";

export default function CarruselImagenes({ imagenes }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + imagenes.length) % imagenes.length);
  const next = () => setIndex((i) => (i + 1) % imagenes.length);

  return (
    <div className="carousel-container">
    <div className="carousel">
      <img src={imagenes[index]} alt={`Imagen ${index + 1}`} />
      </div>
      <div className="flechas">
        <button onClick={prev}>◀</button>
        <button onClick={next}>▶</button>
      </div>
    </div>
  );
}