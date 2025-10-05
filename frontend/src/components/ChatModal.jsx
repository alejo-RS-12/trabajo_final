import { useState } from "react";
import "../css/trabajos.css"; // usa los mismos estilos que ya tenés

export default function ChatModal({ isOpen, onClose, receptor }) {
  const [mensaje, setMensaje] = useState("");

  if (!isOpen) return null;

  const handleSend = () => {
    if (mensaje.trim() === "") return;
    console.log("Mensaje enviado a:", receptor, mensaje);
    setMensaje("");
    // Acá podés agregar la lógica de envío real (API, socket, etc.)
  };

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <h2>Chat con {receptor}</h2>

        <div className="chat-window">
          {/* Acá se mostrarían los mensajes anteriores */}
          <p className="placeholder">Historial de chat...</p>
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Escribí tu mensaje..."
          />
          <button onClick={handleSend}>Enviar</button>
        </div>

        <button className="btn-cerrar" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}