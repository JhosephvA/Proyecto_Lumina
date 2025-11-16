"use client"

import Link from 'next/link'

export default function StudentCourses() {
  return (
    <div style={{
      minHeight: '100vh',
      padding: 40,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: '#f5f6fa',
      color: '#333'
    }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40
      }}>
        <h1 style={{ fontSize: 32, fontWeight: 700 }}>Mis Cursos</h1>
        <Link href="/student" style={{
          padding: '8px 16px',
          backgroundColor: '#0070f3',
          color: '#fff',
          borderRadius: 6,
          textDecoration: 'none'
        }}>Volver al dashboard</Link>
      </header>

      <main style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        {['Curso 1', 'Curso 2', 'Curso 3'].map(course => (
          <div key={course} style={{
            backgroundColor: '#74b9ff',
            borderRadius: 12,
            padding: 20,
            color: '#fff',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            transition: 'transform 0.3s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <h2 style={{ fontSize: 20, fontWeight: 700 }}>{course}</h2>
            <p style={{ fontSize: 14, opacity: 0.9 }}>Descripción del curso</p>
          </div>
        ))}
      </main>
    </div>
  )
}
