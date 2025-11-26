"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Course {
  id: number;
  nombre: string;
  descripcion: string;
}

export default function CoursePage() {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourse() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(
          `https://nuevolumina-backend.onrender.com/api/professor/courses/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setCourse(data);
      } catch (err) {
        console.error("Error cargando curso:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCourse();
  }, [id]);

  if (loading) return <div style={{ padding: 40 }}>Cargando curso...</div>;

  if (!course)
    return (
      <div style={{ padding: 40 }}>
        No se encontró el curso (ID: {id})
      </div>
    );

  return (
    <div
      style={{
        padding: 40,
        fontFamily: "'Segoe UI', Tahoma, sans-serif",
        background: "#f5f6fa",
        minHeight: "100vh",
      }}
    >
      {/* BOTÓN VOLVER */}
      <button
        onClick={() => window.history.back()}
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          fontWeight: "bold",
          background: "#0984e3",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          marginBottom: "25px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          transition: "0.2s",
        }}
      >
        ← Regresar
      </button>

      {/* TÍTULO DEL CURSO */}
      <h1
        style={{
          fontSize: 40,
          marginBottom: 15,
          color: "#2d3436",
          fontWeight: "900",
        }}
      >
        {course.nombre}
      </h1>

      {/* DESCRIPCIÓN */}
      <p
        style={{
          marginBottom: 40,
          opacity: 0.9,
          fontSize: 18,
          lineHeight: "26px",
        }}
      >
        {course.descripcion}
      </p>

      {/* GRID DE OPCIONES */}
      <div
        style={{
          display: "grid",
          gap: 20,
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        <Link href={`/teacher/courses/${id}/tasks`} style={cardStyle}>
          📘 Tareas
        </Link>

        <Link href={`/teacher/courses/${id}/materials`} style={cardStyle}>
          📚 Materiales
        </Link>

        <Link href={`/teacher/courses/${id}/grades`} style={cardStyle}>
          🧮 Notas
        </Link>

        <Link href={`/teacher/courses/${id}/students`} style={cardStyle}>
          🧑‍🏫 Estudiantes
        </Link>
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  backgroundColor: "#0984e3",
  padding: "25px",
  borderRadius: "14px",
  color: "#fff",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "20px",
  textDecoration: "none",
  boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
  transition: "transform 0.25s, box-shadow 0.25s",
};
