"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMyCourses } from "@/lib/api";

interface Course {
  id: number;
  nombre: string;
  descripcion: string;
  Profesor: {
    id: number;
    nombre: string;
    apellido: string;
  } | null;
}

export default function StudentCourses() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No se encontró token en localStorage");
      return;
    }

    const fetchCourses = async () => {
      try {
        const data = await getMyCourses(token);
        setCourses(data.map((enrollment: any) => enrollment.Curso));
      } catch (err) {
        console.error("Error al obtener cursos:", err);
      }
    };

    fetchCourses();
  }, []);

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
        <h1 style={{ fontSize: 32, fontWeight: 700 }}>Mis Cursos</h1>

        <Link
          href="/student"
          style={{
            padding: "8px 16px",
            backgroundColor: "#0070f3",
            color: "#fff",
            borderRadius: 6,
            textDecoration: "none",
          }}
        >
          Volver al dashboard
        </Link>
      </header>

      <main
        style={{
          display: "grid",
          gap: 24,
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        {courses.length === 0 ? (
          <p>No estás matriculado en ningún curso.</p>
        ) : (
          courses.map((course) => (
            <Link
              key={course.id}
              href={`/student/courses/${course.id}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  backgroundColor: "#74b9ff",
                  borderRadius: 12,
                  padding: 20,
                  color: "#fff",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                  cursor: "pointer",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <h2 style={{ fontSize: 20, fontWeight: 700 }}>
                  {course.nombre}
                </h2>
                <p style={{ fontSize: 14, opacity: 0.9 }}>
                  {course.descripcion || "Sin descripción"}
                </p>
                <p style={{ fontSize: 12, opacity: 0.7 }}>
                  Profesor:{" "}
                  {course.Profesor
                    ? `${course.Profesor.nombre} ${course.Profesor.apellido}`
                    : "No asignado"}
                </p>
              </div>
            </Link>
          ))
        )}
      </main>
    </div>
  );
}
