import { useAuth } from "../context/AuthContext";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ToastContainer from "./ToastContainer";
import CarruselImagenes from "./CarruselImagenes";
import Calificacion from "./Calificacion";
import ChatModal from "./ChatModal";
import DenunciaModal from "./DenunciaModal";
import "../css/trabajos.css";

export default function PublicacionPage() {
  const { usuario } = useAuth();
  const usuarioId = usuario?.idUsuario;
  const { id } = useParams(); // id de la URL
  console.log("ID de la publicación:", id);

  const location = useLocation();
  const publicacionState = location.state?.publicacion;

  const [mostrarChat, setMostrarChat] = useState(false);
  const [mostrarDenuncia, setMostrarDenuncia] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [publicacion, setPublicacion] = useState(publicacionState || null);
  const [loading, setLoading] = useState(!publicacionState);
  const [favorito, setFavorito] = useState(false); 
  const [mapaGrande, setMapaGrande] = useState(false);
  const [mensajeTexto, setMensajeTexto] = useState("");
  const [promedioCalificacion, setPromedioCalificacion] = useState(
  Number(publicacion?.profesional?.calificacionPromedio) || 0
);

  // Este useEffect para cargar FontAwesome (íconos estrellas). Lo ideal sería hacerlo una sola vez en index.html y
  // lo podriamos aprovechaerr en otros componentes / paginas. Habria que agregar la siguiente lienea en <head>:
  // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
  // y de esa forma no tener que cargarlo en este ni en cada componente que use iconos. 
        useEffect(() => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }, []);

   const handleClick = (n) => {
  fetch(`http://localhost:3000/publicacion/${publicacion.idPublicacion}/calificar`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ puntuacion: n }),
  })
  .then(res => res.json())
  .then(data => {
    // actualizar promedio en la publicación
    setPromedioCalificacion(Number(data.calificacionPromedio));
  })
  .catch(err => console.error(err));
};


  useEffect(() => {
  if (!usuarioId) return;

  const checkFavorito = async () => {
    try {
      const res = await fetch(`http://localhost:3000/usuario/${usuarioId}/favoritos`);
      if (!res.ok) throw new Error("No se pudieron obtener favoritos");
      const data = await res.json();

      // Ajusta según lo que devuelva tu backend:
      // Si devuelve [{idPublicacion: 1}, ...] → data.map(f => f.idPublicacion)
      // Si devuelve [1, 2, 3] → data directamente
      const idsFavoritos = data.map(fav => fav.idPublicacion ?? fav);
      setFavorito(idsFavoritos.includes(Number(id)));
    } catch (err) {
      console.warn(err);
      setFavorito(false);
    }
  };

  checkFavorito();
}, [id, usuarioId]);

  // Alternar favorito (guardar / quitar)
  const toggleFavorito = () => {
    if (!usuarioId) {
      showToast("⚠️ Debes iniciar sesión para usar favoritos");
      return;
    }

    if (!favorito) {
      // Guardar favorito
      fetch(`http://localhost:3000/usuario/${usuarioId}/favoritos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idPublicacion: Number(id) }),
      })
        .then((res) => {
          if (!res.ok) throw new Error();
          setFavorito(true);
          showToast("❤️ Publicación guardada en favoritos");
        })
        .catch(() => showToast("❌ Error al guardar en favoritos"));
    } else {
      // Quitar favorito
      fetch(`http://localhost:3000/usuario/${usuarioId}/favoritos`, {
  method: "DELETE",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ idPublicacion: Number(id) }),
})
  .then((res) => {
    if (!res.ok) throw new Error();
    setFavorito(false);
    showToast("💔 Publicación quitada de favoritos");
  })
  .catch(() => showToast("❌ Error al quitar favorito"));
    }
  };

  const handleCompartir = () => {
    // URL de la publicación
    const url = `${window.location.origin}/publicacion/${id}`;
    // Copia al portapapeles
    navigator.clipboard.writeText(url)
      .then(() => {
        setCopiado(true);
        showToast("✅ Link de la publicación copiado");
      })
      .catch((err) => {
        console.error("Error al copiar:", err);
        showToast("❌ No se pudo copiar el link");
      });
}

// Guardar en favoritos (ejemplo usuario id=${usuarioId})
  const handleGuardar = () => {
    fetch(`http://localhost:3000/usuario/${usuarioId}/favoritos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idPublicacion: Number(id) }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al guardar favorito");
        return res.json();
      })
      .then(() => {
        showToast("❤️ Publicación guardada en favoritos");
      })
      .catch(() => {
        showToast("❌ No se pudo guardar en favoritos");
      });
  };


// Si no viene la publicación desde location.state, la traemos desde la base de datos
  useEffect(() => {
    if (!publicacionState) {
      fetch(`http://localhost:3000/publicacion/${id}`) // endpoint real
        .then(res => {
          if (!res.ok) throw new Error("No se encontró la publicación");
          return res.json();
        })
        .then(data => {
          setPublicacion(data);
          setLoading(false);
        })
        .catch(() => {
          setPublicacion(null);
          setLoading(false);
        });
    }
  }, [id, publicacionState]);

  if (loading) return <p>Cargando publicación...</p>;

  if (!publicacion) {
    return <p>No se encontró la publicación.</p>;
  }

  // para cargar los mapas
  const mapaUbicaciones = {
  Partido_De_Olavarria: "/crearpub/mapa-partido.jpg",
  Olavarría: "/crearpub/mapa-olavarria.jpg",
  Sierras_Bayas: "/crearpub/mapa-sierrasbayas.jpg",
  Villa_Alfredo_Fortabat: "/crearpub/mapa-villaalfredofortabat.jpg",
  Hinojo: "/crearpub/mapa-hinojo.jpg",
  Colonia_Hinojo: "/crearpub/mapa-coloniahinojo.jpg",
  Sierra_Chica: "/crearpub/mapa-sierrachica.jpg",
  };

  const handleEnviarMensaje = async () => {
    if (!mensajeTexto.trim()) {
      showToast("⚠️ Escribe un mensaje antes de enviar");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/mensaje", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contenido: mensajeTexto,
          idEmisor: usuarioId,
          idReceptor: publicacion.profesional?.usuario?.idUsuario,
        }),
      });

      if (!res.ok) throw new Error("Error al enviar mensaje");

      setMensajeTexto(""); // limpiar textarea
      showToast("✅ Mensaje enviado correctamente");
    } catch (err) {
      console.error(err);
      showToast("❌ No se pudo enviar el mensaje");
    }
  };

  return (
    <div className="pagina">
      {/* Barra superior */}
      <div className="barra-superior">
  <div className="acciones-superior">
    <button className="btn-volver" onClick={() => window.history.back()}>
      ← Volver
    </button>
    </div>
    <div className="iconos-superiores">
      <button className="btn-accion" onClick={() => setMostrarDenuncia(true)}>
      🚩 Denunciar
    </button>
    <button className="btn-accion" onClick={() => setMostrarChat(true)}>
      💬 Chat
    </button>
     <button className="btn-accion" onClick={toggleFavorito}> {favorito ? "💔 Quitar" : "❤️ Guardar"} </button>
    <button onClick={handleCompartir} className="btn-accion">🔗 Compartir</button>
  </div>
</div>

      {/* Contenido */}
      <div className="publicacion-wrapper2">
         <ToastContainer />
        {/* Carrusel a la izquierda */}
        <div className="contenido-izquierdo">
          <CarruselImagenes
            imagenes={
              publicacion.imagenes && publicacion.imagenes.length > 0
                ? publicacion.imagenes.map(img => `http://localhost:3000/${img.replace(/^\/?/, "")}`)
                : [`/imagenes/placeholder.jpg`] // imagen por defecto si no hay imágenes
            }
          />
        </div>

        {/* Datos a la derecha */}
        <div className="contenido-derecho">
          <h2 className="titulo-servicio">{publicacion.titulo}</h2>
          <div className="usuario-calificacion">
          <span className="subtitulo">
            {publicacion.profesional?.usuario?.nombreCompleto || "Desconocido"}
          </span>

          <Calificacion valorInicial={Math.floor(promedioCalificacion)} 
            onClick={handleClick}  /> {/* Aquí pasamos el promedio */}
          
          </div>
          <div className="desc-mapa">
          <p className="descripcion">{publicacion.descripcion}</p>

          <div className="mapa" data-ubicacion={publicacion.ubicacion.replace(/_/g, " ") || "desconocida"}>
            <img
              src={publicacion.ubicacion && mapaUbicaciones[publicacion.ubicacion]
                  ? mapaUbicaciones[publicacion.ubicacion]
                  : "/crearpub/mapa.JPG"
              }
              alt={`Mapa de ${publicacion.ubicacion || "cobertura"}`}
              onClick={() => setMapaGrande(true)}
            />
          </div>

          {mapaGrande && (
            <div className="modal-mapa" onClick={() => setMapaGrande(false)}>
              <img
                src={publicacion.ubicacion && mapaUbicaciones[publicacion.ubicacion]
                    ? mapaUbicaciones[publicacion.ubicacion]
                    : "/crearpub/mapa.JPG"
                }
                alt={`Mapa de ${publicacion.ubicacion || "cobertura"}`}
              />
            </div>
          )}
          </div>

          <h3>Envia un mensaje al prestador</h3>
          <textarea
            className="textarea-stilo"
            placeholder={
              usuario
                ? "Escribe aquí un mensaje para el prestador del servicio"
                : "Debes iniciar sesión para comentar"
            }
            disabled={!usuario} // 👉 desactiva el textarea si no está logueado
            value={mensajeTexto}
            onChange={(e) => setMensajeTexto(e.target.value)}
          ></textarea>

          <button
            className="btn-accion"
            disabled={!usuario} // 👉 también desactiva el botón si no está logueado
            title={!usuario ? "Inicia sesión para enviar un mensaje" : "Enviar mensaje"}
            onClick={handleEnviarMensaje} // 👉 aquí llamamos a la función
          >
            Enviar
          </button>
        </div>
      </div>

      {/* Modales */}
      {mostrarChat && (
        <ChatModal
          isOpen={mostrarChat}
          onClose={() => setMostrarChat(false)}
          receptor={publicacion.profesional?.usuario?.nombreCompleto || "Usuario"}
          idReceptor={publicacion.profesional?.usuario?.idUsuario}
          idEmisor={usuario?.idUsuario}
        />
      )}
      {mostrarDenuncia && (
        <DenunciaModal
          isOpen={mostrarDenuncia}
          onClose={() => setMostrarDenuncia(false)}
          publicacionId={publicacion.idPublicacion}
          idEmisor={usuario.idUsuario}
        />
      )}
    </div>
  
  );
}