import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PublicacionesUsuario from "../components/PublicacionesUsuario";
import FavoritosPage from "./FavoritosPage";
import { apiFetch, API_URL } from "../services/api";
import "../assets/css/usuario.css";

export default function Usuario() {
  const { usuario, token } = useAuth();
  const idUsuario = usuario?.idUsuario;

  const [datosUsuario, setDatosUsuario] = useState(null);
  const [profesional, setProfesional] = useState(null);
  const [publicaciones, setPublicaciones] = useState([]);
  const [profileImage, setProfileImage] = useState("/imagenes/icono-user.png");
  const navigate = useNavigate();

  useEffect(() => {
    if (!idUsuario) return;

    // Obtener datos del usuario
    const fetchUsuario = async () => {
    try {
      const data = await apiFetch(`/usuario/${idUsuario}`);
      setDatosUsuario(data);

        // Verificar imagen del propio usuario
        if (data.imagenes && data.imagenes.length > 0) {
          setProfileImage(`${API_URL}${data.imagenes[0]}`);
        }

        // Si el usuario es profesional, traer sus datos y publicaciones
        if (data.rol?.nombreRol === "Profesional") {
          const prof = await apiFetch(`/profesional/usuario/${data.idUsuario}`);
        setProfesional(prof);

        // Traer publicaciones del profesional
        const pubs = await apiFetch(`/publicacion/profesional/${prof.idProfesional}`);
        setPublicaciones(pubs);
      }
      } catch (err) {
      console.error(err);
    }
  };

  fetchUsuario();
  }, [idUsuario]);

  if (!datosUsuario)
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Cargando...</p>;

  return (
    <div className="usuario-page">
      <div className="usuario-container">
        {/* 🧍 Perfil */}
        <div className="perfil-section">
          <div className="perfil-header">
            <img
              src={profileImage}
              alt="Foto de perfil"
              className="perfil-img"
              onError={(e) => (e.target.src = "/imagenes/icono-user.png")}
            />
            <div> 
              <h2>{datosUsuario.nombreCompleto}</h2>
              {<p>Nombre de Usuario: {datosUsuario.nombreDeUsuario}</p>}
              {<p><strong>E-mail: {datosUsuario.email}</strong></p>}
              {<p>Rol: {datosUsuario.rol.nombreRol}</p>}
              <button
                  className="btn-editar"
                  onClick={() => navigate("/configuracion-de-usuario")}
                >
                  Actualiza tus datos
                </button>
            </div>
          </div>


          {/* Panel derecho solo si es profesional */}
          {profesional && (
            <div className="perfil-profesional">
              <h3>Datos del profesional</h3>
              <p><strong>Matrícula:</strong> {profesional.matricula}</p>
              <p><strong>Descripción:</strong> {profesional.descripcion}</p>
              <p>
                <strong>Calificación promedio:</strong>{" "}
                {profesional.calificacionPromedio} ⭐
              </p>
              <p>
                <strong>Cantidad de calificaciones:</strong>{" "}
                {profesional.cantidadCalificaciones}
              </p>
                {profesional.profesiones && profesional.profesiones.length > 0 ? (
                                 
                  <div className="lista-profesiones">
                    <strong>Profesiones:</strong>
                    <ul>
                      {profesional.profesiones.map((p) => (
                        <li key={p.idProfesion}>{p.profesion?.nombre}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p>No tiene profesiones asignadas.</p>
                )}
              <button
                  className="btn-editar"
                  onClick={() => navigate("/crear-publicacion")}
                >
                  Crear / Editar publicación
                </button>
              </div>
          )}
        </div>

        {/* Favoritos */}
        <div className="favoritos-section">
          <h3>Publicaciones favoritas</h3>
            <FavoritosPage />
        </div>

        {/* Publicaciones propias (solo profesional) */}
        {profesional && (
          <div className="publicaciones-section">
            <h3>Mis publicaciones</h3>
            {publicaciones.length > 0 ? (
              <PublicacionesUsuario publicaciones={publicaciones} />
            ) : (
              <p>No tenés publicaciones activas.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}