"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>; // params es una promesa
}

export default function CreateTask({ params }: Props) {
  const { id: courseId } = use(params);
  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaLimite, setFechaLimite] = useState("");
  const [semana, setSemana] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert("No hay token disponible. Inicia sesión primero.");
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://nuevolumina-backend.onrender.com/api/professor/courses/${courseId}/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            titulo,
            descripcion,
            fechaEntrega: fechaLimite,
            courseId,
            semana,
          }),
        }
      );

      if (!res.ok) throw new Error("Error al crear tarea");

      router.push(`/teacher/courses/${courseId}`);
    } catch (err) {
      console.error(err);
      alert("❌ No se pudo crear la tarea. Revisa la consola.");
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
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20 }}>Crear Tarea</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 16,
          maxWidth: 600,
          background: "#fff",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <input
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 8,
            border: "1px solid #dfe6e9",
            fontSize: 16,
          }}
          required
        />
        <textarea
          placeholder="Descripción (opcional)"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 8,
            border: "1px solid #dfe6e9",
            fontSize: 16,
            resize: "vertical",
            minHeight: 80,
          }}
        />
        <input
          type="date"
          value={fechaLimite}
          onChange={(e) => setFechaLimite(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 8,
            border: "1px solid #dfe6e9",
            fontSize: 16,
          }}
          required
        />
        <input
          type="number"
          min={1}
          value={semana}
          onChange={(e) => setSemana(Number(e.target.value))}
          style={{
            padding: 12,
            borderRadius: 8,
            border: "1px solid #dfe6e9",
            fontSize: 16,
          }}
          required
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px 18px",
            background: "#6c5ce7",
            color: "#fff",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Guardando..." : "Guardar Tarea"}
        </button>
      </form>
    </div>
  );
}
