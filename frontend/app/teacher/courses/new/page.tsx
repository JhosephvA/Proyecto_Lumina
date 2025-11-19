"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateCoursePage() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No se encontró token. Debes iniciar sesión nuevamente.");
      return;
    }

    setLoading(true);

    try {
      // 🔹 Cambiado para apuntar a la ruta de profesor
      const res = await fetch("http://localhost:3000/api/professor/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre, descripcion }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Error al crear curso");
      }

      alert("Curso creado correctamente");
      router.push("/teacher/courses"); // redirige a la lista de cursos
    } catch (err: any) {
      console.error("Error creando curso:", err);
      alert(err.message || "Error creando curso");
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
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <h1 style={{ fontSize: 32, fontWeight: 700 }}>Crear Curso</h1>
        <Link
          href="/teacher/courses"
          style={{
            padding: "8px 16px",
            backgroundColor: "#0070f3",
            color: "#fff",
            borderRadius: 6,
            textDecoration: "none",
          }}
        >
          Volver a Mis Cursos
        </Link>
      </header>

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
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="nombre" style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
            Nombre del curso
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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

        <div style={{ marginBottom: 20 }}>
          <label htmlFor="descripcion" style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
            Descripción
          </label>
          <textarea
            id="descripcion"
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

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: 12,
            width: "100%",
            backgroundColor: "#74b9ff", // para que combine con la página de estudiante
            color: "#fff",
            fontWeight: 600,
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 16,
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0984e3")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#74b9ff")}
        >
          {loading ? "Creando..." : "Crear Curso"}
        </button>
      </form>
    </div>
  );
}
