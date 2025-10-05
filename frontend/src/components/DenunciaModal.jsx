import { useState } from "react";
import "../css/trabajos.css"; // mismo archivo de estilos

export default function DenunciaModal({ isOpen, onClose, publicacionId }) {
  const [motivo, setMotivo] = useState("");
  const [detalle, setDetalle] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!motivo) return alert("Seleccioná un motivo.");
    console.log("Denuncia enviada:", { publicacionId, motivo, detalle });
    // Lógica para guardar denuncia
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <h2>Denunciar publicación</h2>

        <label>Motivo:</label>
        <select value={motivo} onChange={(e) => setMotivo(e.target.value)}>
          <option value="">-- Seleccioná un motivo --</option>
          <option value="spam">Spam</option>
          <option value="ofensivo">Contenido ofensivo</option>
          <option value="engano">Engaño / estafa</option>
          <option value="otro">Otro</option>
        </select>

        <label>Detalle (opcional):</label>
        <textarea
          rows="3"
          value={detalle}
          onChange={(e) => setDetalle(e.target.value)}
          placeholder="Explicá el problema..."
        />

        <div className="modal-actions">
          <button onClick={handleSubmit}>Enviar denuncia</button>
          <button className="btn-cerrar" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}