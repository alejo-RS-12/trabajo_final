export default function CamposProfesional({ datos, onChange, profesiones }) {
  // Aseguramos que siempre generamos correctamente el array de IDs seleccionados
  const profesionesSeleccionadas = Array.isArray(datos.profesiones)
  ? datos.profesiones.map(p => 
      p.profesion?.idProfesion ?? null
    ).filter(Boolean)
  : [];

  return (
    <div className="form-section">
      <div className="form-group">
        <label>Formación Profesional</label>
        <select
          multiple
          value={profesionesSeleccionadas || []}
          onChange={(e) => {
            const selectedOptions = Array.from(
              e.target.selectedOptions,
              opt => parseInt(opt.value)
            );
            onChange("profesiones", selectedOptions, "profesional");
          }}
        >
          {profesiones.map((prof) => (
            <option key={prof.idProfesion} value={prof.idProfesion}>
              {prof.nombre}
            </option>
          ))}
        </select>
        <small>Puedes mantener presionada Ctrl o Cmd para seleccionar varias.</small>
      </div>

      <div className="form-group">
        <label>Número de Matrícula</label>
        <input type="text" value={datos.matricula || ""} placeholder="Ingresa tu matrícula profesional" onChange={(e) => onChange("matricula", e.target.value, "Profesional")}/>
      </div>

      <div className="form-group">
        <label>Descripción Profesional</label>
        <textarea
          rows="4"
          value={datos.descripcion || ""}
          placeholder="Describe tu experiencia y especialidades..."
          onChange={(e) => onChange("descripcion", e.target.value, "Profesional")}
        ></textarea>
      </div>
    </div>
  );
}
