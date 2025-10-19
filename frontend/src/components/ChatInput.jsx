import { useState, useRef } from "react";

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
      const res = await fetch("http://localhost:3000/mensaje", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Error al enviar mensaje");
      const nuevo = await res.json(); // si backend devuelve el mensaje creado con id/fecha
      onSent(nuevo || { contenido: texto });
      setTexto("");
      inputRef.current?.focus();
    } catch (err) {
      console.error("Error enviando mensaje:", err);
      // fallback local:
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