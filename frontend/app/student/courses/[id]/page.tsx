"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function StudentCoursePage() {
  const { id } = useParams(); // ID del curso
  const [course, setCourse] = useState<any>(null);
  const [materiales, setMateriales] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Obtener info del curso
  const obtenerCurso = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:3000/api/student/courses/${id}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const data = await res.json();
      setCourse(data);
    } catch (error) {
      console.error("Error al obtener curso:", error);
    }
  };

  // 🔹 Obtener materiales del curso
  const obtenerMateriales = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:3000/api/materials/student/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setMateriales(data);
      } else {
        setMateriales([]);
      }
    } catch (error) {
      console.error("Error al obtener materiales:", error);
      setMateriales([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerCurso();
    obtenerMateriales();
  }, [id]);

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
      {/* 🔹 HEADER SUPERIOR ARREGLADO */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 16,
          marginBottom: 40,
          borderBottom: "1px solid #e5e5e5",
        }}
      >
        <h2
          style={{
            fontSize: 30,
            fontWeight: 700,
            margin: 0,
            color: "#222",
          }}
        >
          Materiales del Curso
        </h2>

        <Link
          href="/student/courses"
          style={{
            padding: "10px 18px",
            backgroundColor: "#0070f3",
            color: "#fff",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 500,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          ⬅ Volver a Mis Cursos
        </Link>
      </header>

      {/* 🔹 INFO DEL CURSO */}
      <div
        style={{
          marginBottom: 35,
        }}
      >
        <h1
          style={{
            fontSize: 34,
            fontWeight: 700,
            margin: 0,
          }}
        >
          {course ? course.nombre : "Cargando..."}
        </h1>

        <p
          style={{
            fontSize: 15,
            opacity: 0.8,
            maxWidth: 650,
            marginTop: 8,
          }}
        >
          {course?.descripcion}
        </p>
      </div>

      {/* 🔹 LISTA DE MATERIALES */}
      {loading ? (
        <p style={{ opacity: 0.7 }}>Cargando materiales...</p>
      ) : materiales.length === 0 ? (
        <p style={{ opacity: 0.7 }}>No hay materiales disponibles.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gap: 20,
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          {materiales.map((m) => (
            <div
              key={m.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: 12,
                padding: 20,
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                border: "1px solid #e0e0e0",
              }}
            >
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                {m.titulo}
              </h3>

              <p style={{ fontSize: 14, opacity: 0.8 }}>{m.descripcion}</p>

              {m.archivoUrl && (
                <a
                  href={m.archivoUrl}
                  target="_blank"
                  style={{
                    display: "inline-block",
                    marginTop: 10,
                    color: "#0070f3",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  📄 Ver archivo
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
