import { useState } from "react";
import { apiFetch } from "../services/api";

export default function DenunciaModal({ isOpen, onClose, publicacionId, idEmisor }) {
  const [motivo, setMotivo] = useState("");
  const [detalle, setDetalle] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!motivo) {
      showToast("❌ Seleccioná un motivo antes de enviar.", "error");
      return;
    }

    // Crear el contenido del mensaje
    const contenido = `🚩 Denuncia sobre publicación #${publicacionId}\nMotivo: ${motivo}\nDetalle: ${detalle || "(sin detalle)"}`;

    const nuevoMensaje = {
      contenido,
      idEmisor,  // el usuario actual
      idReceptor: 1, // el administrador
    };

    try {
      const res = await apiFetch("/mensaje", {
        method: "POST",
        body: JSON.stringify(nuevoMensaje),
      });
      showToast("✅ Denuncia enviada correctamente al administrador.");
      setTimeout(() => {
      setMotivo("");
      setDetalle("");
      onClose();
      }, 1000); // cierra después de 1 segundo porque si se cierra antes no se ve el toast. 
    } catch (error) {
      console.error("Error enviando denuncia:", error);
      showToast("❌ Ocurrió un error al enviar la denuncia.", "error");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="chat-modal">
        <div className="chat-header">
          <h2>🚩 Denunciar publicación</h2>
          <button className="btn-cerrar" onClick={onClose}>✖</button>
        </div>

        <div className="chat-window denuncia-window">
          <p className="texto-intro">
            Si encontrás contenido inapropiado, ofensivo o engañoso, podés enviar una denuncia.
          </p>

          <label className="label-denuncia">Motivo:</label>
          <select
            className="select-stilo"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
          >
            <option value="">-- Seleccioná un motivo --</option>
            <option value="spam">Spam</option>
            <option value="ofensivo">Contenido ofensivo</option>
            <option value="engano">Engaño / estafa</option>
            <option value="otro">Otro</option>
          </select>

          <label className="label-denuncia">Detalle (opcional):</label>
          <textarea
            className="textarea-stilo"
            rows="8"
            value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
            placeholder="Explicá el problema..."
          />

          <div className="chat-input denuncia-actions">
            <button className="btn-enviar" onClick={handleSubmit}>Enviar denuncia</button>
            <button className="btn-enviar" onClick={onClose}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}