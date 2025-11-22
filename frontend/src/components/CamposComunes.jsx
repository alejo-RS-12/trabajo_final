export default function CamposComunes({ datos, onChange }) {
  return (
    <div className="form-section">
      <div className="form-group">
        <label>Nombre completo</label>
        <input type="text" value={datos.nombreCompleto || ""} placeholder="Ingresa tu nombre completo" onChange={(e) => onChange("nombreCompleto", e.target.value, "usuario")}/>
      </div>

      <div className="form-group">
        <label>Usuario</label>
        <input type="text" value={datos.nombreDeUsuario || ""} placeholder="Ingresa tu nombre" onChange={(e) => onChange("nombreDeUsuario", e.target.value, "usuario")} />
      </div>

      <div className="form-group">
        <label>E-mail</label>
        <input type="email" value={datos.email || ""} placeholder="tuemail@ejemplo.com" disabled />
      </div>
    </div>
  );
}
