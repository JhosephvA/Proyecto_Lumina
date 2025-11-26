"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

export default function TeacherCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No se encontró token. Redirigiendo al login...");
      window.location.href = "/";
      return;
    }

    const fetchCourses = async () => {
      try {
        const res = await fetch("https://nuevolumina-backend.onrender.com/api/professor/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData?.message || "Error al obtener cursos");
        }

        const data: Course[] = await res.json();

        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const list = data.map((course) => ({
          ...course,
          Profesor: {
            id: userData.id,
            nombre: userData.nombre,
            apellido: userData.apellido,
          },
        }));

        setCourses(list);
      } catch (err: any) {
        console.error("❌ Error al obtener cursos del profesor:", err.message);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p style={{ padding: 40 }}>Cargando cursos...</p>;

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
          href="/teacher"
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
          <p>No tienes cursos asignados aún.</p>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              style={{
                backgroundColor: "#74b9ff",
                borderRadius: 12,
                padding: 20,
                color: "#fff",
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                cursor: "pointer",
                transition: "transform 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h2 style={{ fontSize: 20, fontWeight: 700 }}>{course.nombre}</h2>
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
          ))
        )}
      </main>
    </div>
  );
}
