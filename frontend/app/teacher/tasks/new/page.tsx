"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Course {
  id: number;
  nombre: string;
}

export default function CreateTaskPage() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [cursoId, setCursoId] = useState<number | "">("");

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // 🔹 Cargar los cursos del profesor
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/professor/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Error cargando cursos:", error);
        setCourses([]);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cursoId) {
      alert("Debes seleccionar un curso");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No se encontró token. Inicia sesión.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/professor/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titulo,
          descripcion,
          fechaEntrega,
          courseId: cursoId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Error al crear tarea");
      }

      alert("Tarea creada correctamente");
      router.push("/teacher/tasks");
    } catch (err: any) {
      alert(err.message || "Error al crear tarea");
    } finally {
      setLoading(false);
    }
  };

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
      {/* HEADER */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <h1 style={{ fontSize: 32, fontWeight: 700 }}>Crear Tarea</h1>

        <Link
          href="/teacher/tasks"
          style={{
            padding: "8px 16px",
            backgroundColor: "#0070f3",
            color: "#fff",
            borderRadius: 6,
            textDecoration: "none",
          }}
        >
          Volver a Mis Tareas
        </Link>
      </header>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 500,
          background: "#fff",
          padding: 30,
          borderRadius: 12,
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        {/* TÍTULO */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
            Título de la tarea
          </label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              border: "1px solid #ccc",
              fontSize: 14,
            }}
          />
        </div>

        {/* DESCRIPCIÓN */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
            Descripción
          </label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={4}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              border: "1px solid #ccc",
              fontSize: 14,
              resize: "vertical",
            }}
          />
        </div>

        {/* FECHA DE ENTREGA */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
            Fecha de entrega
          </label>
          <input
            type="date"
            value={fechaEntrega}
            onChange={(e) => setFechaEntrega(e.target.value)}
            required
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              border: "1px solid #ccc",
              fontSize: 14,
            }}
          />
        </div>

        {/* SELECCIONAR CURSO */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
            Seleccionar curso
          </label>
          <select
            value={cursoId}
            onChange={(e) => setCursoId(Number(e.target.value))}
            required
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              border: "1px solid #ccc",
              fontSize: 14,
              background: "#fff",
            }}
          >
            <option value="">-- Selecciona un curso --</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* BOTÓN */}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: 12,
            width: "100%",
            backgroundColor: "#74b9ff",
            color: "#fff",
            fontWeight: 600,
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 16,
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#0984e3")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#74b9ff")
          }
        >
          {loading ? "Creando..." : "Crear Tarea"}
        </button>
      </form>
    </div>
  );
}
