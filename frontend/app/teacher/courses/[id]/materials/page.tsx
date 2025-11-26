"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function MaterialsPage() {
  const { id } = useParams();
  const courseId = Number(id);

  const [materiales, setMateriales] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const obtenerMateriales = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("❌ No hay token en localStorage");
        setLoading(false);
        return;
      }

      const res = await fetch(
        `http://localhost:3000/api/professor/courses/${courseId}/materials`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        console.error("❌ El backend no devolvió JSON.");
        console.log("Contenido devuelto:", await res.text());
        setMateriales([]);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setMateriales(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al obtener materiales:", error);
      setMateriales([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerMateriales();
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
      {/* HEADER */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <h1 style={{ fontSize: 32, fontWeight: 700 }}>
          Materiales del curso #{courseId}
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
            href={`/teacher/courses/${courseId}/materials/new`}
            style={{
              padding: "8px 16px",
              backgroundColor: "#00b894",
              color: "#fff",
              borderRadius: 6,
              textDecoration: "none",
            }}
          >
            Crear Material
          </Link>
        </div>
      </header>

      {/* LISTADO */}
      {loading ? (
        <p style={{ padding: 40 }}>Cargando materiales...</p>
      ) : materiales.length === 0 ? (
        <p>No hay materiales en este curso.</p>
      ) : (
        <main
          style={{
            display: "grid",
            gap: 24,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          {materiales.map((m: any) => (
            <div
              key={m.id}
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
                {m.titulo}
              </h2>

              <p style={{ fontSize: 14, opacity: 0.9 }}>
                {m.descripcion || "Sin descripción"}
              </p>

              {m.archivoUrl && (
                <a
                  href={m.archivoUrl}
                  target="_blank"
                  style={{
                    color: "#fff",
                    textDecoration: "underline",
                    fontSize: 14,
                    marginTop: 12,
                    display: "block",
                  }}
                >
                  Ver archivo
                </a>
              )}
            </div>
          ))}
        </main>
      )}
    </div>
  );
}
