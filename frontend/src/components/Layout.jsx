import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../assets/css/trabajos.css";


export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* Acá se inyecta PublicacionesPage con sus props */}
      </main>
      <Footer />
    </>
  );
}