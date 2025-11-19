"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
      setCourses(Array.isArray(data) ? data : []);

      if (Array.isArray(data) && data.length > 0) {
        setCourseId(data[0].id);
      }
    } catch (error) {
      console.error("Error al obtener cursos:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Crear Material
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

  if (loading)
    return <p style={{ padding: 40 }}>Cargando cursos...</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 40,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: "#f5f6fa",
        color: "#333",
      }}
    >
      {/* ========== HEADER igual al de los cursos ========== */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <h1 style={{ fontSize: 32, fontWeight: 700 }}>Crear Material</h1>

        <div>
          <Link
            href="/teacher/materials"
            style={{
              padding: "8px 16px",
              backgroundColor: "#0070f3",
              color: "#fff",
              borderRadius: 6,
              textDecoration: "none",
              marginRight: 10,
            }}
          >
            Ver Materiales
          </Link>

          <Link
            href="/teacher"
            style={{
              padding: "8px 16px",
              backgroundColor: "#636e72",
              color: "#fff",
              borderRadius: 6,
              textDecoration: "none",
            }}
          >
            Volver al Dashboard
          </Link>
        </div>
      </header>

      {/* ========== CUERPO con card igual estilo de cursos/materiales ========== */}
      {courses.length === 0 ? (
        <p>No tienes cursos asignados. No puedes crear materiales.</p>
      ) : (
        <div
          style={{
            maxWidth: 600,
            margin: "0 auto",
            background: "#fff",
            padding: 30,
            borderRadius: 12,
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          }}
        >
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Curso */}
            <div>
              <label style={{ fontWeight: 600 }}>Curso</label>
              <select
                style={{
                  border: "1px solid #ccc",
                  padding: 10,
                  borderRadius: 6,
                  width: "100%",
                  marginTop: 4,
                }}
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

            {/* Título */}
            <div>
              <label style={{ fontWeight: 600 }}>Título</label>
              <input
                style={{
                  border: "1px solid #ccc",
                  padding: 10,
                  borderRadius: 6,
                  width: "100%",
                  marginTop: 4,
                }}
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>

            {/* Descripción */}
            <div>
              <label style={{ fontWeight: 600 }}>Descripción</label>
              <textarea
                style={{
                  border: "1px solid #ccc",
                  padding: 10,
                  borderRadius: 6,
                  width: "100%",
                  marginTop: 4,
                }}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            {/* URL archivo */}
            <div>
              <label style={{ fontWeight: 600 }}>
                URL del archivo (PDF, Drive, etc.)
              </label>
              <input
                style={{
                  border: "1px solid #ccc",
                  padding: 10,
                  borderRadius: 6,
                  width: "100%",
                  marginTop: 4,
                }}
                value={archivoUrl}
                onChange={(e) => setArchivoUrl(e.target.value)}
              />
            </div>

            {/* Botón */}
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#00b894",
                color: "#fff",
                borderRadius: 6,
                border: "none",
                marginTop: 10,
                cursor: "pointer",
                fontWeight: 600,
                display: "block",
              }}
            >
              Crear Material
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
