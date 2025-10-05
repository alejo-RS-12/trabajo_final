import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import SidebarCrearPub from "./SidebarCrearPub";
import ToastContainer from "./ToastContainer";
import ConfirmModal from "./ConfirmModal";
import "../css/trabajos.css";

export default function CrearPub() {
  const { usuario } = useAuth();
  const usuarioId = usuario?.idUsuario;
  // Modo principal: "menu", "crear", "tus"
  const [modo, setModo] = useState("menu");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  // Datos usuario y profesional
  //const [usuario, setUsuario] = useState(null);
  const [profesional, setProfesional] = useState(null);

  // Publicaciones y formulario
  const [publicaciones, setPublicaciones] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [fotos, setFotos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  // Detecta si es mobile o desktop
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Modal de confirmacion con estilos
  const [confirmData, setConfirmData] = useState(null);

  const mapaUbicaciones = {
  Partido_De_Olavarria: "/crearpub/mapa-partido.jpg",
  Olavarría: "/crearpub/mapa-olavarria.jpg",
  Sierras_Bayas: "/crearpub/mapa-sierrasbayas.jpg",
  Villa_Alfredo_Fortabat: "/crearpub/mapa-villaalfredofortabat.jpg",
  Hinojo: "/crearpub/mapa-hinojo.jpg",
  Colonia_Hinojo: "/crearpub/mapa-coloniahinojo.jpg",
  Sierra_Chica: "/crearpub/mapa-sierrachica.jpg",
  }

    // función para formatear ubicaciones
  const formatUbicacion = (ubicacion = "") => {
    return ubicacion.replace(/_/g, " ").toUpperCase();
  };

  // Cargar usuario y profesional
  useEffect(() => {
    async function cargarDatos() {
      try {
        const resUser = await fetch(`http://localhost:3000/usuario/${usuarioId}`);
        const user = await resUser.json();
       // setUsuario(user);

        if (user.rol.idRol !== 3 && user.rol.idRol !== 1) {
          showToast("Su usuario no puede crear publicaciones");
          window.location.href = "/perfil";
          return;
        }

        const resProf = await fetch(
          `http://localhost:3000/profesional/usuario/${user.idUsuario}`
        );
        const prof = await resProf.json();
        setProfesional(prof);

        const resPubs = await fetch(
          `http://localhost:3000/publicacion/profesional/${prof.idProfesional}`
        );
        const pubs = await resPubs.json();
        setPublicaciones(pubs);
      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    }
    cargarDatos();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  

  // Handlers de fotos
  function handleFileChange(e) {
    const files = Array.from(e.target.files).slice(0, 10 - fotos.length);
    setFotos([...fotos, ...files]);
  }

  function removeFoto(index) {
    setFotos(fotos.filter((_, i) => i !== index));
  }

  // Publicar o editar
  async function publicar(e) {
    e.preventDefault();
    if (!titulo.trim() || !descripcion.trim() || !ubicacion) {
      showToast("Todos los campos son obligatorios");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("ubicacion", ubicacion);
      formData.append("descripcion", descripcion);
      formData.append("estado", "activa");
      formData.append("idProfesional", profesional.idProfesional);

      fotos.forEach((foto) => {
        if (foto instanceof File) formData.append("imagenes", foto);
      });

      const url = editandoId
        ? `http://localhost:3000/publicacion/${editandoId}`
        : "http://localhost:3000/publicacion";
      const method = editandoId ? "PATCH" : "POST";

      const res = await fetch(url, { method, body: formData });
      if (!res.ok) throw new Error("Error en publicar");

      showToast(editandoId ? "Publicación actualizada ✅" : "Publicación creada ✅");

      // Reset formulario
      setModo("menu");
      setCategoriaSeleccionada(null);
      setTitulo("");
      setDescripcion("");
      setUbicacion("");
      setFotos([]);
      setEditandoId(null);

      // Recargar publicaciones
      const resPubs = await fetch(
        `http://localhost:3000/publicacion/profesional/${profesional.idProfesional}`
      );
      const pubs = await resPubs.json();
      setPublicaciones(pubs);
    } catch (err) {
      console.error("Error publicar:", err);
      showToast("No se pudo publicar ❌");
    }
  }

  function editarPublicacion(pub) {
    setCategoriaSeleccionada(pub.categoria || "null");
    setModo("crear");
    setEditandoId(pub.idPublicacion);
    setTitulo(pub.titulo || "");
    setDescripcion(pub.descripcion || "");
    setUbicacion(pub.ubicacion || "");
    setFotos(pub.imagenes || []);  
  }

    function eliminarPublicacion(id) {
  setConfirmData({
    id,
    message: "¿Estás seguro de que quieres eliminar esta publicación?",
  });
}

    async function handleConfirmDelete() {
      const id = confirmData.id;
      try {
            const res = await fetch(`http://localhost:3000/publicacion/${id}`, {
              method: "DELETE",
            });

            if (!res.ok) throw new Error("Error al eliminar la publicación");

            setPublicaciones((prevPubs) =>
              prevPubs.filter((pub) => pub.idPublicacion !== id)
            );

            showToast("Publicación eliminada ✅");
          } catch (err) {
            console.error("Error eliminando publicación:", err);
            showToast("No se pudo eliminar la publicación ❌");
          }
          console.log("Eliminar publicación:", id);
        
      setConfirmData(null);
    }

    function handleCancelDelete() {
      setConfirmData(null);
    }

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
      {/* Sidebar */}
      <SidebarCrearPub

  modo={modo}
  setModo={setModo}
  usuario={usuario}
  profesional={profesional}
  categoriaSeleccionada={categoriaSeleccionada}
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
  setCategoriaSeleccionada={setCategoriaSeleccionada}
  editandoId={editandoId}
  setEditandoId={setEditandoId}
  editarPublicacion={editarPublicacion}
  eliminarPublicacion={eliminarPublicacion}
  isMobile={isMobile}
  publicaciones={publicaciones}
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
                      src="/crearpub/trabajo.jpg"
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
                      src="/crearpub/formacion.jpg"
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
                      src="/crearpub/bienestar.jpg"
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
        ? `http://localhost:3000${fotos[0]}` : fotos[0]) : "/crearpub/placeholder.jpg"}
                  alt="Imagen principal"
                />
              </div>
              <div id="vista-previa">
                <h2>{titulo || categoriaSeleccionada}</h2>
                <h4>{usuario?.nombre}</h4>
                <p>{descripcion || "La descripción aparecerá aquí."}</p>
                <div id="vp-mapa" className="mapa-previa">
                  <img
                    src={ubicacion && mapaUbicaciones[ubicacion] ? mapaUbicaciones[ubicacion] : "/crearpub/mapa.JPG"}
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
              ? `http://localhost:3000${pub.imagenes[0]}` // 👈 ajustá el host si tu backend corre en otro puerto/dominio
              : pub.imagenes[0])
          : pub.imagenes[0].url)
      : "/crearpub/placeholder.jpg"}
            alt={pub.titulo}
          />
          </div>
          <div className="post-info">
          <h4>{pub.titulo}</h4>
          <p className="ubicacion">Ubicación: {formatUbicacion(pub.ubicacion)}</p>
          <p className="solicitante">Nombre: {pub.profesional?.usuario?.nombreCompleto}</p>
          <button type="button" onClick={() => editarPublicacion(pub)}>
            ✏️
          </button>
          <button type="button" onClick={() => eliminarPublicacion(pub.idPublicacion)}>
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