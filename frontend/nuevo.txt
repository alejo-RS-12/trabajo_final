import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/index";
import Login from "./pages/login";
import Nosotros from "./pages/nosotros";
import Publicacion from "./pages/publicacion";
import Trabajos from "./pages/trabajos";
import Usuario from "./pages/usuario";
import Bienestar from "./pages/bienestar";
import Formacion from "./pages/formacion";
import BotonesRol from "./pages/botones-rol";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/publicacion" element={<Publicacion />} />
        <Route path="/trabajos" element={<Trabajos />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/bienestar" element={<Bienestar />} />
        <Route path="/formacion" element={<Formacion />} />
        <Route path="/botones-rol" element={<BotonesRol />} />
      </Routes>
    </Router>
  );
}

export default App;
