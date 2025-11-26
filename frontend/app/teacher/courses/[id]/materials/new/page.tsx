"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function NewMaterialPage() {
  const { id } = useParams();                 // ← ID del curso
  const courseId = Number(id);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [archivoUrl, setArchivoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No estás autenticado");
      setLoading(false);
      return;
    }

    const body = {
      titulo,
      descripcion,
      archivoUrl,
    };

    try {
      const res = await fetch(
        `http://localhost:3000/api/professor/courses/${courseId}/materials`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ Error:", errorText);
        alert("Error al crear material.");
        return;
      }

      alert("✅ Material creado con éxito");

      // limpiar formulario
      setTitulo("");
      setDescripcion("");
      setArchivoUrl("");

    } catch (error) {
      console.error("❌ Error:", error);
      alert("No se pudo crear el material.");
    } finally {
      setLoading(false);
    }
  };

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
          Nuevo material para el curso #{courseId}
        </h1>

        <div>
          <Link
            href={`/teacher/courses/${courseId}/materials`}
            style={{
              padding: "8px 16px",
              backgroundColor: "#0070f3",
              color: "#fff",
              borderRadius: 6,
              textDecoration: "none",
              marginRight: 10,
            }}
          >
            Ver materiales
          </Link>

          <Link
            href={`/teacher/courses/${courseId}`}
            style={{
              padding: "8px 16px",
              backgroundColor: "#636e72",
              color: "#fff",
              borderRadius: 6,
              textDecoration: "none",
            }}
          >
            Volver al curso
          </Link>
        </div>
      </header>

      {/* FORM CARD */}
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          background: "#fff",
          padding: 30,
          borderRadius: 12,
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Título */}
          <div>
            <label style={{ fontWeight: 600 }}>Título</label>
            <input
              style={{
                border: "1px solid #ccc",
                padding: 10,
                borderRadius: 6,
                width: "100%",
                marginTop: 4,
              }}
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          {/* Descripción */}
          <div>
            <label style={{ fontWeight: 600 }}>Descripción</label>
            <textarea
              style={{
                border: "1px solid #ccc",
                padding: 10,
                borderRadius: 6,
                width: "100%",
                marginTop: 4,
              }}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          {/* Archivo URL */}
          <div>
            <label style={{ fontWeight: 600 }}>
              URL del archivo (PDF, Drive, etc.)
            </label>
            <input
              style={{
                border: "1px solid #ccc",
                padding: 10,
                borderRadius: 6,
                width: "100%",
                marginTop: 4,
              }}
              value={archivoUrl}
              onChange={(e) => setArchivoUrl(e.target.value)}
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px 20px",
              backgroundColor: "#00b894",
              color: "#fff",
              borderRadius: 6,
              border: "none",
              marginTop: 10,
              cursor: "pointer",
              fontWeight: 600,
              display: "block",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Creando..." : "Crear material"}
          </button>
        </form>
      </div>
    </div>
  );
}
