"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Task {
  id: number;
  titulo: string;
  descripcion: string;
  fechaEntrega: string;
  courseId: number;
}

interface Course {
  id: number;
  nombre: string;
}

export default function TeacherTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("⚠ No token, redirigiendo...");
      window.location.href = "/";
      return;
    }

    const fetchData = async () => {
      try {
        // 🔹 Obtener tareas
        const tasksRes = await fetch("http://localhost:3000/api/professor/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!tasksRes.ok) {
          const err = await tasksRes.json();
          throw new Error(err?.message || "Error al obtener tareas");
        }

        const tasksData = await tasksRes.json();
        setTasks(Array.isArray(tasksData) ? tasksData : []);

        // 🔹 Obtener cursos
        const coursesRes = await fetch("http://localhost:3000/api/professor/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const coursesData = await coursesRes.json();
        setCourses(Array.isArray(coursesData) ? coursesData : []);
      } catch (err: any) {
        console.error("❌ Error:", err.message);
        setTasks([]);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p style={{ padding: 40 }}>Cargando tareas...</p>;

  // Helper para encontrar nombre del curso
  const getCourseName = (id: number) =>
    courses.find((c) => c.id === id)?.nombre || "Curso desconocido";

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
        <h1 style={{ fontSize: 32, fontWeight: 700 }}>Tareas asignadas</h1>

        <div>
          <Link
            href="/teacher"
            style={{
              padding: "8px 16px",
              backgroundColor: "#0070f3",
              color: "#fff",
              borderRadius: 6,
              textDecoration: "none",
              marginRight: 10,
            }}
          >
            Volver al dashboard
          </Link>

          <Link
            href="/teacher/tasks/new"
            style={{
              padding: "8px 16px",
              backgroundColor: "#00b894",
              color: "#fff",
              borderRadius: 6,
              textDecoration: "none",
            }}
          >
            Crear Tarea
          </Link>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main
        style={{
          display: "grid",
          gap: 24,
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        {tasks.length === 0 ? (
          <p>No tienes tareas creadas aún.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
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
              <h2 style={{ fontSize: 20, fontWeight: 700 }}>{task.titulo}</h2>

              <p style={{ fontSize: 14, opacity: 0.9 }}>
                {task.descripcion || "Sin descripción"}
              </p>

              <p style={{ fontSize: 12, opacity: 0.8 }}>
                Fecha de entrega:{" "}
                {new Date(task.fechaEntrega).toLocaleDateString("es-PE")}
              </p>

              {/* 🔹 Curso asignado */}
              <p style={{ fontSize: 12, marginTop: 10, opacity: 0.9 }}>
                <strong>Curso:</strong> {getCourseName(task.courseId)}
              </p>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
