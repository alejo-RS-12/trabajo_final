import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SidebarCrearPub from "../components/SidebarCrearPub";
import ToastContainer from "../components/ToastContainer";
import ConfirmModal from "../components/ConfirmModal";
import { apiFetch, API_URL } from "../services/api";

export default function CrearPub() {
  const { usuario } = useAuth();
  const usuarioId = usuario?.idUsuario;

  const [modo, setModo] = useState("menu");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const [profesional, setProfesional] = useState(null);
  const [publicaciones, setPublicaciones] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [fotos, setFotos] = useState([]);

  const [editandoId, setEditandoId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [confirmData, setConfirmData] = useState(null);

  const navigate = useNavigate();

  const mapaUbicaciones = {
    Partido_De_Olavarria: "/imagenes/crearpub/mapa-partido.jpg",
    Olavarría: "/imagenes/crearpub/mapa-olavarria.jpg",
    Sierras_Bayas: "/imagenes/crearpub/mapa-sierrasbayas.jpg",
    Villa_Alfredo_Fortabat: "/imagenes/crearpub/mapa-villaalfredofortabat.jpg",
    Hinojo: "/imagenes/crearpub/mapa-hinojo.jpg",
    Colonia_Hinojo: "/imagenes/crearpub/mapa-coloniahinojo.jpg",
    Sierra_Chica: "/imagenes/crearpub/mapa-sierrachica.jpg",
  };

  const formatUbicacion = (u = "") => u.replace(/_/g, " ").toUpperCase();

  /* ================================
          CARGA DE DATOS
     ================================= */
  useEffect(() => {
    if (!usuarioId) return;

    async function cargarDatos() {
      try {
        const user = await apiFetch(`/usuario/${usuarioId}`);

        if (user.rol.idRol !== 3) {
          showToast("❌ Solo los profesionales pueden crear publicaciones", "error");
          navigate("/trabajos");
          return;
        }


        const prof = await apiFetch(`/profesional/usuario/${user.idUsuario}`);
        setProfesional(prof);

        const pubs = await apiFetch(
          `/publicacion/profesional/${prof.idProfesional}`);
        setPublicaciones(pubs);

      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    }

    cargarDatos();
  }, [usuarioId]);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ================================
           MANEJO DE FOTOS
     ================================= */
  function handleFileChange(e) {
    const files = Array.from(e.target.files).slice(0, 10 - fotos.length);
    setFotos(prev => [...prev, ...files]);
  }

  const removeFoto = (i) =>
    setFotos(prev => prev.filter((_, index) => index !== i));

  /* ================================
       CREAR O EDITAR PUBLICACIÓN
     ================================= */
  async function publicar(e) {
    e.preventDefault();
    window.scrollTo(0, 50);

    if (!titulo.trim() || !descripcion.trim() || !ubicacion) {
      showToast("❌ Todos los campos son obligatorios", "error");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("ubicacion", ubicacion);
      formData.append("descripcion", descripcion);
      formData.append("estado", "activa");
      formData.append("idProfesional", profesional.idProfesional);

      const nuevas = fotos.filter(f => f instanceof File);
      const existentes = fotos.filter(f => typeof f === "string");

      nuevas.forEach(f => formData.append("imagenes", f));
      formData.append("imagenesExistentes", JSON.stringify(existentes));

      const endpoint = editandoId
        ? `/publicacion/${editandoId}`
        : `/publicacion`;

      const method = editandoId ? "PATCH" : "POST";

      await apiFetch(endpoint, { method, body: formData });

      showToast(editandoId ? "✅ Publicación actualizada" : "✅ Publicación creada");

      resetFormulario();

      const pubs = await apiFetch(
        `/publicacion/profesional/${profesional.idProfesional}`
      );
      setPublicaciones(pubs);

    } catch (err) {
      console.error("Error publicar:", err);
      showToast("❌ No se pudo publicar");
    }
  }

  function resetFormulario() {
    setModo("menu");
    setCategoriaSeleccionada(null);
    setTitulo("");
    setDescripcion("");
    setUbicacion("");
    setFotos([]);
    setEditandoId(null);
  }

  /* ================================
              EDITAR
     ================================= */
  function editarPublicacion(pub) {
    window.scrollTo(0, 50);
    setModo("crear");
    setEditandoId(pub.idPublicacion);

    setCategoriaSeleccionada(pub.categoria || pub.tipo ||
    (pub.titulo.includes("form") ? "Formación" :
    pub.titulo.includes("bien") ? "Bienestar" :
    "Trabajo"));
    setTitulo(pub.titulo);
    setDescripcion(pub.descripcion);
    setUbicacion(pub.ubicacion);
    setFotos(pub.imagenes || []);
  }

  /* ================================
            ELIMINAR
     ================================= */
  function eliminarPublicacion(id) {
    setConfirmData({
      id,
      message: "¿Estás seguro de que quieres eliminar esta publicación?",
    });
  }

  async function handleConfirmDelete() {
    const id = confirmData.id;

    try {
      await apiFetch(`/publicacion/${id}`, { method: "DELETE" });

      setPublicaciones(prev =>
        prev.filter(pub => pub.idPublicacion !== id)
      );

      showToast("Publicación eliminada ✅");

    } catch (err) {
      console.error("Error eliminando publicación:", err);
      showToast("❌ No se pudo eliminar");
    }

    setConfirmData(null);
  }

  const handleCancelDelete = () => setConfirmData(null);

  /* ================================
               RENDER
     ================================= */
  return (
    <div className="contenedor-sitio">
      <ToastContainer />

      {confirmData && (
        <ConfirmModal
          message={confirmData.message}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      <SidebarCrearPub
        modo={modo}
        setModo={setModo}
        usuario={usuario}
        profesional={profesional}
        publicaciones={publicaciones}
        categoriaSeleccionada={categoriaSeleccionada}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
        titulo={titulo}
        setTitulo={setTitulo}
        descripcion={descripcion}
        setDescripcion={setDescripcion}
        ubicacion={ubicacion}
        setUbicacion={setUbicacion}
        fotos={fotos}
        setFotos={setFotos}
        handleFileChange={handleFileChange}
        removeFoto={removeFoto}
        publicar={publicar}
        editandoId={editandoId}
        setEditandoId={setEditandoId}
        editarPublicacion={editarPublicacion}
        eliminarPublicacion={eliminarPublicacion}
        isMobile={isMobile}
      />



      {/* Contenido principal */}
      <div className="contenido-principal">
        {/* GRID DE CATEGORÍAS */}
        {modo === "menu" && !categoriaSeleccionada && (
          <section id="sectioncateg" className="publicaciones">
            <div className="publicaciones-grid">
              <div className="section-title">
                <h4>Elegí el tipo de publicación:</h4>
              </div>
              {/* Categoría 1 */}
              <div className="post-card">
                <div
                  className="categoria-card desktop-only"
                  data-tipo="Trabajo"
                  onClick={() => {
                    setCategoriaSeleccionada("Trabajo");
                    setModo("crear");
                  }}
                >
                  <div className="post-img">
                    <img
                      src="/imagenes/crearpub/trabajo.jpg"
                      alt="Imagen de trabajos"
                    />
                  </div>
                  <div className="post-info">
                    <h5 className="post-title">Trabajo</h5>
                    <p className="post-location">
                      Crea una publicación para ofrecer tus servicios como profesional.
                    </p>
                  </div>
                </div>
              </div>

              {/* Categoría 2 */}
              <div className="post-card">
                <div
                  className="categoria-card desktop-only"
                  data-tipo="Formación"
                  onClick={() => {
                    setCategoriaSeleccionada("Formación");
                    setModo("crear");
                  }}
                >
                  <div className="post-img">
                    <img
                      src="/imagenes/crearpub/formacion.jpg"
                      alt="Imagen de formación"
                    />
                  </div>
                  <div className="post-info">
                    <h5 className="post-title">Formación</h5>
                    <p className="post-location">
                      Crea una publicación para ofrecer tus propuestas formativas, cursos, carreras.
                    </p>
                  </div>
                </div>
              </div>

              {/* Categoría 3 */}
              <div className="post-card">
                <div
                  className="categoria-card desktop-only"
                  data-tipo="Bienestar"
                  onClick={() => {
                    setCategoriaSeleccionada("Bienestar");
                    setModo("crear");
                  }}
                >
                  <div className="post-img">
                    <img
                      src="/imagenes/crearpub/bienestar.jpg"
                      alt="Imagen de bienestar"
                    />
                  </div>
                  <div className="post-info">
                    <h5 className="post-title">Bienestar</h5>
                    <p className="post-location">
                      Crea una publicación para ofrecer tus servicios relacionados con la salud.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* VISTA PREVIA */}
        {modo === "crear" && categoriaSeleccionada && (
          <div id="publicacion-wrapper">
            <div><h3>Vista previa de tu publicación</h3>
              <div className="card-publicacion">
                <div className="imagen-principal" id="vp-fotos">
                  <img
                    src={fotos[0] ? (fotos[0] instanceof File ? URL.createObjectURL(fotos[0]) : fotos[0]?.startsWith("/uploads")
                      ? `${API_URL}${fotos[0]}` : fotos[0]) : "/imagenes/crearpub/placeholder.jpg"}
                    alt="Imagen principal"
                  />
                </div>
                <div id="vista-previa">
                  <h2>{titulo || categoriaSeleccionada}</h2>
                  <h4>{usuario?.nombre}</h4>
                  <p>{descripcion || "La descripción aparecerá aquí."}</p>
                  <div id="vp-mapa" className="mapa-previa">
                    <img
                      src={ubicacion && mapaUbicaciones[ubicacion] ? mapaUbicaciones[ubicacion] : "/imagenes/crearpub/mapa.JPG"}
                      alt={`Mapa de ${ubicacion || "cobertura"}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}



        {/* TUS PUBLICACIONES */}
        {modo === "tus" && !isMobile && (
          <div id="grid-publicaciones" className="publicaciones-grid">
            {/* <h3>Tus publicaciones</h3> */}
            {publicaciones.length === 0 ? (
              <p>No hay publicaciones todavía</p>
            ) : (
              publicaciones.map((pub) => (
                <div key={pub.idPublicacion} className="post-card">
                  <div className="post-img">
                    <img
                      src={pub.imagenes?.[0]
                        ? (typeof pub.imagenes[0] === "string"
                          ? (pub.imagenes[0].startsWith("/uploads")
                            ? `${API_URL}${pub.imagenes[0]}`
                            : pub.imagenes[0])
                          : pub.imagenes[0].url)
                        : "/imagenes/crearpub/placeholder.jpg"}
                      alt={pub.titulo}
                    />
                  </div>
                  <div className="post-info">
                    <h4>{pub.titulo}</h4>
                    <p className="ubicacion">Ubicación: {formatUbicacion(pub.ubicacion)}</p>
                    <p className="solicitante">Nombre: {pub.profesional?.usuario?.nombreCompleto}</p>
                    <button className="buttonEditar" type="button" onClick={() => editarPublicacion(pub)}>
                      ✏️
                    </button>
                    <button className="buttonEditar" type="button" onClick={() => eliminarPublicacion(pub.idPublicacion)}>
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}