import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "../src/components/Layout";
import Home from "../src/pages/Index";
import AdminPanel from "./pages/Control-admin";
import BotonesRol from "./pages/Botones-rol";
import PublicacionesPage from "./pages/PublicacionesPage";
import {
  categoriasTrabajos,
  categoriasFormacion,
  categoriasBienestar,
} from "./data/categorias";
import CrearPub from "./pages/CrearPub";
import PublicacionPage from "../src/pages/PublicacionPage";
import Login from "../src/pages/Login";
import FavoritosPage from "./pages/FavoritosPage";
import MensajesPage from "./pages/MensajesPage";
import Usuario from "./pages/Usuario";
import ConfiguracionUsuario from "./pages/ConfiguracionUsuario";
import ToastContainer from "./components/ToastContainer";
import Nosotros from "./pages/Nosotros";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Rutas SIN Layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/botones-rol" element={<BotonesRol />} />

          {/* Rutas CON Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route
              path="/trabajos"
              element={
                <PublicacionesPage
                  categorias={categoriasTrabajos}
                  titulo="Trabajos"
                />
              }
            />
            <Route
              path="/formacion"
              element={
                <PublicacionesPage
                  categorias={categoriasFormacion}
                  titulo="Formación"
                />
              }
            />
            <Route
              path="/bienestar"
              element={
                <PublicacionesPage
                  categorias={categoriasBienestar}
                  titulo="Bienestar"
                />
              }
            />
            <Route path="/crear-publicacion" element={<CrearPub />} />
            <Route path="/publicacion/:id" element={<PublicacionPage />} />
            <Route path="/favoritos" element={<FavoritosPage />} />
            <Route path="/mensajes" element={<MensajesPage />} />
            <Route path="/usuario" element={<Usuario />} />
            <Route
              path="/configuracion-de-usuario"
              element={<ConfiguracionUsuario />}
            />
            <Route path="/nosotros" element={<Nosotros />} />
          </Route>
        </Routes>

        <ToastContainer />
      </AuthProvider>
    </Router>
  );
}
