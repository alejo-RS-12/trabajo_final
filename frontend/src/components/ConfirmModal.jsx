

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="toast-container"> 
      <div className="toast error"> 
        <p>{message}</p>
        <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
          <button onClick={onCancel} className="buttonModal">Cancelar</button>
          <button onClick={onConfirm} className="buttonModal">Aceptar</button>
        </div>
      </div>
    </div>
  );
}