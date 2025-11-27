import { useState, useRef } from "react";
import { apiFetch, API_URL } from "../services/api";

export default function ChatInput({ idEmisor, idReceptor, onSent }) {
  const [texto, setTexto] = useState("");
  const inputRef = useRef(null);

  const handleSend = async () => {
    if (!texto.trim()) return;
    
    const payload = {
      contenido: texto,
      idEmisor,
      idReceptor,
    };

    try {
      const nuevo = await apiFetch("/mensaje", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      
      onSent(nuevo || { contenido: texto });
      setTexto("");
      inputRef.current?.focus();
    } catch (err) {
      console.error("Error enviando mensaje:", err);
      onSent({ contenido: texto });
      setTexto("");
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input">
      <input
        ref={inputRef}
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        onKeyDown={handleKey}
        placeholder="Escribí tu mensaje..."
      />
      <button className="btn-enviar" onClick={handleSend}>Enviar</button>
    </div>
  );
}