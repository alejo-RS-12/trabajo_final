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

  // 3️⃣ Alternar favorito (guardar / quitar)
  const toggleFavorito = () => {
    if (!usuarioId) {
      showToast("⚠️ Debes iniciar sesión para usar favoritos");
      return;
    }

    if (!favorito) {
      // 👉 Guardar favorito
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
      // 👉 Quitar favorito
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
    // Construimos la URL de la publicación
    const url = `${window.location.origin}/publicacion/${id}`;
    // Copiamos al portapapeles
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

// Guardar en favoritos (ejemplo usuario id=2)
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
      fetch(`http://localhost:3000/publicacion/${id}`) // tu endpoint real
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
          <p className="subtitulo">
            {publicacion.profesional?.usuario?.nombreCompleto || "Desconocido"}
          </p>

          <Calificacion />

          <p className="descripcion">{publicacion.descripcion}</p>

          <div className="mapa">
            <img src="/crearpub/mapa.JPG" alt="Mapa" />
          </div>

          <h3>Envia un mensaje al prestador</h3>
          <textarea placeholder="Debes iniciar sesión para comentar"></textarea>
          <button className="btn-enviar">Enviar</button>
        </div>
      </div>

      {/* Modales */}
      {mostrarChat && (
        <ChatModal
          isOpen={mostrarChat}
          onClose={() => setMostrarChat(false)}
          receptor={publicacion.profesional?.usuario?.nombreCompleto || "Usuario"}
        />
      )}
      {mostrarDenuncia && (
        <DenunciaModal
          isOpen={mostrarDenuncia}
          onClose={() => setMostrarDenuncia(false)}
          publicacionId={publicacion.idPublicacion}
        />
      )}
    </div>
  
  );
}