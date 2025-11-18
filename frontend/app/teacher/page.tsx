"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TeacherPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      window.location.href = "/";
      return;
    }

    const parsedUser = JSON.parse(storedUser);

    // VALIDACIÓN REAL → tu backend devuelve "profesor"
    const role = parsedUser.rol?.toLowerCase();

    if (role !== "profesor") {
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
    return <div style={{ padding: 40 }}>Cargando panel del profesor...</div>;
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: 40,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: '#f5f6fa',
      color: '#333'
    }}>
      
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40
      }}>
        <h1 style={{ fontSize: 32, fontWeight: 700 }}>
          Bienvenido Profesor
        </h1>

        <button
          onClick={logout}
          style={{
            padding: "8px 16px",
            backgroundColor: "#d63031",
            color: "#fff",
            borderRadius: 6,
            border: "none",
            cursor: "pointer"
          }}
        >
          Cerrar sesión
        </button>
      </header>

      {/* Dashboard Cards */}
      <main style={{ 
        display: 'grid', 
        gap: 24, 
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' 
      }}>
        {[
          { title: 'Mis Cursos', description: 'Ver y administrar tus cursos', color: '#74b9ff', href: "/teacher/courses" },
          { title: 'Tareas', description: 'Asignar y revisar tareas', color: '#55efc4', href: "#" },
          { title: 'Calificaciones', description: 'Controla el progreso de tus estudiantes', color: '#fd79a8', href: "#" },
          { title: 'Materiales', description: 'Sube y organiza recursos educativos', color: '#fdcb6e', href: "#" }
        ].map((card) => (
          <Link 
            key={card.title}
            href={card.href}
            style={{
              backgroundColor: card.color,
              borderRadius: 12,
              padding: 20,
              color: '#fff',
              boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
              transition: 'transform 0.3s',
              cursor: 'pointer',
              textDecoration: "none"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <h2 style={{ fontSize: 20, fontWeight: 700 }}>{card.title}</h2>
            <p style={{ fontSize: 14, opacity: 0.9 }}>{card.description}</p>
          </Link>
        ))}
      </main>
    </div>
  );
}
