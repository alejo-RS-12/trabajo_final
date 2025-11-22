import { useState, useEffect, useRef } from "react";
import { apiFetch, API_URL } from "../services/api";

export default function ChatModal({ receptor, onClose, idReceptor, idEmisor }) {
  const [mensaje, setMensaje] = useState(receptor === "Administrador ROPO" ? "" : "Estoy interesado en tu publicación.");
  const [mensajes, setMensajes] = useState([]);
  const inputRef = useRef(null);
  const chatWindowRef = useRef(null);

  // Cargar los mensajes al abrir el chat
 useEffect(() => {
  if (!idEmisor || !idReceptor) return;

  const fetchMensajes = async () => {
    try {
      const data = await apiFetch(`/mensaje/conversacion/${idEmisor}/${idReceptor}`);

      setMensajes(
        data.map((m) => ({
          tipo: m.emisor.idUsuario === idEmisor ? "emisor" : "receptor",
          texto: m.contenido,
        }))
      );
    } catch (error) {
      console.error("Error cargando mensajes:", error);
    }
  };

  fetchMensajes();
  inputRef.current?.focus();
}, [idEmisor, idReceptor]);



  // Scroll automático al final
  useEffect(() => {
    chatWindowRef.current?.scrollTo({
      top: chatWindowRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [mensajes]);

  // Enviar mensaje
  const handleSend = async () => {
    if (mensaje.trim() === "") return;

    const nuevoMensaje = {
      contenido: mensaje,
      idEmisor,
      idReceptor,
    };

    try {
      await apiFetch("/mensaje", {
        method: "POST",
        body: JSON.stringify(nuevoMensaje),
      });

      setMensajes((prev) => [...prev, { tipo: "emisor", texto: mensaje }]);
      setMensaje("");
      inputRef.current?.focus();
    } catch (error) {
      console.error("Error enviando mensaje:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="chat-modal">
        <div className="chat-header">
          <h2>Chat con {receptor}</h2>
          <button className="btn-cerrar" onClick={onClose}>✖</button>
        </div>

        <div className="chat-window" ref={chatWindowRef}>
           <div className="mensaje mensaje-receptor">
              Hola, ¿en qué puedo ayudarte?
            </div>
            
          {mensajes.map((m, index) => (
            <div key={index} className={`mensaje mensaje-${m.tipo}`}>
              {m.texto}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            ref={inputRef}
            type="text"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Escribí tu mensaje..."
          />
          <button className="btn-enviar" onClick={handleSend}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}