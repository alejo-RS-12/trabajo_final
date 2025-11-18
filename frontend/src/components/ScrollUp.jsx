import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollUp() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Hace scroll al inicio de la página cada vez que cambiamos de pagina
    window.scrollTo(0, 50);
  }, [pathname]);

  return null;
}