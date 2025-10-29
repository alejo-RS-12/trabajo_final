export default function PostCard({
  title,
  location,
  solicitante,
  image,
  canDelete,
  onDelete,
}) {
  return (
    <div className="post-card">
      <div className="post-img">
        <img src={image} alt="Imagen del trabajo" />
      </div>
      <div className="post-info">
        <h5 className="post-title">{title}</h5>
        <p className="post-location">Ubicación: {location}</p>
        <p className="post-solicitante">Solicitante: {solicitante}</p>
        {canDelete && (
          <button className="delete-btn" onClick={onDelete}>
            ×
          </button>
        )}
      </div>
    </div>
  );
}
