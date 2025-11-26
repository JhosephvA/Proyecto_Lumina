"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Task {
  id: number;
  titulo: string;
  descripcion: string;
  fechaEntrega: string;
  courseId: number;
}

export default function CourseTasksPage() {
  const { id } = useParams(); // ← obtiene el ID del curso desde la URL
  const courseId = Number(id);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
      return;
    }

    const fetchTasks = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/professor/courses/${courseId}/tasks`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Error al obtener tareas");
        }

        const data = await res.json();
        setTasks(Array.isArray(data) ? data : []);
      } catch (err: any) {
        console.error("❌ Error:", err.message);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [courseId]);

  if (loading) return <p style={{ padding: 40 }}>Cargando tareas...</p>;

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
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>
          Tareas del curso #{courseId}
        </h1>

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
            href={`/teacher/courses/${courseId}/tasks/new`}
            style={{
              padding: "8px 16px",
              backgroundColor: "#00b894",
              color: "#fff",
              borderRadius: 6,
              textDecoration: "none",
            }}
          >
            Crear tarea
          </Link>
        </div>
      </header>

      {/* TASK CARDS */}
      <main
        style={{
          display: "grid",
          gap: 24,
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        }}
      >
        {tasks.length === 0 ? (
          <p>No hay tareas registradas en este curso.</p>
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
                Fecha:{" "}
                {new Date(task.fechaEntrega).toLocaleDateString("es-PE")}
              </p>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
