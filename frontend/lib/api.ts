export const API_URL = "http://localhost:3000/api";

/* ============================================
   🔹 Función auxiliar para parsear JSON seguro
=============================================== */
async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

/* ============================================
   🔹 Login CON TOKEN + ROL
=============================================== */
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

  // ⬅ Guardar token y rol de forma segura
  localStorage.setItem("token", data.tokens.accessToken);      // token principal
  localStorage.setItem("refreshToken", data.tokens.refreshToken); // refresh token
  localStorage.setItem("user", JSON.stringify(data.user));     // info del usuario
  localStorage.setItem("role", data.user.rol);                 // rol correcto

  return data; 
}

/* ============================================
   🔹 Registro (sin enviar rol)
=============================================== */
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

/* ============================================
   🔹 Obtener cursos del estudiante (token requerido)
=============================================== */
export async function getMyCourses(token: string) {
  const res = await fetch(`${API_URL}/student/courses`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await safeJson(res);

  if (!res.ok) {
    throw new Error(data?.message || "Error al obtener cursos");
  }

  return data;
}


export async function getGrades(token: string) {
  const res = await fetch(`${API_URL}/professor/grades`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await safeJson(res);

  if (!res.ok) {
    throw new Error(data?.message || "Error al obtener las notas");
  }

  return data;
}