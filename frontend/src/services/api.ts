const API_URL = "http://localhost:3000";

export async function apiFetch(endpoint: string, options: any = {}) {
  const token = localStorage.getItem("token");

  const headers: any = {
    ...(options.headers || {}),
  };

  // Solo agrego Content-Type si se envía JSON
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Si la respuesta no es JSON, la leo como texto para no romper
  const text = await response.text();

  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text; // permite manejar mensajes simples
  }

  if (!response.ok) {
    const errorMessage = data?.message || data || `Error HTTP ${response.status}`;
    console.error("❌ apiFetch error:", errorMessage);
    throw new Error(errorMessage);
  }

  return data;
}
