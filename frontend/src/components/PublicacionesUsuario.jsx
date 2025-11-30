import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch, API_URL } from "../services/api"; 

export default function PublicacionesUsuario({ ids = [], publicaciones = [] }) {
  const [pubs, setPubs] = useState([]);

  useEffect(() => {
    // 🔹 Si se pasaron publicaciones directamente, las usamos
    if (publicaciones.length > 0) {
      setPubs(publicaciones);
      return;
    }

    // 🔹 Si se pasaron IDs de publicaciones (favoritos)
    const fetchByIds = async () => {
      try {
        const resultados = await Promise.all(
          ids.map(async (id) => {
            try {
              const data = await apiFetch(`/publicacion/${id}`);
             return data;
            } catch {
              return null;
            }
          })
        );
        setPubs(resultados.filter((p) => p !== null));
      } catch (error) {
        console.error("Error al cargar favoritos:", error);
      }
    };

    if (ids.length > 0) fetchByIds();
  }, [ids, publicaciones]);

  if (pubs.length === 0) return <p>No hay publicaciones para mostrar.</p>;

  const formatUbicacion = (ubicacion) =>
    ubicacion ? ubicacion.replace(/_/g, " ") : "Sin ubicación";

  return (
    <div className="contenido-p">
      <div className="publicaciones-grid">
        {pubs.map((pub) => {
          const imgSrc =
            pub.imagenes && pub.imagenes.length > 0
              ? `${API_URL}/${pub.imagenes[0].replace(/^\/?/, "")}`
              : `/imagenes/placeholder.jpg`;

          return (
            <Link
              to={`/publicacion/${pub.idPublicacion}`}
              state={{ publicacion: pub }}
              className="post-card"
              key={pub.idPublicacion}
            >
              <div className="post-img">
                <img src={imgSrc} alt={pub.titulo} />
              </div>
              <div className="post-info">
                <h4>{pub.titulo}</h4>
                <p className="ubicacion">
                  Ubicación: {formatUbicacion(pub.ubicacion)}
                </p>
                <p className="solicitante">
                  Nombre: {pub.profesional?.usuario?.nombreCompleto || "Anónimo"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}