import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/index";
import Login from "./pages/login";
import BotonesRol from "./pages/botones-rol";
import AdminPanel from "./pages/control-admin";
import "./assets/css/global.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/botones-rol" element={<BotonesRol />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
