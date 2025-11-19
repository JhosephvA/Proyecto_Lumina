"use client";

import { useEffect, useState } from "react";

export default function NewMaterialPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Campos del formulario
  const [courseId, setCourseId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [archivoUrl, setArchivoUrl] = useState("");

  const obtenerCursos = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("❌ No hay token en localStorage");
        setCourses([]);
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:3000/api/professor/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const contentType = res.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        console.error("❌ Backend devolvió HTML, probablemente error 401/403.");
        console.log("Respuesta:", await res.text());
        setCourses([]);
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log("👉 Cursos recibidos:", data);

      setCourses(Array.isArray(data) ? data : []);
      if (Array.isArray(data) && data.length > 0) {
        setCourseId(data[0].id); // seleccionar el primer curso por defecto
      }
    } catch (error) {
      console.error("Error al obtener cursos:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // =============================
  //  CREAR MATERIAL
  // =============================
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No estás autenticado");
      return;
    }

    const body = {
      titulo,
      descripcion,
      archivoUrl,
      courseId,
    };

    console.log("📤 Enviando:", body);

    const res = await fetch("http://localhost:3000/api/professor/materials", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Error:", errorText);
      alert("Error al crear material.");
      return;
    }

    alert("✅ Material creado con éxito!");
    setTitulo("");
    setDescripcion("");
    setArchivoUrl("");
  };

  useEffect(() => {
    obtenerCursos();
  }, []);

  if (loading) return <p>Cargando cursos...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Crear Material</h1>

      {courses.length === 0 ? (
        <p className="text-gray-500">
          No tienes cursos asignados. No puedes crear materiales.
        </p>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* ================= CURSO ================= */}
          <div>
            <label className="block font-semibold">Curso</label>
            <select
              className="border p-2 rounded w-full"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* ================= TÍTULO ================= */}
          <div>
            <label className="block font-semibold">Título</label>
            <input
              className="border p-2 rounded w-full"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          {/* ================= DESCRIPCIÓN ================= */}
          <div>
            <label className="block font-semibold">Descripción</label>
            <textarea
              className="border p-2 rounded w-full"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          {/* ================= ARCHIVO URL ================= */}
          <div>
            <label className="block font-semibold">URL del archivo (Drive, PDF, etc.)</label>
            <input
              className="border p-2 rounded w-full"
              value={archivoUrl}
              onChange={(e) => setArchivoUrl(e.target.value)}
            />
          </div>

          {/* ================= BOTÓN ================= */}
          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            Crear Material
          </button>
        </form>
      )}
    </div>
  );
}
