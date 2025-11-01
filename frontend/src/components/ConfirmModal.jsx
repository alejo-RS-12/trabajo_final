import "../assets/css/trabajos.css";

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="toast-container"> {/* reutiliza tu container */}
      <div className="toast error"> {/* usá clase toast/error o creá una nueva */}
        <p>{message}</p>
        <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
          <button onClick={onCancel} className="buttonModal">Cancelar</button>
          <button onClick={onConfirm} className="buttonModal">Aceptar</button>
        </div>
      </div>
    </div>
  );
}