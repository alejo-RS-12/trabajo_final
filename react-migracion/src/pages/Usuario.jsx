import { useState, useEffect } from "react";
/*import HeaderUsuario from "../components/HeaderUsuario";*/
import FilterBar from "../components/FilterBar";
import PostCard from "../components/PostCard";
import ProfileSection from "../components/ProfileSection";
import "../styles/usuario.css";

export default function Usuario() {
  // Estados de sesión y perfil
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [profileImage, setProfileImage] = useState("icono-user.png");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [description, setDescription] = useState("");

  // Publicaciones y filtro
  const [filtro, setFiltro] = useState("todos");
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Albañil",
      location: "Olavarría",
      solicitante: "Juan Pérez",
      image: "albaniles.jpg",
      tipo: "ofrecidos",
    },
    {
      id: 2,
      title: "Electricista",
      location: "Azul",
      solicitante: "Ana Gómez",
      image: "electricistas.jpg",
      tipo: "ofrecidos",
    },
    {
      id: 3,
      title: "Plomero",
      location: "Loma Negra",
      solicitante: "Juan Rutia",
      image: "plomeros.jpg",
      tipo: "ofrecidos",
    },
    {
      id: 4,
      title: "Personal Trainer",
      location: "Olavarría",
      solicitante: "Laura Gimenez",
      image: "personaltrainers.jpg",
      tipo: "ofrecidos",
    },
  ]);

  // Mantener estado del login en localStorage
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  // Funciones de login/logout
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  // Cambiar imagen de perfil
  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setProfileImage(ev.target.result);
    reader.readAsDataURL(file);
  };

  // Cambiar imagen de fondo
  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setBackgroundImage(ev.target.result);
    reader.readAsDataURL(file);
  };

  // Agregar nueva publicación
  const handleAddPost = () => {
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para agregar publicaciones.");
      return;
    }

    const titulo = prompt("Título del trabajo:");
    const ubicacion = prompt("Ubicación:");
    const solicitante = prompt("Nombre del solicitante:");
    const tipo = prompt("¿Es 'guardados' o 'ofrecidos'?");

    if (!titulo || !ubicacion || !solicitante) {
      alert("Faltan datos");
      return;
    }

    setPosts([
      ...posts,
      {
        id: Date.now(),
        title: titulo,
        location: ubicacion,
        solicitante,
        image: "generico.jpg",
        tipo,
      },
    ]);
  };

  // Eliminar publicación
  const handleDeletePost = (id) => {
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para eliminar publicaciones.");
      return;
    }

    if (window.confirm("¿Estás seguro de eliminar esta publicación?")) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  // Filtrar publicaciones
  const filteredPosts = posts.filter(
    (p) => filtro === "todos" || p.tipo === filtro
  );

  return (
    <div>
      {/* Header con menú hamburguesa + dropdown 
      <HeaderUsuario
        profileImage={profileImage}
        onLogin={handleLogin}
        onLogout={handleLogout}
      /> */}

      {/* Sección de perfil */}
      <ProfileSection
        profileImage={profileImage}
        backgroundImage={backgroundImage}
        isLoggedIn={isLoggedIn}
        description={description}
        setDescription={setDescription}
        handleProfileChange={handleProfileChange}
        handleBackgroundChange={handleBackgroundChange}
      />

      <section className="grilla">
        <p className="subtitulo">empleos o capacitaciones</p>
      </section>

      {/* Filtro y botón agregar */}
      <FilterBar
        filtro={filtro}
        setFiltro={setFiltro}
        onAdd={handleAddPost}
        isLoggedIn={isLoggedIn}
      />

      {/* Tarjetas de publicaciones */}
      <section className="cards-section">
        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            {...post}
            canDelete={isLoggedIn}
            onDelete={() => handleDeletePost(post.id)}
          />
        ))}
      </section>
    </div>
  );
}
