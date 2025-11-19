"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MaterialsPage() {
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

      const res = await fetch("http://localhost:3000/api/professor/materials", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const contentType = res.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        console.error("❌ El backend no devolvió JSON.");
        console.log("Contenido devuelto:", await res.text());
        setMateriales([]);
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log("👉 DATA RECIBIDA:", data);

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
    <div className="p-6">

      {/* TITULO ARRIBA IZQUIERDA */}
      <h1 className="text-2xl font-bold mb-4">Mis Materiales</h1>

      {/* FILA DE BOTONES */}
      <div className="flex justify-between items-center mb-6">
        {/* Botón izquierda */}
        <Link
          href="/teacher"
          className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded"
        >
          ⬅ Volver al Dashboard
        </Link>

        {/* Botón derecha */}
        <Link
          href="/teacher/materials/new"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Crear material
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Cargando materiales...</p>
      ) : materiales.length === 0 ? (
        <p className="text-gray-500">No hay materiales aún.</p>
      ) : (
        <div className="space-y-4">
          {materiales.map((m: any) => (
            <div
              key={m.id}
              className="p-4 bg-white shadow rounded border flex justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold">{m.titulo}</h2>
                <p>{m.descripcion}</p>

                <p className="text-sm text-gray-500 mt-1">
                  Curso: {m.curso?.nombre || "Sin curso asignado"}
                </p>

                {m.archivoUrl && (
                  <a
                    href={m.archivoUrl}
                    target="_blank"
                    className="text-blue-600 underline mt-2 block"
                  >
                    Ver archivo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
