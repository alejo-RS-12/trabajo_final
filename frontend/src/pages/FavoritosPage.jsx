import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiFetch, API_URL } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function FavoritosPage() {
  const { usuario, token } = useAuth();
  const usuarioId = usuario?.idUsuario;
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const estaEnRutaFavoritos = location.pathname === "/favoritos";

  // función para formatear ubicaciones
  const formatUbicacion = (ubicacion = "") => {
    return ubicacion.replace(/_/g, " ").toUpperCase();
  };

   useEffect(() => {
    if (!usuario) {
      showToast("Inicia sesión para continuar", "error");
      navigate("/login", { replace: true }); 
    }
  }, [usuario, navigate]);

  useEffect(() => {
  if (!usuarioId || !token) return;

  const cargarFavoritos = async () => {
    try {
      const data = await apiFetch(`/usuario/${usuarioId}/favoritos`);
      console.log("Favoritos =>", data);

      const idList = data.map(fav => fav.idPublicacion ?? fav);

      const pubs = await Promise.all(
        idList.map(idPub => apiFetch(`/publicacion/${idPub}`))
      );

      setPublicaciones(pubs);
    } catch (err) {
      console.error("Error cargando favoritos:", err);
    } finally {
      setLoading(false);
    }
  };

  cargarFavoritos();
}, [usuarioId, token]);

  if (loading) return <p>Cargando favoritos...</p>;

  return (
    <div className="contenedor-sitio">
      <div className="contenido-favoritos">
      {estaEnRutaFavoritos && (<h3>Tus publicaciones guardadas en FAVORITOS </h3>)}
        {publicaciones.length === 0 ? (
          <p>No tienes publicaciones guardadas en favoritos</p>
        ) : (
          <div className="publicaciones-grid">
            {publicaciones.map((pub) => {
              if (!pub) return null;
              const imgSrc =
                pub.imagenes && pub.imagenes.length > 0
                  ? `${API_URL}/${pub.imagenes[0].replace(/^\/?/, "")}`
                  : `/uploads/publicaciones/placeholder.jpg`;

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