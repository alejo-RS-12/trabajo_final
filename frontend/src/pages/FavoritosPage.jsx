import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function FavoritosPage() {
  const { usuario } = useAuth();
  const usuarioId = usuario?.idUsuario;
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  

  // función para formatear ubicaciones
  const formatUbicacion = (ubicacion = "") => {
    return ubicacion.replace(/_/g, " ").toUpperCase();
  };

  useEffect(() => {
    if (!usuarioId) return;
    fetch(`http://localhost:3000/usuario/${usuarioId}/favoritos`)
      .then((res) => res.json())
      .then(async (ids) => {
        // El backend devuelve solo IDs → hacemos fetch de cada publicación
        const pubs = await Promise.all(
          ids.map((idPub) =>
            fetch(`http://localhost:3000/publicacion/${idPub}`).then((r) => r.json())
          )
        );
        setPublicaciones(pubs);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando favoritos:", err);
        setLoading(false);
      });
  }, [usuarioId]);

  if (loading) return <p>Cargando favoritos...</p>;

  return (
    <div className="contenedor-sitio">
      <div className="contenido-favoritos">
      <h2>Tus publicaciones guardadas en FAVORITOS </h2>  
        {publicaciones.length === 0 ? (
          <p>No tienes publicaciones guardadas en favoritos</p>
        ) : (
          <div className="publicaciones-grid">
            {publicaciones.map((pub) => {
              const imgSrc =
                pub.imagenes && pub.imagenes.length > 0
                  ? `http://localhost:3000/${pub.imagenes[0].replace(/^\/?/, "")}`
                  : `/imagenes/placeholder.jpg`;

              return (
                <Link
                      to={`/publicacion/${pub.idPublicacion}`}
                      state={{ publicacion: pub }} className="post-card" key={pub.idPublicacion}>
                  <div className="post-img">
                    <img src={imgSrc} alt={pub.titulo} />
                  </div>
                  <div className="post-info">
                    <h4>{pub.titulo}</h4>
                    <p className="ubicacion">
                      Ubicación: {formatUbicacion(pub.ubicacion)}
                    </p>
                    <p className="solicitante">
                      Nombre: {pub.profesional?.usuario?.nombreCompleto}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}