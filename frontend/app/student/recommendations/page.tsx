"use client"

import Link from 'next/link'

export default function StudentRecommendations() {
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
        <h1 style={{ fontSize: 32, fontWeight: 700 }}>Recomendaciones</h1>
        <Link href="/student" style={{
          padding: '8px 16px',
          backgroundColor: '#0070f3',
          color: '#fff',
          borderRadius: 6,
          textDecoration: 'none'
        }}>Volver al dashboard</Link>
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {[
          'Revisa el capítulo 3 de Matemáticas',
          'Practica ejercicios de historia',
          'Consulta materiales extra de ciencias'
        ].map((rec, i) => (
          <div key={i} style={{
            backgroundColor: '#fdcb6e',
            padding: 20,
            borderRadius: 12,
            color: '#333',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
          }}>
            <p style={{ fontSize: 16 }}>{rec}</p>
          </div>
        ))}
      </main>
    </div>
  )
}
