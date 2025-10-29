import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Páginas
import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import Usuario from "./pages/Usuario";

//import "./styles/App.css"; // estilo global borrado

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/Index" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/usuario" element={<Usuario />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
