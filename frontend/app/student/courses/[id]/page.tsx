"use client";

import { use, useEffect, useState } from "react";

interface Material {
  type: string;
  title?: string;
  url?: string;
  list?: Task[];
}

interface Task {
  id: number;
  titulo: string;
  descripcion: string;
  fechaEntrega: string;
}

export default function StudentCourseDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: courseId } = use(params);

  const [materials, setMaterials] = useState<Material[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [courseName, setCourseName] = useState("Curso");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        /** ✅ 1. OBTENER NOMBRE DEL CURSO **/
        const resCourses = await fetch(
          `https://nuevolumina-backend.onrender.com/api/student/courses`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (resCourses.ok) {
          const courses = await resCourses.json();
          const currentCourse = courses.find(
            (c: any) => c.Curso?.id == courseId
          );

          if (currentCourse?.Curso?.nombre) {
            setCourseName(currentCourse.Curso.nombre);
          }
        }

        /** ✅ 2. OBTENER MATERIALES Y TAREAS **/
        const res = await fetch(
          `https://nuevolumina-backend.onrender.com/api/student/courses/${courseId}/materials`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Error al cargar contenido del curso");

        const data = await res.json();

        const tareas =
          data.materials.find((m: any) => m.type === "Tareas")?.list || [];

        const materialesReales = data.materials.filter(
          (m: any) => m.type !== "Tareas"
        );

        setTasks(tareas);
        setMaterials(materialesReales);
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
      {/* ✅ NOMBRE REAL DEL CURSO */}
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20 }}>
        {courseName}
      </h1>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
          Semana 1
        </h2>

        {/* ✅ MATERIALES */}
        <div style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>Materiales</h3>

          {materials.length === 0 ? (
            <p>No hay materiales para este curso.</p>
          ) : (
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "grid",
                gap: 8,
              }}
            >
              {materials.map((m, idx) => (
                <li
                  key={`material-${idx}`}
                  style={{
                    background: "#74b9ff",
                    padding: 12,
                    borderRadius: 8,
                    color: "#fff",
                  }}
                >
                  <h4 style={{ fontWeight: 700 }}>{m.title}</h4>

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

        {/* ✅ TAREAS */}
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 600 }}>Tareas</h3>

          {tasks.length === 0 ? (
            <p>No hay tareas publicadas.</p>
          ) : (
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "grid",
                gap: 8,
              }}
            >
              {tasks.map((t) => (
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
                    Fecha límite:{" "}
                    {t.fechaEntrega
                      ? new Date(t.fechaEntrega).toLocaleDateString()
                      : "Sin fecha"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
