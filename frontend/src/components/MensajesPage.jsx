import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import ConversacionesList from "./ConversacionesList";
import ChatView from "./ChatView";
import "../css/trabajos.css";

export default function MensajesPage() {
  const { usuario } = useAuth();
  const idUsuario = usuario?.idUsuario;

  const [conversaciones, setConversaciones] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [mensajesNuevos, setMensajesNuevos] = useState({}); // {idUsuario: true}

  const handleSelect = (conv) => {
    setSeleccionado(conv);
  };

  // Limpiar indicador de mensaje nuevo al seleccionar conversación
  useEffect(() => {
    if (!seleccionado) return;
    setMensajesNuevos(prev => {
      const copy = { ...prev };
      delete copy[seleccionado.idUsuario];
      return copy;
    });
  }, [seleccionado]);

  // Cargar conversaciones iniciales
  useEffect(() => {
    if (!idUsuario) return;

    const fetchConversaciones = async () => {
      try {
        const res = await fetch(`http://localhost:3000/mensaje/conversaciones/${idUsuario}`);
        if (!res.ok) throw new Error("Error al obtener conversaciones");
        const data = await res.json();

        const conversacionesData = (Array.isArray(data) ? data : []).filter(c => c.idUsuario !== idUsuario);
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
        const res = await fetch(`http://localhost:3000/mensaje/conversaciones/${idUsuario}`);
        if (!res.ok) throw new Error("Error al obtener conversaciones");
        const data = await res.json();
        const conversacionesData = (Array.isArray(data) ? data : []).filter(c => c.idUsuario !== idUsuario);
        // console.log("📦 Conversaciones recibidas del backend:", conversacionesData);
        setConversaciones(prev => {
          const nuevosIndicadores = {};

          conversacionesData.forEach(conv => {
            const previa = prev.find(p => p.idUsuario === conv.idUsuario);

            // Comparo por la fecha del último mensaje  

            const fechaPrev = previa?.ultimaFecha;
            const fechaAct = conv?.ultimaFecha;

            if (previa && fechaPrev !== fechaAct) {
              if (seleccionado?.idUsuario !== conv.idUsuario) {
            // console.log("💬 Nuevo mensaje detectado en conversación con idUsuario:", conv.idUsuario, conv);
                nuevosIndicadores[conv.idUsuario] = true;
              }
            }
            // console.log("Comparando:", {
            //   usuario: conv.idUsuario,
            //   fechaPrev,
            //   fechaAct,
            //   conv
            // });
          });

          if (Object.keys(nuevosIndicadores).length > 0) {
            setMensajesNuevos(prevNuevos => ({ ...prevNuevos, ...nuevosIndicadores }));
          }

          return conversacionesData;
        });
      } catch (err) {
        console.error(err);
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
              key={seleccionado.idUsuario} // reinicia componente al cambiar conversación
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
