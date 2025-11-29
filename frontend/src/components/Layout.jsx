import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollUp from "./ScrollUp.jsx";
import "../assets/css/trabajos.css";


export default function Layout() {
  return (
    <>
      <ScrollUp />
      <Header />
      <main>
        <Outlet /> {/* Acá se inyecta PublicacionesPage con sus props */}
      </main>
      <Footer />
    </>
  );
}