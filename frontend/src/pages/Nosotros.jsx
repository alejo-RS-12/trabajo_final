// src/pages/Nosotros.jsx

import "../assets/css/nosotros.css"; // Ajustá la ruta si tu carpeta es distinta

export default function Nosotros() {
  return (
    <main className="nosotros-page">
      <section className="imagen-background">
        <div className="intro-section">
          <h1>Nosotros</h1>

          <p>
            En nuestra organización creemos que el trabajo, la formación y el
            bienestar son pilares fundamentales para construir una comunidad más
            justa y solidaria. Buscamos generar oportunidades que mejoren la
            calidad de vida de las personas, conectando talentos con necesidades
            reales.
          </p>

          <p>
            Nuestro equipo está conformado por profesionales y voluntarios
            comprometidos con el desarrollo humano, brindando herramientas,
            capacitación y apoyo integral a quienes buscan crecer personal y
            profesionalmente.
          </p>

          <p>
            Promovemos valores como la empatía, la cooperación y la innovación,
            construyendo puentes entre las personas, las empresas y las
            instituciones.
          </p>
        </div>
      </section>
    </main>
  );
}
