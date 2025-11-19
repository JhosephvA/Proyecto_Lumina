"use client";

import { useEffect, useState } from "react";

interface Task {
  id: number;
  titulo: string;
  descripcion: string;
  fechaEntrega: string;
  curso: {
    id: number;
    nombre: string;
  };
  nota?: string | number;
  archivoURL?: string;
}

export default function StudentTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:3000/api/student/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setTasks(data))
      .finally(() => setLoading(false));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file || !selectedTask) return;
    setUploading(true);

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("archivoURL", file);

    try {
      const res = await fetch(`http://localhost:3000/api/student/tasks/${selectedTask.id}/submit`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Error al subir archivo");

      const updatedSubmission = await res.json();

      // Actualizar tarea local
      setTasks(prev =>
        prev.map(t =>
          t.id === selectedTask.id
            ? { ...t, archivoURL: updatedSubmission.archivoURL, nota: updatedSubmission.nota }
            : t
        )
      );

      alert("Archivo subido correctamente");
      setSelectedTask(null);
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Error al subir el archivo");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <p style={{ padding: 40 }}>Cargando tareas...</p>;

  return (
    <div style={{ minHeight: "100vh", padding: 40, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", background: "#f5f6fa", color: "#333" }}>
      <h1>Mis Tareas</h1>

      {tasks.length === 0 && <p>No tienes tareas asignadas.</p>}

      <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        {tasks.map(task => (
          <div
            key={task.id}
            style={{
              backgroundColor: "#74b9ff",
              borderRadius: 12,
              padding: 20,
              color: "#fff",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              transition: "transform 0.3s",
              cursor: "pointer",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            onClick={() => setSelectedTask(task)}
          >
            <h2 style={{ fontSize: 20, fontWeight: 700 }}>{task.titulo}</h2>
            <p style={{ fontSize: 14, opacity: 0.9 }}><strong>Curso:</strong> {task.curso?.nombre || "Sin curso"}</p>
            <p style={{ fontSize: 14, opacity: 0.9 }}><strong>Descripción:</strong> {task.descripcion}</p>
            <p style={{ fontSize: 14, opacity: 0.9 }}><strong>Fecha de entrega:</strong> {task.fechaEntrega}</p>
            <p style={{ fontSize: 14, opacity: 0.9 }}><strong>Nota:</strong> {task.nota ?? "No calificado"}</p>
            <p style={{ fontSize: 14, opacity: 0.9 }}>
              <strong>Archivo:</strong>{" "}
              {task.archivoURL ? <a href={task.archivoURL} target="_blank" style={{ color: "#ffeaa7", textDecoration: "underline" }}>Ver archivo</a> : "Sin entrega"}
            </p>
          </div>
        ))}
      </div>

      {/* Modal para subir archivo */}
      {selectedTask && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex", justifyContent: "center", alignItems: "center",
          zIndex: 1000,
        }}>
          <div style={{ backgroundColor: "#fff", padding: 30, borderRadius: 12, width: 400 }}>
            <h2>{selectedTask.titulo}</h2>
            <p><strong>Curso:</strong> {selectedTask.curso.nombre}</p>
            <p><strong>Descripción:</strong> {selectedTask.descripcion}</p>

            {/* Botón real para seleccionar archivo */}
            <label
              htmlFor="fileInput"
              style={{
                display: "inline-block",
                padding: "8px 16px",
                backgroundColor: "#74b9ff",
                color: "#fff",
                borderRadius: 6,
                cursor: "pointer",
                marginTop: 10,
              }}
            >
              Seleccionar archivo
            </label>
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {file && <p style={{ marginTop: 10 }}>Archivo seleccionado: {file.name}</p>}

            <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => { setSelectedTask(null); setFile(null); }} style={{ padding: "8px 16px" }}>Cancelar</button>
              <button
                onClick={handleSubmit}
                disabled={!file || uploading}
                style={{ padding: "8px 16px", backgroundColor: "#74b9ff", color: "#fff", border: "none", borderRadius: 6 }}
              >
                {uploading ? "Subiendo..." : "Subir archivo"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
