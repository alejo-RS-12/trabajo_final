import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import CategoriaSidebar from "../components/CategoriaSidebar";
import { Link } from "react-router-dom";
import "../assets/css/trabajos.css";

export default function PublicacionesPage({ categorias = {} }) {
  const { usuario } = useAuth();
  const usuarioId = usuario?.idUsuario;
  const [publicaciones, setPublicaciones] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [modoCategorias, setModoCategorias] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  

    // función para formatear ubicaciones
  const formatUbicacion = (ubicacion = "") => {
    return ubicacion.replace(/_/g, " ").toUpperCase();
  };

  // Detecta cambios de tamaño
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Buscar publicaciones por input
  useEffect(() => {
    if (searchTerm.trim() === "") return;

    const controller = new AbortController();

    setCategoriaSeleccionada(null); // limpia categoría seleccionada

    fetch(
      `http://localhost:3000/publicacion/buscar?titulo=${encodeURIComponent(
        searchTerm
      )}`,
      { signal: controller.signal }
    )
      .then((res) => res.json())
      .then((data) => {
        setPublicaciones(data);
        if (isMobile) setModoCategorias(false); // en mobile mostramos resultados en sidebar
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });

    return () => controller.abort();
  }, [searchTerm, isMobile]);
  
  // Click en categoría
  const handleCategoriaClick = (categoria) => {
    setCategoriaSeleccionada(categoria);

    if (isMobile) setModoCategorias(false);

    const variantes = categorias[categoria] || [categoria];
    const query = variantes.join(" ");

    fetch(
      `http://localhost:3000/publicacion/buscar?titulo=${encodeURIComponent(
        query
      )}`
    )
      .then((res) => res.json())
      .then((data) => setPublicaciones(data))
      .catch((err) => console.error(err));
  };

  // Volver a mostrar categorías en mobile
  const handleVolverCategorias = () => {
    setModoCategorias(true);
    setCategoriaSeleccionada(null);
    setSearchTerm("");
    setPublicaciones([]);
  };

  return (
    <div className="contenedor-sitio">
      {/* Sidebar */}
      <CategoriaSidebar
        categorias={Object.keys(categorias)}
        onSearch={setSearchTerm}
        onCategoriaClick={handleCategoriaClick}
        publicaciones={publicaciones}
        categoriaSeleccionada={categoriaSeleccionada}
        modoCategorias={modoCategorias}
        onVolverCategorias={handleVolverCategorias}
        isMobile={isMobile}
      />

      {/* Contenido principal solo desktop */}
      {!isMobile && (
        <div className="contenido-principal">
          {publicaciones.length === 0 ? (
            <p>No hay publicaciones</p>
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
                        state={{ publicacion: pub }}
                        className="post-card"
                        key={pub.idPublicacion}
                      >         
                    <div className="post-img">
                        <img src={imgSrc} alt={pub.titulo} />
                    </div>
                    <div className="post-info">
                      <h4>{pub.titulo}</h4>
                      <p className="ubicacion">Ubicación: {formatUbicacion(pub.ubicacion)}</p>
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
      )}
    </div>
  );
  
}