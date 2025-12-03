"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StudentPage() {
  const [user, setUser] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      window.location.href = "/";
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    const role = parsedUser.rol?.toLowerCase();

    if (role !== "estudiante") {
      window.location.href = "/";
      return;
    }

    setUser(parsedUser);

    const fetchCourses = async () => {
      try {
        const res = await fetch(
          "https://nuevolumina-backend.onrender.com/api/student/courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("❌ Error al cargar cursos:", err);
        setCourses([]);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (!user) return <div style={{ padding: 40 }}>Cargando...</div>;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 40,
        fontFamily: "'Segoe UI'",
        background: "#f5f6fa",
        color: "#333",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <h1 style={{ fontSize: 32 }}>
          Bienvenido {user.nombre}
        </h1>

        <button
          onClick={logout}
          style={{
            padding: "8px 16px",
            backgroundColor: "#d63031",
            color: "#fff",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
          }}
        >
          Cerrar sesión
        </button>
      </header>

      {/* Cursos */}
      <h2 style={{ fontSize: 26, marginBottom: 20 }}>Mis Cursos</h2>

      <main
        style={{
          display: "grid",
          gap: 24,
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        {loadingCourses ? (
          <p>Cargando cursos...</p>
        ) : courses.length === 0 ? (
          <p>No estás matriculado en ningún curso.</p>
        ) : (
          courses.map((enrollment) => {
            const course = enrollment.Curso; // ✅ AQUÍ ESTÁ LA CLAVE

            return (
              <Link
                key={course.id}
                href={`/student/courses/${course.id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    backgroundColor: "#55efc4",
                    borderRadius: 12,
                    padding: 20,
                    color: "#2d3436",
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

                  <p style={{ fontSize: 14 }}>
                    {course.descripcion || "Sin descripción"}
                  </p>
                </div>
              </Link>
            );
          })
        )}
      </main>
    </div>
  );
}
