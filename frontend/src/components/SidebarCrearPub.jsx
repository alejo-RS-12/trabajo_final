import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SidebarCrearPub({
  modo,
  setModo,
  usuario,
  categoriaSeleccionada,
  titulo,
  setTitulo,
  descripcion,
  setDescripcion,
  ubicacion,
  setUbicacion,
  fotos,
  setFotos,
  handleFileChange,
  removeFoto,
  publicar,
  setCategoriaSeleccionada,
  editandoId,
  setEditandoId,
  editarPublicacion,
  eliminarPublicacion,
  isMobile,
  publicaciones,
}) {
  // Toggles para que en sidebar se desplieguen los menues
  const [showCategorias, setShowCategorias] = useState(false);
  const [showTus, setShowTus] = useState(false);

  const categorias = ["Trabajo", "Formación", "Bienestar"];

  function cancelar() {
  setTitulo("");
  setDescripcion("");
  setUbicacion("");
  setFotos([]);
  setEditandoId(null);
  setCategoriaSeleccionada(null);
  setModo("menu"); 
  } 

  return (
    <aside className="barra-lateral-izquierda">
      <div className="sidebar-header">
        <h3>Menú publicaciones</h3>
      </div>

      {/* Menú principal (desktop y cuando toca volver desde "tus") */}
      {(modo === "menu" || (!isMobile && modo === "tus")) &&  (
        <div className="sidebar-content">
          <ul>
            <li href="#" onClick={(e) => {e.preventDefault();
                  if (isMobile) {
                    setShowCategorias(!showCategorias);
                     if (!showCategorias) setShowTus(false);
                  } else {
                    setModo("menu");           
                    setCategoriaSeleccionada(null);
                  }
                }}
              >
                Crear publicación
              </li>
            <li
        onClick={(e) => {
          e.preventDefault();
          if (isMobile) {
            // Mobile → tus publicaciones en sidebar
            setShowTus(!showTus);
             if (!showTus) setShowCategorias(false);
          } else {
            // Desktop → tus publicaciones en main
            setModo("tus");
          }
        }}
      >
        Tus publicaciones
      </li>
            <li> <Link to="/trabajos">Volver a tu perfil</Link> </li>
          </ul>
        </div>
      )}

  {/* Categorías (solo mobile, debajo del menú) */}
      {isMobile && showCategorias && (
        <div id="menu-categorias" className="sidebar-content">
          <h3>Categorías</h3>
          <ul>
          {categorias.map((cat) => (
            <li
              key={cat}
              onClick={() => {
                setModo("crear");
                setCategoriaSeleccionada(cat);
                setShowCategorias(false); 
              }}
            >
              {cat}
            </li>
          ))}
            </ul>
        </div>
      )}

       {/* Tus publicaciones (solo mobile) */}
      {isMobile && showTus && !editandoId && (
        <div id="sidebar-publicaciones">
          <h3>Tus publicaciones</h3>
          {publicaciones.length === 0 ? (
            <p>No hay publicaciones todavía</p>
          ) : (
            publicaciones.map((pub) => (
              <div key={pub.idPublicacion} className="card">
                <img
                      src={pub.imagenes?.[0]
                ? (typeof pub.imagenes[0] === "string"
                    ? (pub.imagenes[0].startsWith("/uploads")
                        ? `http://localhost:3000${pub.imagenes[0]}` 
                        : pub.imagenes[0])
                    : pub.imagenes[0].url)
                : "/crearpub/placeholder.jpg"}
                      alt={pub.titulo}
                    />
                <h4>{pub.titulo}</h4>
                <p className="solicitante">
                  Nombre: {pub.profesional?.usuario?.nombreCompleto}
                </p>
                <button className="buttonEditar" type="button" onClick={() => editarPublicacion(pub)}>
                  ✏️
                </button>
                <button className="buttonEditar" type="button" onClick={() => eliminarPublicacion(pub.idPublicacion)}               >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Formulario */}
      {(modo === "crear" || modo === "editar") && categoriaSeleccionada && (
        <div id="formulario-publicacion">
          <h3>{editandoId ? "Editar publicación" : "Nueva publicación"}</h3>

          <p>
            <strong>Usuario:</strong>{" "}
            <span id="nombre-profesional">
              {usuario?.nombreCompleto || "Cargando..."}
            </span>
          </p>

          <form className="trabajos-form" onSubmit={publicar}>
            <label>Título</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Escribe un título..."
            />

            <label>Descripción</label>
            <textarea
              rows="4"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Escribe la descripción..."
            ></textarea>

            <label htmlFor="ubicacion">Ubicación</label>
            <select
              className="select-stilo"
              id="ubicacion"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              required
            >
              <option value="">-- Selecciona la zona de tu servicio --</option>
              <option value="Partido_De_Olavarria">Olavarría y la zona</option>
              <option value="Olavarría">Ciudad de Olavarría</option>
              <option value="Sierras_Bayas">Sierras Bayas</option>
              <option value="Villa_Alfredo_Fortabat">Villa Alfredo Fortabat</option>
              <option value="Hinojo">Hinojo</option>
              <option value="Colonia_Hinojo">Colonia Hinojo</option>
              <option value="Sierra_Chica">Sierra Chica</option>
            </select>

            <div className="upload-container">
              <div className="upload-header">
                Fotos <span>{fotos.length}/10</span> - Máx 10 fotos
              </div>

              <div id="preview" className="preview">
                {fotos.map((foto, index) => (
                  <div key={index} className="thumb">
                    <img
                      src={
                        foto instanceof File
                          ? URL.createObjectURL(foto) : foto.startsWith("/uploads") ? `http://localhost:3000${foto}` 
                          : foto
                      }
                      alt={`foto-${index}`}
                    />
                    <button type="button" onClick={() => removeFoto(index)}>
                      ×
                    </button>
                  </div>
                ))}

                {fotos.length < 10 && (
                  <label className="add-photo">
                    <span>＋</span>
                    <p>Agregar foto</p>
                    <input
                      type="file"
                      hidden
                      multiple
                      accept="image/*"
                      onChange={handleFileChange} className="oculto"
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="form-buttons">
              <button type="submit" id="publicar-btn">
                {editandoId ? "Guardar cambios" : "Publicar"}
              </button>
              <button type="button" id="cancelar-btn" onClick={cancelar}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tus publicaciones (mobile en sidebar, desktop en main) */}
     {modo === "tus" && isMobile && (
  <div id="sidebar-publicaciones">
    <h3>Tus publicaciones</h3>
    {publicaciones.length === 0 ? (
      <p>No hay publicaciones todavía</p>
    ) : (
      publicaciones.map((pub) => (
        <div key={pub.idPublicacion} className="card">
          <img
            src={pub.imagenes?.[0] ? pub.imagenes[0] : "../src/assets/crearpub/placeholder.jpg"}
            alt={pub.titulo}
          />
          <h4>{pub.titulo}</h4>
          <p className="solicitante">Nombre: {pub.profesional?.usuario?.nombreCompleto}</p>
          <button className="buttonEditar" type="button" onClick={() => editarPublicacion(pub)}>
            ✏️
          </button>
          <button className="buttonEditar" type="button" onClick={() => eliminarPublicacion(pub.idPublicacion)}>
            🗑️
          </button>
        </div>
      ))
    )}
  </div>
  )
}
    </aside>
  );
}