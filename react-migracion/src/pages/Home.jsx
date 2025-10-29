import "../styles/home.css";
import Carousel from "../components/Carousel";
import FilterBar from "../components/FilterBar";
import PostCard from "../components/PostCard";
import publicaciones from "../data/publicaciones.json";

export default function Home() {
  return (
    <section className="home-container">
      <Carousel />
      <FilterBar />

      <div className="publicaciones-grid">
        {publicaciones.map((p) => (
          <PostCard
            key={p.id}
            title={p.titulo}
            location={p.ubicacion}
            solicitante={p.solicitante}
            image={p.imagen}
          />
        ))}
      </div>
    </section>
  );
}
