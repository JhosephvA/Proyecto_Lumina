"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      window.location.href = "/";
      return;
    }

    const parsedUser = JSON.parse(storedUser);

    // VALIDACIÓN DEL ROL: debe ser admin
    const role = parsedUser.rol?.toLowerCase();

    if (role !== "admin") {
      window.location.href = "/";
      return;
    }

    setUser(parsedUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  if (!user) {
    return (
      <div style={{ padding: 40 }}>
        Cargando panel del administrador...
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      padding: 40,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: "#f5f6fa",
      color: "#333",
    }}>
      
      {/* Header */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 40,
      }}>
        <h1 style={{ fontSize: 32, fontWeight: 700 }}>
          Bienvenido Administrador
        </h1>

        <button
          onClick={logout}
          style={{
            padding: "8px 16px",
            backgroundColor: "#d63031",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Cerrar sesión
        </button>
      </header>

      {/* Dashboard Cards */}
      <main
        style={{
          display: "grid",
          gap: 24,
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        {[
          { title: "Usuarios", description: "Gestiona todos los usuarios", color: "#ff7675" },
          { title: "Cursos", description: "Gestiona los cursos disponibles", color: "#74b9ff" },
          { title: "Matrículas", description: "Controla las matrículas de estudiantes", color: "#55efc4" },
          { title: "Reportes", description: "Visualiza estadísticas y reportes", color: "#fdcb6e" },
        ].map((card) => (
          <div
            key={card.title}
            style={{
              backgroundColor: card.color,
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
            <h2 style={{ fontSize: 20, fontWeight: 700 }}>{card.title}</h2>
            <p style={{ fontSize: 14, opacity: 0.9 }}>{card.description}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
