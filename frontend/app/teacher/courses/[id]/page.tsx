"use client";

import { use, useEffect, useState } from "react";

interface Material {
  id: number;
  titulo: string;
  descripcion: string;
  url: string;
  semana: number;
}

interface Task {
  id: number;
  titulo: string;
  descripcion: string;
  fechaLimite: string;
  semana: number;
}

export default function CourseDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id: courseId } = use(params);

  const [materials, setMaterials] = useState<Material[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resMaterials, resTasks] = await Promise.all([
          fetch(
            `https://nuevolumina-backend.onrender.com/api/professor/courses/${courseId}/materials`,
            { headers: { Authorization: `Bearer ${token}` } }
          ),
          fetch(
            `https://nuevolumina-backend.onrender.com/api/professor/courses/${courseId}/tasks`,
            { headers: { Authorization: `Bearer ${token}` } }
          ),
        ]);

        if (!resMaterials.ok) throw new Error("Error al cargar materiales");
        if (!resTasks.ok) throw new Error("Error al cargar tareas");

        setMaterials(await resMaterials.json());
        setTasks(await resTasks.json());
      } catch (error) {
        console.error("❌ Error al cargar datos del curso:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, token]);

  if (loading)
    return <div style={{ padding: 40 }}>Cargando contenido del curso...</div>;

  // Obtener las semanas disponibles
  const semanas = Array.from(
    new Set([...materials.map(m => m.semana), ...tasks.map(t => t.semana)])
  ).sort((a, b) => a - b);

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
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20 }}>
        Curso #{courseId}
      </h1>

      {/* BOTONES */}
      <div style={{ display: "flex", gap: 16, marginBottom: 40 }}>
        <a
          href={`/teacher/courses/${courseId}/materials/create`}
          style={{
            padding: "10px 18px",
            background: "#0984e3",
            color: "#fff",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          ➕ Agregar Material
        </a>

        <a
          href={`/teacher/courses/${courseId}/tasks/create`}
          style={{
            padding: "10px 18px",
            background: "#6c5ce7",
            color: "#fff",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          ➕ Crear Tarea
        </a>
      </div>

      {/* SEMANAS */}
      {semanas.map((semana) => (
        <section key={`semana-${semana}`} style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
            Semana {semana}
          </h2>

          {/* MATERIALES */}
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600 }}>Materiales</h3>
            {materials.filter(m => m.semana === semana).length === 0 ? (
              <p>No hay materiales para esta semana.</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 8 }}>
                {materials
                  .filter(m => m.semana === semana)
                  .map((m) => (
                    <li
                      key={`material-${m.id}`}
                      style={{
                        background: "#74b9ff",
                        padding: 12,
                        borderRadius: 8,
                        color: "#fff",
                      }}
                    >
                      <h4 style={{ fontWeight: 700 }}>{m.titulo}</h4>
                      <p>{m.descripcion}</p>
                      {m.url && (
                        <a
                          href={m.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#ffeaa7" }}
                        >
                          Ver material
                        </a>
                      )}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* TAREAS */}
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600 }}>Tareas</h3>
            {tasks.filter(t => t.semana === semana).length === 0 ? (
              <p>No hay tareas para esta semana.</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 8 }}>
                {tasks
                  .filter(t => t.semana === semana)
                  .map((t) => (
                    <li
                      key={`task-${t.id}`}
                      style={{
                        background: "#55efc4",
                        padding: 12,
                        borderRadius: 8,
                        color: "#2d3436",
                      }}
                    >
                      <h4 style={{ fontWeight: 700 }}>{t.titulo}</h4>
                      <p>{t.descripcion}</p>
                      <p style={{ fontSize: 12, opacity: 0.7 }}>
                        Fecha límite: {new Date(t.fechaLimite).toLocaleDateString()}
                      </p>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}