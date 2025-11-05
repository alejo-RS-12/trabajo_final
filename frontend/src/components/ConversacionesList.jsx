import { useAuth } from "../context/AuthContext";


export default function ConversacionesList({ conversaciones, seleccionado, onSelect, mensajesNuevos }) {
  const { usuario } = useAuth();
  const idUsuario = usuario?.idUsuario;

  return (
    <div className="conversaciones-list">
      {conversaciones.length === 0 && <div className="sin-conversaciones">No hay conversaciones todavía</div>}
      {conversaciones.map(conv =>
  
          <div
            key={conv.idUsuario}
            className={`conv-item ${seleccionado?.idUsuario === conv.idUsuario ? "activo" : ""}`}
            onClick={() => onSelect({ idUsuario: conv.idUsuario, nombreCompleto: conv.nombreCompleto })}
          >
            <div className="conv-avatar">
              {conv.nombreCompleto?.split(" ").map(n => n[0]).slice(0,2).join("")}
            </div>
            <div className="conv-meta">
              <div className="conv-nombre">
                {conv.nombreCompleto}
                {mensajesNuevos[conv.idUsuario] && (
                  <span className="nuevo-mensaje-indicador"></span> // 🔴 circulo rojo
                )}
              </div>
              <div className="conv-ultimo">
                <span className="conv-ultimo-text">{conv.ultimoMensaje ?? ""}</span>
                <span className="conv-fecha">{conv.ultimaFecha ? new Date(conv.ultimaFecha).toLocaleString() : ""}</span>
              </div>
            </div>
          </div>     
          )}
    </div>
  );
}