import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ConfirmModal from "../components/ConfirmModal";
import { apiFetch, API_URL } from "../services/api";
import "../assets/css/admin.css";

export default function AdminPanel() {
  const [selectedOption, setSelectedOption] = useState("usuarios");
  const [usuarios, setUsuarios] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  const [confirmData, setConfirmData] = useState(null); 
  const [itemToDelete, setItemToDelete] = useState(null);
  const { usuario } = useAuth();
  const usuarioId = usuario?.idUsuario;
  const navigate = useNavigate();
    useEffect(() => {
        if (!usuario) return;

        if (usuario.rol.idRol !== 1) {
          showToast("❌ Su rol de usuario no le permite acceder", "error");
          navigate("/trabajos");
        }
      }, [usuario, navigate]);

  // Cargar usuario y publicaciones
    const cargarDatos = async () => {
        try {
          const datosUsuarios = await apiFetch(`/usuario`);
          setUsuarios(datosUsuarios);
  
          const pubs = await apiFetch("/publicacion");
          setPublicaciones(dataPubs);

        } catch (err) {
          showToast("Error cargando datos del panel admin:", err);
        }
      };
   
    useEffect(() => {
    cargarDatos();
       }, []);


    const confirmarEliminacion = (tipo, id) => {
    setItemToDelete({ tipo, id });

    setConfirmData({
      message:
        tipo === "usuario"
          ? "¿Seguro que querés eliminar este usuario?"
          : "¿Seguro que querés eliminar esta publicación?",
    });
  };


  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    const { tipo, id } = itemToDelete;

    try {
      const endpoint =
        tipo === "usuario"
          ? `${API_URL}/usuario/${id}`
          : `${API_URL}/publicacion/${id}`;

      const res = await fetch(endpoint, { method: "DELETE" });

      if (!res.ok) throw new Error("Error al eliminar");
 
      await cargarDatos();

    } catch (err) {
      showToast("Error eliminando:", "error");
    }
    setConfirmData(null);
    setItemToDelete(null);
  };

  const handleCancelDelete = () => {
    setConfirmData(null);
    setItemToDelete(null);
  };


  const renderTable = () => {
    switch (selectedOption) {
      case "usuarios":
        return (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.idUsuario}>
                  <td>{u.idUsuario}</td>
                  <td>{u.nombreCompleto}</td>
                  <td>{u.email}</td>
                  <td>
                    <button className="btn-eliminar" onClick={() => confirmarEliminacion("usuario", u.idUsuario)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "publicaciones":
        return (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Autor</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {publicaciones.map((p) => (
                <tr key={p.idPublicacion}>
                  <td>{p.idPublicacion}</td>
                  <td>{p.titulo}</td>
                  <td>{p.profesional.usuario.nombreCompleto}</td>
                  <td>
                    <button className="btn-eliminar" onClick={() =>
                        confirmarEliminacion("publicacion", p.idPublicacion)
                      }>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );     
      default:
        return null;
    }
  };

  

  return (
    <div className="admin-panel">
      <main className="admin-content">
        <h1>Panel de Administración</h1>

        <div className="selector">
          <label htmlFor="opciones">Seleccionar vista:</label>
          <select
            id="opciones"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="usuarios">Usuarios</option>
            <option value="publicaciones">Publicaciones</option>
          </select>
        </div>

        <div className="tabla-container">{renderTable()}</div>

        {confirmData && (
          <ConfirmModal
            message={confirmData.message}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </main>
    </div>
  );
}
