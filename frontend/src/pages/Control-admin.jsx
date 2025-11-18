import { useState } from "react";
import "../assets/css/admin.css";

export default function AdminPanel() {
  const [selectedOption, setSelectedOption] = useState("usuarios");

  // Datos simulados
  const usuarios = [
    { id: 1, nombre: "Alejo", email: "alejo@mail.com" },
    { id: 2, nombre: "Carla", email: "carla@mail.com" },
  ];

  const publicaciones = [
    { id: 1, titulo: "Mi primer post", autor: "Alejo" },
    { id: 2, titulo: "Diseño Web", autor: "Carla" },
  ];

  const mensajes = [
    { id: 1, de: "Carla", para: "Alejo", texto: "Hola!" },
    { id: 2, de: "Alejo", para: "Carla", texto: "Todo bien?" },
  ];

  const denuncias = [
    { id: 1, publicacion: "Mi primer post", motivo: "Contenido inapropiado" },
    { id: 2, publicacion: "Diseño Web", motivo: "Spam" },
  ];

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
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.nombre}</td>
                  <td>{u.email}</td>
                  <td>
                    <button className="btn-eliminar">Eliminar</button>
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
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.titulo}</td>
                  <td>{p.autor}</td>
                  <td>
                    <button className="btn-eliminar">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "mensajes":
        return (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>De</th>
                <th>Para</th>
                <th>Texto</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {mensajes.map((m) => (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td>{m.de}</td>
                  <td>{m.para}</td>
                  <td>{m.texto}</td>
                  <td>
                    <button className="btn-eliminar">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "denuncias":
        return (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Publicación</th>
                <th>Motivo</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {denuncias.map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.publicacion}</td>
                  <td>{d.motivo}</td>
                  <td>
                    <button className="btn-eliminar">Eliminar</button>
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
            <option value="mensajes">Mensajes</option>
            <option value="denuncias">Denuncias</option>
          </select>
        </div>

        <div className="tabla-container">{renderTable()}</div>
      </main>
    </div>
  );
}
