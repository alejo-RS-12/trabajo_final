export default function FilterBar({ filtro, setFiltro, onAdd, isLoggedIn }) {
  return (
    <section className="filtro-section">
      <label htmlFor="filtroSelect">Ver:</label>
      <select
        id="filtroSelect"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      >
        <option value="todos">Todas</option>
        <option value="guardados">Guardados</option>
        <option value="ofrecidos">Ofrecidos</option>
      </select>

      {isLoggedIn && (
        <button id="addCardBtn" onClick={onAdd}>
          Agregar publicación
        </button>
      )}
    </section>
  );
}
