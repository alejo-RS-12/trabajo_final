import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/index";
import Login from "./pages/login";
import BotonesRol from "./pages/botones-rol";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/botones-rol" element={<BotonesRol />} />
      </Routes>
    </Router>
  );
}

export default App;
