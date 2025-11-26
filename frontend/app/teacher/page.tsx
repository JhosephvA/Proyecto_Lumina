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

export default function TeacherPage() {
  const [user, setUser] = useState<any>(null);
  const [courses, setCourses] = useState<Course[]>([]);
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

    if (role !== "profesor") {
      window.location.href = "/";
      return;
    }

    setUser(parsedUser);

    const fetchCourses = async () => {
      try {
        const res = await fetch(
          "https://nuevolumina-backend.onrender.com/api/professor/courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData?.message || "Error al obtener cursos");
        }

        const data: Course[] = await res.json();

        const list = data.map((course) => ({
          ...course,
          Profesor: {
            id: parsedUser.id,
            nombre: parsedUser.nombre,
            apellido: parsedUser.apellido,
          },
        }));

        setCourses(list);
      } catch (err: any) {
        console.error("❌ Error al obtener cursos:", err.message);
        setCourses([]);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  if (!user) {
    return <div style={{ padding: 40 }}>Cargando panel del profesor...</div>;
  }

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
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <h1 style={{ fontSize: 32, fontWeight: 700 }}>
          Bienvenido Profesor {user.nombre}
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

      {/* Lista de cursos */}
      <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 20 }}>
        Mis Cursos
      </h2>

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
          <p>No tienes cursos asignados aún.</p>
        ) : (
          courses.map((course) => (
            <Link
              key={course.id}
              href={`/teacher/courses/${course.id}`}
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
