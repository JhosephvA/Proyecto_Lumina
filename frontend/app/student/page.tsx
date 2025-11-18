"use client"

import Link from 'next/link'

export default function StudentPage() {
  const cards = [
    { title: 'Mis Cursos', description: 'Accede a tus cursos activos', color: '#74b9ff', href: '/student/courses' },
    { title: 'Tareas', description: 'Revisa y entrega tus tareas', color: '#55efc4', href: '/student/tasks' },
    { title: 'Calificaciones', description: 'Consulta tu progreso y notas', color: '#fd79a8', href: '/student/grades' },
    { title: 'Recomendaciones', description: 'Recibe sugerencias personalizadas', color: '#fdcb6e', href: '/student/recommendations' }
  ]

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
        <h1 style={{ fontSize: 32, fontWeight: 700 }}>Panel de Estudiante</h1>
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
        {cards.map(card => (
          <Link key={card.title} href={card.href} style={{ textDecoration: 'none' }}>
            <div style={{
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
          </Link>
        ))}
      </main>
    </div>
  )
}
