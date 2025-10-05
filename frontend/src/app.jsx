import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import  Layout  from "../src/components/Layout";
import PublicacionesPage from "./components/PublicacionesPage";
import { categoriasTrabajos, categoriasFormacion, categoriasBienestar } from "./data/categorias";
import CrearPub from "./components/CrearPub";
import PublicacionPage from "../src/components/PublicacionPage";
import Login from "../src/components/Login";
import FavoritosPage from "./components/FavoritosPage";


export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
           <Route element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="/trabajos" element={<PublicacionesPage categorias={categoriasTrabajos} titulo="Trabajos" />} />
          <Route path="/formacion" element={<PublicacionesPage categorias={categoriasFormacion} titulo="Formación" />} />
          <Route path="/bienestar" element={<PublicacionesPage categorias={categoriasBienestar} titulo="Bienestar" />} />
          <Route path="/crear-publicacion" element={<CrearPub />} />
          <Route path="/publicacion/:id" element={<PublicacionPage />} />
          <Route path="/favoritos" element={<FavoritosPage />} />
        </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}