// pages/Home.tsx
import Header from "../components/header";
import Carrusel from "../components/carrusel";
import Publicaciones from "../components/publicaciones";
import Footer from "../components/footer";


export default function Home() {
  return (
    <>
      <Header />
      <Carrusel />
      <Publicaciones />
      <Footer />
    </>
  );
}
