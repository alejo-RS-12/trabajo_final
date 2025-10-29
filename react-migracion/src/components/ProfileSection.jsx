export default function ProfileSection({
  profileImage,
  backgroundImage,
  isLoggedIn,
  description,
  setDescription,
  handleProfileChange,
  handleBackgroundChange,
}) {
  return (
    <section className="sub-header">
      {/* Fondo del perfil */}
      <div
        className="background-container"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        }}
      >
        {isLoggedIn && (
          <>
            <label htmlFor="backgroundImageInput" className="edit-icon bg-edit">
              <i className="fas fa-pencil-alt"></i>
            </label>
            <input
              type="file"
              id="backgroundImageInput"
              accept="image/*"
              onChange={handleBackgroundChange}
              style={{ display: "none" }}
            />
          </>
        )}
      </div>

      {/* Imagen del usuario */}
      <div className="profile-container">
        <img src={profileImage} alt="Usuario" className="user-profile-image" />
        {isLoggedIn && (
          <>
            <label
              htmlFor="profileImageInput"
              className="edit-icon profile-edit"
            >
              <i className="fas fa-pencil-alt"></i>
            </label>
            <input
              type="file"
              id="profileImageInput"
              accept="image/*"
              onChange={handleProfileChange}
              style={{ display: "none" }}
            />
          </>
        )}
      </div>

      {/* Descripción */}
      <textarea
        className="user-description"
        disabled={!isLoggedIn}
        placeholder={
          isLoggedIn
            ? "Escribe una descripción..."
            : "Debes estar registrado para editar esta descripción"
        }
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </section>
  );
}
