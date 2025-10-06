import "../assets/css/botones-rol.css";

export default function Rol() {
  return (
    <div className="contenedor">
      <h4>Elije tu rol</h4>
      <div className="botones">
        <button className="btn comun">Cliente</button>
        <button className="btn profesional">Profesional</button>
      </div>
    </div>
  );
}
