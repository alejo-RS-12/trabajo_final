import { useState, useEffect } from "react";


export default function Calificacion({ valorInicial = 0, onClick }) {
  const [valor, setValor] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    const inicial = Math.floor(Number(valorInicial)) || 0;
    setValor(inicial);
  }, [valorInicial]);

  const handleStarClick = (n) => {
    setValor(n);
    if (onClick) onClick(n);  
  };

  return (
    <div className="estrellas">
      {[1, 2, 3, 4, 5].map((n) => (
        <i
          key={n}
          className={`fa-star ${n <= (hover || valor) ? "fa-solid" : "fa-regular"}`}
          onClick={() => handleStarClick(n)}  
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
        ></i>
      ))}
    </div>
  );
}