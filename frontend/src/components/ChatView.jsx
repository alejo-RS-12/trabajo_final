// import { useState, useEffect, useRef } from "react";
// import ChatInput from "./ChatInput";

// export default function ChatView({ idEmisor, idReceptor, receptorNombre, onNuevoMensaje = () => {} }) {
//   const [mensajes, setMensajes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const chatWindowRef = useRef(null);

//   // Fetch mensajes desde backend
//   const fetchMensajes = async () => {
//     if (!idEmisor || !idReceptor) return;
//     try {
//       const res = await fetch(`http://localhost:3000/mensaje/conversacion/${idEmisor}/${idReceptor}`);
//       if (!res.ok) throw new Error("Error al cargar mensajes");
//       const data = await res.json();

//       const ordenados = data.sort((a,b) => new Date(a.fecha) - new Date(b.fecha));

//       // Detectar mensajes nuevos
//       if (ordenados.length > mensajes.length) {
//   const nuevo = ordenados[ordenados.length - 1];
//   if (nuevo.emisor?.idUsuario !== idEmisor) {
//     onNuevoMensaje(nuevo);
//   }
// }

//       setMensajes(ordenados);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Polling cada 3s para actualizar mensajes
//   useEffect(() => {
//     fetchMensajes();
//     const interval = setInterval(fetchMensajes, 3000);
//     return () => clearInterval(interval);
//   }, [idEmisor, idReceptor]);

//   // Scroll automático al último mensaje
//   useEffect(() => {
//     const cont = chatWindowRef.current;
//     if (!cont) return;
//     requestAnimationFrame(() => {
//       cont.scrollTo({ top: cont.scrollHeight, behavior: "smooth" });
//     });
//   }, [mensajes, idReceptor]);

//   const handleMessageSent = (nuevo) => {
//     const mensajeConId = {
//       ...nuevo,
//       emisor: { idUsuario: idEmisor },
//       fecha: nuevo.fecha || new Date().toISOString(),
//     };
//     setMensajes(prev => [...prev, mensajeConId]);

//     setTimeout(() => {
//       chatWindowRef.current?.scrollTo({ top: chatWindowRef.current.scrollHeight, behavior: "smooth" });
//     }, 50);
//   };

//   return (
//     <div className="chat-contenedor">
//       <div className="chat-header-panel">
//         <h3>{receptorNombre}</h3>
//       </div>

//       <div className="chat-window" ref={chatWindowRef}>
//         {loading ? (
//           <p className="loading-msg">Cargando conversación...</p>
//         ) : mensajes.length === 0 ? (
//           <p className="sin-mensajes">Aún no hay mensajes con este usuario.</p>
//         ) : (
//           mensajes.map(m => {
//             const isEmisor = m.emisor?.idUsuario === idEmisor;
//             return (
//               <div key={m.idMensaje ?? Math.random()} className={`mensaje ${isEmisor ? "mensaje-emisor" : "mensaje-receptor"}`}>
//                 <div className="mensaje-texto">{m.contenido}</div>
//                 <div className="mensaje-fecha">{m.fecha ? new Date(m.fecha).toLocaleString() : ""}</div>
//               </div>
//             );
//           })
//         )}
//       </div>

//       <ChatInput
//         idEmisor={idEmisor}
//         idReceptor={idReceptor}
//         onSent={handleMessageSent}
//       />
//     </div>
//   );
// }


import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";

export default function ChatView({ idEmisor, idReceptor, receptorNombre, onNuevoMensaje = () => {} }) {
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const chatWindowRef = useRef(null);

  // Ref para saber si ya hicimos scroll al final en esta conversación
  const scrolledRef = useRef(false);

  const fetchMensajes = async () => {
    if (!idEmisor || !idReceptor) return;
    try {
      const res = await fetch(`http://localhost:3000/mensaje/conversacion/${idEmisor}/${idReceptor}`);
      if (!res.ok) throw new Error("Error al cargar mensajes");
      const data = await res.json();
      const ordenados = data.sort((a,b) => new Date(a.fecha) - new Date(b.fecha));

      // Detectar mensajes nuevos para indicador, no para scroll
      if (ordenados.length > mensajes.length) {
        const ultimo = ordenados[ordenados.length - 1];
        if (ultimo.emisor?.idUsuario !== idEmisor) {
          onNuevoMensaje(ultimo);
        }
      }

      setMensajes(ordenados);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Polling cada 3s
  useEffect(() => {
    fetchMensajes();
    const interval = setInterval(fetchMensajes, 3000);
    return () => clearInterval(interval);
  }, [idEmisor, idReceptor]);

  // Scroll al final solo **una vez** al cargar la conversación
  useEffect(() => {
    if (!mensajes.length) return;

    if (!scrolledRef.current) {
      const cont = chatWindowRef.current;
      if (cont) {
        requestAnimationFrame(() => {
          cont.scrollTo({ top: cont.scrollHeight, behavior: "smooth" });
        });
      }
      scrolledRef.current = true; // Marcamos que ya hicimos scroll
    }
  }, [mensajes, idReceptor]);

  const handleMessageSent = (nuevo) => {
    const mensajeConId = {
      ...nuevo,
      emisor: { idUsuario: idEmisor },
      fecha: nuevo.fecha || new Date().toISOString(),
    };
    setMensajes(prev => [...prev, mensajeConId]);

    // Solo hacer scroll si estamos al final
    const cont = chatWindowRef.current;
    if (cont) {
      const cercaDelFinal = cont.scrollHeight - cont.scrollTop - cont.clientHeight < 100;
      if (cercaDelFinal) {
        setTimeout(() => {
          cont.scrollTo({ top: cont.scrollHeight, behavior: "smooth" });
        }, 50);
      }
    }
  };

  return (
    <div className="chat-contenedor">
      <div className="chat-header-panel">
        <h3>{receptorNombre}</h3>
      </div>

      <div className="chat-window" ref={chatWindowRef}>
        {loading ? (
          <p className="loading-msg">Cargando conversación...</p>
        ) : mensajes.length === 0 ? (
          <p className="sin-mensajes">Aún no hay mensajes con este usuario.</p>
        ) : (
          mensajes.map(m => {
            const isEmisor = m.emisor?.idUsuario === idEmisor;
            return (
              <div key={m.idMensaje ?? Math.random()} className={`mensaje ${isEmisor ? "mensaje-emisor" : "mensaje-receptor"}`}>
                <div className="mensaje-texto">{m.contenido}</div>
                <div className="mensaje-fecha">{m.fecha ? new Date(m.fecha).toLocaleString() : ""}</div>
              </div>
            );
          })
        )}
      </div>

      <ChatInput idEmisor={idEmisor} idReceptor={idReceptor} onSent={handleMessageSent} />
    </div>
  );
}