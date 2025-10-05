import { useState } from "react";

export default function Calificacion() {
  const [valor, setValor] = useState(0);

  return (
    <div className="estrellas">
      {[1, 2, 3, 4, 5].map((n) => (
        <i
          key={n}
          className={`fa-star ${n <= valor ? "fa-solid" : "fa-regular"}`}
          onClick={() => setValor(n)}
        ></i>
      ))}
    </div>
  );
}