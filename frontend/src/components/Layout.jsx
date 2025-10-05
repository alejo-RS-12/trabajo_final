import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../css/trabajos.css";


export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* Aquí se inyecta PublicacionesPage con sus props */}
      </main>
      <Footer />
    </>
  );
}