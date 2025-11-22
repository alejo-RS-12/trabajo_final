import { useState, useEffect } from "react"; 
import { useAuth } from "../context/AuthContext";
import "../assets/css/configuracionUsuario.css";
import { useNavigate } from "react-router-dom";
import CamposComunes from "../components/CamposComunes";
import CamposProfesional from "../components/CamposProfesional";
import ProfileImage from "../components/ProfileImage";
import { apiFetch, API_URL } from "../services/api";

export default function ConfiguracionUsuario() {
  const { usuario, token } = useAuth();
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState("/imagenes/icono-user.png");
  const [selectedFile, setSelectedFile] = useState(null);
  const [profesiones, setProfesiones] = useState([]);
  const navigate = useNavigate();
  //
  // 1) Cargar usuario ó profesional
  //
  useEffect(() => {
  if (!usuario || !usuario.idUsuario) return;

  const fetchDatos = async () => {
    try {
      // Primero traemos al usuario completo con su rol
      const dataUsuario = await apiFetch(`/usuario/${usuario.idUsuario}`);
      let dataFinal = dataUsuario;
      
      // Si tiene rol Profesional, traemos los datos del profesional
      if (dataUsuario.rol?.nombreRol === "Profesional") {
        const dataProf = await  apiFetch(`/profesional/usuario/${usuario.idUsuario}`);
        dataFinal = dataProf; // este incluye al usuario adentro (dataProf.usuario)
      }

      setDatos(dataFinal);

       // Imagen
        const imgs = 
          dataFinal.usuario?.imagenes ||
          dataFinal.imagenes ||
          [];
          
        if (imgs.length > 0) {
          setProfileImage(`${API_URL}${imgs[0]}`);
        }

      } catch (err) {
        console.error("Error cargando datos del usuario:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDatos();
  }, [usuario]);

  //
  // 2) Cargar profesiones
  //
  useEffect(() => {
    const fetchProfesiones = async () => {
      try {
        const lista = await apiFetch("/profesion");
        setProfesiones(lista);
      } catch (err) {
        console.error("Error cargando profesiones:", err);
      }
    };

    fetchProfesiones();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (!datos) return <p>No se encontraron datos del usuario.</p>;

  //
  // 3) Actualizar campos
  //
  const handleChange = (campo, valor, tipo = "usuario") => {
    setDatos((prev) => {
      const nuevo = structuredClone(prev);

      if (tipo === "usuario" && nuevo.usuario) {
        nuevo.usuario[campo] = valor;
      } else if (tipo === "profesional") {
        nuevo[campo] = valor;
      } else {
        nuevo[campo] = valor;
      }

      return nuevo;
    });
  };

  //
  // 4) Subir archivo (único fetch directo permitido)
  //
  async function uploadFileIfNeeded() {
    if (!selectedFile) return null;

    const fd = new FormData();
    fd.append("imagenes", selectedFile);

    const res = await fetch(
      `${API_URL}/usuario/${usuario.idUsuario}/imagenes`,
      { method: "POST", body: fd }
    );

    const data = await res.json().catch(() => null);

    if (!res.ok) throw new Error(data?.message || "Error al subir imagen.");

    return data;
  }

  //
  // 5) Guardar cambios (PATCH)
  //
  const handleGuardar = async () => {
    try {
      let nuevasRutas = null;

      // Subir imagen si corresponde
      if (selectedFile) {
        const uploadResp = await uploadFileIfNeeded();

        nuevasRutas = uploadResp?.imagenes ?? [];

        if (nuevasRutas.length > 0) {
          setProfileImage(`${API_URL}${nuevasRutas[0]}`);

          if (datos.usuario) datos.usuario.imagenes = nuevasRutas;
          else datos.imagenes = nuevasRutas;
        }
      }

      const esProfesional = !!datos.usuario;

      if (esProfesional) {
        // separar payloads
        const { usuario: usuarioPayload, ...profPayload } = datos;

        if (profPayload.profesiones) {
          profPayload.profesionesIds = profPayload.profesiones.map(p =>
            typeof p === "object" ? p.idProfesion : p
          );
          delete profPayload.profesiones;
        }

        // Actualizar profesional
        await apiFetch(`/profesional/${datos.idProfesional}`, {
          method: "PATCH",
          body: JSON.stringify(profPayload),
        });

        // Actualizar usuario
        if (usuarioPayload) {
          await apiFetch(`/usuario/${usuarioPayload.idUsuario}`, {
            method: "PATCH",
            body: JSON.stringify(usuarioPayload),
          });
        }
      } else {
        // usuario común
        await apiFetch(`/usuario/${datos.idUsuario}`, {
          method: "PATCH",
          body: JSON.stringify(datos),
        });
      }

      showToast("Datos actualizados con éxito");
      setSelectedFile(null);
    } catch (err) {
      console.error(err);
      showToast("Error al guardar: " + err.message, "error");
    }
    navigate("/usuario");
  };

  const esProfesional = !!datos.usuario;
  const userData = esProfesional ? datos.usuario : datos;

  return (
    <div className="configuracion-container">
      <div className="configuracion-card">
        <h2>
          {esProfesional
            ? "Ajustes de Perfil Profesional"
            : "Configuración de la cuenta"}
        </h2>

        <ProfileImage
          profileImage={profileImage}
          setProfileImage={setProfileImage}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />

        <CamposComunes datos={userData} onChange={handleChange} />

        {esProfesional && (
          <CamposProfesional
            datos={datos}
            onChange={handleChange}
            profesiones={profesiones}
          />
        )}

        <div className="form-actions">
          <button className="btn-save" onClick={handleGuardar}>
            Guardar cambios
          </button>

          <button
            className="btn-cancel"
            onClick={() => navigate("/usuario")}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}