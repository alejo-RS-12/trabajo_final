import { useAuth } from "../context/AuthContext";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ToastContainer from "../components/ToastContainer";
import CarruselImagenes from "../components/CarruselImagenes";
import Calificacion from "../components/Calificacion";
import ChatModal from "../components/ChatModal";
import DenunciaModal from "../components/DenunciaModal";
import { apiFetch, API_URL } from "../services/api";

export default function PublicacionPage() {
  const { usuario, token } = useAuth();
  const usuarioId = usuario?.idUsuario;
  const { id } = useParams(); // id de la URL
  //console.log("ID de la publicación:", id);

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

  // Este useEffect para cargar FontAwesome (íconos estrellas).
  // podriamos hacerlo una sola vez en index.html y aprovechaerr en otros componentes / paginas. En <head>:
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

   const handleClick  = async  (n) => {
     try {
    const data = await apiFetch(`/publicacion/${publicacion.idPublicacion}/calificar`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ puntuacion: n }),
  })
  // actualizar promedio en la publicación
    setPromedioCalificacion(Number(data.calificacionPromedio));
  }
  catch(err) { console.error(err);}
};


  useEffect(() => {

    if (usuario === null) {
    console.log("⏳ usuario todavía cargando...");
    return;
  }
  // console.log("useEffect ejecutado");
  // console.log("usuarioId:", usuarioId);
  // console.log("token:", usuario?.token);

  if (!usuarioId || !token) {console.log("⛔ No entra a checkFavorito por falta de datos");return;} 

  const checkFavorito = async () => {
    // console.log("➡ Entró a checkFavorito");
    try {
      const data = await apiFetch(`/usuario/${usuarioId}/favoritos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      //console.log("Favoritos recibidos:", data);

      // Si backend devuelve publicaciones completas → fav.id
      // Si backend devuelve solo IDs → fav
      const idsFavoritos = data.map(fav =>
        fav.idPublicacion ?? fav.id ?? fav
      );

      setFavorito(idsFavoritos.includes(Number(id)));
      //console.log("✔ FAVORITOS DEVUELTOS:", idsFavoritos);
    } catch (err) {
      console.error("Error obteniendo favoritos", err);
      console.warn("Error verificando favoritos:", err);
      setFavorito(false);
    }
  };

  checkFavorito();
}, [id, usuarioId, usuario?.token]);


const toggleFavorito = async () => {
  if (!usuario || !token) {
        console.error("⛔ Debe iniciar sesión para guardar favoritos.");
        showToast("❌ Debes iniciar sesión para guardar favoritos.", "error");
        return; // Detiene la ejecución
    }
  try {
    if (!favorito) {
      // Guardar favorito
      const res = await apiFetch(`/usuario/${usuarioId}/favoritos`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${usuario.token}`,
        },
        body: JSON.stringify({ idPublicacion: Number(id) }),
      });

      // si tu api devuelve algo como { success: false, message: "..." }
      if (res.error) throw new Error(res.message || "Error desconocido");

      setFavorito(true);
      showToast("❤️ Publicación guardada en favoritos");

    } else {
      // Quitar favorito
      const res = await apiFetch(`/usuario/${usuarioId}/favoritos`, {
        method: "DELETE",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario.token}`,
        },
        body: JSON.stringify({ idPublicacion: Number(id) }),
      });

      if (res.error) throw new Error(res.message || "Error desconocido");

      setFavorito(false);
      showToast("💔 Publicación quitada de favoritos");
    }
  } catch (err) {
    console.error("Error de favoritos:", err);
    showToast("❌ " + err.message);
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
    apiFetch(`/usuario/${usuarioId}/favoritos`, {
      method: "POST",
      headers: { "Content-Type": "application/json", 
        Authorization: `Bearer ${usuario.token}`, },
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


// Traemos desde la base de datos
  useEffect(() => {
    if (!publicacionState) {
      apiFetch(`/publicacion/${id}`)
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
  Partido_De_Olavarria: "/imagenes/crearpub/mapa-partido.jpg",
  Olavarría: "/imagenes/crearpub/mapa-olavarria.jpg",
  Sierras_Bayas: "/imagenes/crearpub/mapa-sierrasbayas.jpg",
  Villa_Alfredo_Fortabat: "/imagenes/crearpub/mapa-villaalfredofortabat.jpg",
  Hinojo: "/imagenes/crearpub/mapa-hinojo.jpg",
  Colonia_Hinojo: "/imagenes/crearpub/mapa-coloniahinojo.jpg",
  Sierra_Chica: "/imagenes/crearpub/mapa-sierrachica.jpg",
  };

  const handleEnviarMensaje = async () => {
    if (!mensajeTexto.trim()) {
      showToast("⚠️ Escribe un mensaje antes de enviar");
      return;
    }

    try {
      const data = await apiFetch("/mensaje", {
        method: "POST",
        body: JSON.stringify({
          contenido: mensajeTexto,
          idEmisor: usuarioId,
          idReceptor: publicacion.profesional?.usuario?.idUsuario,
        }),
      });

      setMensajeTexto(""); 
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
      <button className="btn-accion" onClick={() => setMostrarDenuncia(true)} disabled={!usuario}>
      🚩 Denunciar
    </button>
    <button className="btn-accion" onClick={() => setMostrarChat(true)} disabled={!usuario}>
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
                ? publicacion.imagenes.map(img => `${API_URL}/${img.replace(/^\/?/, "")}`)
                : [`/imagenes/placeholder.jpg`] 
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
                  : "/imagenes/crearpub/mapa.JPG"
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
                    : "/imagenes/crearpub/mapa.JPG"
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
            disabled={!usuario} // desactiva el textarea si no está logueado
            value={mensajeTexto}
            onChange={(e) => setMensajeTexto(e.target.value)}
          ></textarea>

          <button
            className="btn-accion"
            disabled={!usuario} // también desactiva el botón si no está logueado
            title={!usuario ? "Inicia sesión para enviar un mensaje" : "Enviar mensaje"}
            onClick={handleEnviarMensaje} 
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