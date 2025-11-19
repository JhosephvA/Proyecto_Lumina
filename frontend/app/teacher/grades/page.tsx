"use client";

import { useEffect, useState } from "react";

interface Grade {
  id: number;
  nota: number | null;
  archivoURL: string | null;
  fechaEntrega: string;
  tarea?: {
    id: number;
    titulo: string;
    curso?: {
      id: number;
      nombre: string;
    };
  };
  estudiante?: {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
  };
}

export default function TeacherGrades() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGrades() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No se encontró token. Redirigiendo al login...");
          window.location.href = "/";
          return;
        }

        const res = await fetch("http://localhost:3000/api/professor/grades", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error("❌ Error HTTP:", res.status, res.statusText);
          setError(`No se pudieron cargar las notas (HTTP ${res.status})`);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setGrades(data);
      } catch (err) {
        console.error("❌ Error cargando notas:", err);
        setError("Error inesperado al cargar notas.");
      } finally {
        setLoading(false);
      }
    }

    loadGrades();
  }, []);

  if (loading) return <p style={{ padding: 40 }}>Cargando notas...</p>;

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
        <h1 style={{ fontSize: 32, fontWeight: 700 }}>Notas de estudiantes</h1>
        <a
          href="/teacher"
          style={{
            padding: "8px 16px",
            backgroundColor: "#0070f3",
            color: "#fff",
            borderRadius: 6,
            textDecoration: "none",
          }}
        >
          ← Volver al dashboard
        </a>
      </header>

      {error && <p style={{ color: "red" }}>❌ {error}</p>}

      {grades.length === 0 && !loading && !error && (
        <p>No hay notas registradas.</p>
      )}

      {grades.length > 0 && (
        <main
          style={{
            display: "grid",
            gap: 24,
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
        >
          {grades.map((g) => (
            <div
              key={g.id}
              style={{
                backgroundColor: "#74b9ff",
                borderRadius: 12,
                padding: 20,
                color: "#fff",
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                transition: "transform 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h2 style={{ fontSize: 18, fontWeight: 700 }}>
                {g.estudiante?.nombre || "Estudiante sin nombre"}{" "}
                {g.estudiante?.apellido || ""}
              </h2>
              <p style={{ fontSize: 14, opacity: 0.9 }}>
                <strong>Curso:</strong> {g.tarea?.curso?.nombre || "Sin curso"}
              </p>
              <p style={{ fontSize: 14, opacity: 0.9 }}>
                <strong>Tarea:</strong> {g.tarea?.titulo || "Sin tarea"}
              </p>
              <p style={{ fontSize: 14, opacity: 0.9 }}>
                <strong>Nota:</strong> {g.nota !== null ? g.nota : "No calificado"}
              </p>
              <p style={{ fontSize: 14, opacity: 0.9 }}>
                <strong>Archivo:</strong>{" "}
                {g.archivoURL ? (
                  <a
                    href={g.archivoURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#fff", textDecoration: "underline" }}
                  >
                    Ver archivo
                  </a>
                ) : (
                  "Sin archivo"
                )}
              </p>
            </div>
          ))}
        </main>
      )}
    </div>
  );
}
