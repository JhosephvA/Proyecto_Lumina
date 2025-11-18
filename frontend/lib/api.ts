export const API_URL = "http://localhost:3000/api";

// Función auxiliar por si el backend no retorna JSON
async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

/* ===============================
   🔹 Login
================================= */
export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await safeJson(res);

  if (!res.ok) {
    throw new Error(data?.message || "Error al iniciar sesión");
  }

  return data;
}

/* ===============================
   🔹 Registro (sin enviar rol)
================================= */
export async function registerUser(
  nombre: string,
  apellido: string,
  email: string,
  password: string
) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre,
      apellido,
      email,
      password,
    }),
  });

  const data = await safeJson(res);

  if (!res.ok) {
    if (data?.errors?.length > 0) {
      throw new Error(data.errors[0].msg);
    }
    throw new Error(data?.message || "Error al registrar");
  }

  return data;
}

/* ===============================
   🔹 Obtener los cursos del estudiante
================================= */
export async function getMyCourses(token: string) {
  const res = await fetch(`${API_URL}/student/courses`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // ⬅ token obligatorio
    },
  });

  const data = await safeJson(res);

  if (!res.ok) {
    throw new Error(data?.message || "Error al obtener cursos");
  }

  return data;
}
