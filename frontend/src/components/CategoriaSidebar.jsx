import { apiFetch, API_URL } from "../services/api";

export default function CategoriaSidebar({
  categorias = [],
  onSearch,
  onCategoriaClick,
  publicaciones = [],
  categoriaSeleccionada,
  modoCategorias,
  onVolverCategorias,
  isMobile,
}) {
  return (
    <aside className="barra-lateral-izquierda">
      {/* Input de búsqueda */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Buscar..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {isMobile ? (
        // Mobile
        modoCategorias ? (
          <ul className="sidebar-content">
            {categorias.map((cat) => (
              <li key={cat} onClick={() => onCategoriaClick(cat)}>
                {cat}
              </li>
            ))}
          </ul>
        ) : (
          <div className="publicaciones-mobile">
            <div className="toolbar-mobile">
              <span>
                {categoriaSeleccionada || "Resultados de búsqueda"}
              </span>
              <button className="btn-accion2" onClick={onVolverCategorias}>+ Categorías</button>
            </div>

            <div className="publicaciones-grid">
              {publicaciones.length === 0 ? (
                <p>No hay publicaciones</p>
              ) : (
                publicaciones.map((pub) => {
                  const imgSrc =
                    pub.imagenes && pub.imagenes.length > 0
                      ? `${API_URL}/${pub.imagenes[0].replace(
                          /^\/?/,
                          ""
                        )}`
                      : `/uploads/publicaciones/placeholder.jpg`;

                  return (
                    <div className="post-card" key={pub.idPublicacion} >
                      <div className="post-img">
                        <a href={`/publicacion/${pub.idPublicacion}`} state={{ publicacion: pub }}>
                          <img src={imgSrc} alt={pub.titulo} />
                        </a>
                      </div>
                      <div className="post-info">
                        <h5>{pub.titulo}</h5>
                        <p className="ubicacion">📍 {pub.ubicacion}</p>
                        <p className="solicitante">
                          👤 {pub.profesional?.usuario?.nombreCompleto}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )
      ) : (
        // Desktop: lista fija
        <ul className="sidebar-content">
          {categorias.map((cat) => (
            <li key={cat} onClick={() => onCategoriaClick(cat)}>
              {cat}
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}