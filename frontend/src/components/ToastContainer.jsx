import { useState, useEffect } from "react";
import "../css/trabajos.css"; // tu CSS con .toast y .toast-container

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  // Función global para mostrar un toast
  window.showToast = (message, type = "success", duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  return (
    <div id="toast-container" className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          {t.message}
        </div>
      ))}
    </div>
  );
}