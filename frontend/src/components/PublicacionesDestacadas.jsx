// // components/Publicaciones.tsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PublicacionesDestacadas() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Función para formatear la ubicación
  const formatUbicacion = (ubicacion) => {
    if (!ubicacion) return "Sin ubicación";
    return ubicacion.replace(/_/g, " ");
  };

  // useEffect para montar el componente
  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const response = await fetch("http://localhost:3000/publicacion");
        if (!response.ok) {
          throw new Error("Error al cargar las publicaciones");
        }
        const data = await response.json();
        
        // Agrupar por profesional (una publicación por profesional)
      const agrupadas = Object.values(
        data.reduce((acc, pub) => {
          const prof = pub.profesional;
          if (!prof?.idProfesional) return acc;

          const idProf = prof.idProfesional;
          const promedio = parseFloat(prof.calificacionPromedio || 0);
          const cantidad = prof.cantidadCalificaciones || 0;

          // Si no hay una publicación guardada, o esta tiene mejor promedio, o más opiniones
          if (
            !acc[idProf] ||
            promedio > parseFloat(acc[idProf].profesional.calificacionPromedio || 0) ||
            (
              promedio === parseFloat(acc[idProf].profesional.calificacionPromedio || 0) &&
              cantidad > (acc[idProf].profesional.cantidadCalificaciones || 0)
            )
          ) {
            acc[idProf] = pub;
          }

          return acc;
        }, {})
      );

      // Ordenar de mayor a menor calificación promedio (y luego por cantidad de opiniones)
      agrupadas.sort((a, b) => {
        const promA = parseFloat(a.profesional?.calificacionPromedio || 0);
        const promB = parseFloat(b.profesional?.calificacionPromedio || 0);
        const cantA = a.profesional?.cantidadCalificaciones || 0;
        const cantB = b.profesional?.cantidadCalificaciones || 0;

        // Primero ordena por promedio
        if (promB !== promA) return promB - promA;
        // Si empatan, por cantidad de calificaciones
        return cantB - cantA;
      });

      // Mostrar solo las 8 mejores
      const top8 = agrupadas.slice(0, 8);

      setPublicaciones(agrupadas);

      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicaciones();
  }, []);

  // Si está cargando o tarda la respuesta del servidor
  if (loading) return <p>Cargando publicaciones...</p>;

  // Si no hay publicaciones
  if (publicaciones.length === 0) return <p>No hay publicaciones</p>;

  
  return (
    <div className="contenido-p">
      <h3 className="Destacados">publicaiones Destacadas</h3>;
        <div className="publicaciones-grid">
          {publicaciones.map((pub) => {
            const imgSrc =
              pub.imagenes && pub.imagenes.length > 0
                ? `http://localhost:3000/${pub.imagenes[0].replace(/^\/?/, "")}`
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