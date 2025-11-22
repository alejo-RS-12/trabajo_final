import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import ConversacionesList from "../components/ConversacionesList";
import ChatView from "../components/ChatView";
import { apiFetch, API_URL } from "../services/api";

export default function MensajesPage() {
  const { usuario } = useAuth();
  const idUsuario = usuario?.idUsuario;

  const [conversaciones, setConversaciones] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [mensajesNuevos, setMensajesNuevos] = useState({}); 

  const handleSelect = (conv) => {
    setSeleccionado(conv);
  };

  // Limpia el indicador de mensaje nuevo al seleccionar una conversación
  useEffect(() => {
    if (!seleccionado) return;
    setMensajesNuevos(prev => {
      const copy = { ...prev };
      delete copy[seleccionado.idUsuario];
      return copy;
    });
  }, [seleccionado]);

  // Carga conversaciones iniciales
  useEffect(() => {
    if (!idUsuario) return;

    const fetchConversaciones = async () => {
      try {
        const data = await apiFetch(`/mensaje/conversaciones/${idUsuario}`);
        const conversacionesData = (Array.isArray(data) ? data : []) 
        setConversaciones(conversacionesData);

        if (!seleccionado && conversacionesData.length > 0) {
          setSeleccionado({
            idUsuario: conversacionesData[0].idUsuario,
            nombreCompleto: conversacionesData[0].nombreCompleto,
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchConversaciones();
  }, [idUsuario]);

  // Polling limpio para detectar mensajes nuevos
  useEffect(() => {
    if (!idUsuario) return;

    const interval = setInterval(async () => {
      try {
        const conversacionesData = await apiFetch(`/mensaje/conversaciones/${idUsuario}`);
        const conversacionesArray = (Array.isArray(conversacionesData) ? conversacionesData : [])
        // console.log("Conversaciones recibidas del backend:", conversacionesData);
        setConversaciones(prev => {
          const nuevosIndicadores = {};

          conversacionesArray.forEach(conv => {
            const previa = prev.find(p => p.idUsuario === conv.idUsuario);

            // Comparo por la fecha del último mensaje  

            const fechaPrev = previa?.ultimaFecha;
            const fechaAct = conv?.ultimaFecha;

            if (previa && fechaPrev !== fechaAct) {
              if (seleccionado?.idUsuario !== conv.idUsuario) {
            // console.log("Nuevo mensaje detectado en conversación con idUsuario:", conv.idUsuario, conv);
                nuevosIndicadores[conv.idUsuario] = true;
              }
            }
          });

          if (Object.keys(nuevosIndicadores).length > 0) {
            setMensajesNuevos(prevNuevos => ({ ...prevNuevos, ...nuevosIndicadores }));
          }

          return conversacionesArray;
        });
      } catch (err) {
        console.error("Error en polling de conversaciones:", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [idUsuario, seleccionado?.idUsuario]);

  return (
    <div className="pagina mensajes-page">
      <div className="mensajes-layout">
        <aside className="sidebar-conversaciones">
          <div className="sidebar-header-m">
            <h3>Mensajes</h3>
          </div>
          <ConversacionesList
            conversaciones={conversaciones}
            seleccionado={seleccionado}
            onSelect={handleSelect}
            mensajesNuevos={mensajesNuevos}
          />
        </aside>

        <main className="panel-chat">
          {seleccionado ? (
            <ChatView
              key={seleccionado.idUsuario} 
              idEmisor={idUsuario}
              idReceptor={seleccionado.idUsuario}
              receptorNombre={seleccionado.nombreCompleto}
              onNuevoMensaje={(mensaje) => {
                const emisorId = mensaje?.emisor?.idUsuario;
                if (!emisorId || emisorId === idUsuario) return;

                // Solo marcar mensaje nuevo si no es la conversación activa
                if (seleccionado?.idUsuario !== emisorId) {
                  setMensajesNuevos(prev => ({ ...prev, [emisorId]: true }));
                }
              }}
               refrescarConversaciones={async () => {
                const data = await apiFetch(`/mensaje/conversaciones/${idUsuario}`);
                setConversaciones(data);
              }}
            />
          ) : (
            <div className="chat-vacio">
              <p>Seleccioná una conversación a la izquierda para comenzar</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
