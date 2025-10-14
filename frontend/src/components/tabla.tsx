
interface TableProps<T> {
  columns: string[];
  rows: T[];
  onDelete: (id: number) => void;
}

export default function Table<T extends { id: number }>({
  columns,
  rows,
  onDelete,
}: TableProps<T>) {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            {columns.map((col) => {
              const key = col.toLowerCase() as keyof T;
              return <td key={key.toString()}>{String(row[key] ?? "")}</td>;
            })}
            <td>
              <button className="delete-btn" onClick={() => onDelete(row.id)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
