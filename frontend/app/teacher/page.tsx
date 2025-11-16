"use client"

import Link from 'next/link'

export default function TeacherPage() {
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
        <h1 style={{ fontSize: 32, fontWeight: 700 }}>Panel de Profesor</h1>
        <Link href="/" style={{
          padding: '8px 16px',
          backgroundColor: '#0070f3',
          color: '#fff',
          borderRadius: 6,
          textDecoration: 'none'
        }}>Cerrar sesión</Link>
      </header>

      {/* Dashboard Cards */}
      <main style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        {[
          { title: 'Mis Cursos', description: 'Ver y administrar tus cursos', color: '#74b9ff' },
          { title: 'Tareas', description: 'Asignar y revisar tareas', color: '#55efc4' },
          { title: 'Calificaciones', description: 'Controla el progreso de tus estudiantes', color: '#fd79a8' },
          { title: 'Materiales', description: 'Sube y organiza recursos educativos', color: '#fdcb6e' }
        ].map((card) => (
          <div key={card.title} style={{
            backgroundColor: card.color,
            borderRadius: 12,
            padding: 20,
            color: '#fff',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
            transition: 'transform 0.3s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <h2 style={{ fontSize: 20, fontWeight: 700 }}>{card.title}</h2>
            <p style={{ fontSize: 14, opacity: 0.9 }}>{card.description}</p>
          </div>
        ))}
      </main>
    </div>
  )
}
