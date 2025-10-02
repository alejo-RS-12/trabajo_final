// components/Publicaciones.tsx
import "../assets/css/index.css";

const publicaciones = [
  { titulo: "Albañil", ubicacion: "Olavarría", solicitante: "Juan Pérez", img: "/imagenes/trabajos/albaniles.jpg", link:"/" },
  { titulo: "Electricista", ubicacion: "Azul", solicitante: "Ana Gómez", img: "/imagenes/trabajos/electricistas.jpg" },
  { titulo: "Plomero", ubicacion: "Loma Negra", solicitante: "Juan Rutia", img: "/imagenes/trabajos/plomeros.jpg" },
  { titulo: "Personal Trainer", ubicacion: "Olavarría", solicitante: "Laura Gimenez", img: "/imagenes/trabajos/personaltrainers.jpg" },
  { titulo: "Albañil", ubicacion: "Sierra Chica", solicitante: "Marcos Gutierrez", img: "/imagenes/trabajos/albaniles2.jpg" },
  { titulo: "Electricista", ubicacion: "Olavarría", solicitante: "Nestor Díaz", img: "/imagenes/trabajos/electricistas2.jpg" },
];

export default function Publicaciones() {
  return (
    <section className="publicaciones">
      <h4>Publicaciones destacadas</h4>
      <div className="publicaciones-grid">
        {publicaciones.map((pub, i) => (
          <div key={i} className="post-card">
            <div className="post-img">
              <img src={pub.img} alt={pub.titulo} />
            </div>
            <div className="post-info">
              <h5 className="post-title">{pub.titulo}</h5>
              <p className="post-location">Ubicación: {pub.ubicacion}</p>
              <p className="post-solicitante">Solicitante: {pub.solicitante}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
