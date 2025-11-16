"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100) // pequeño delay antes de animar
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #6b73ff 0%, #000dff 100%)',
      color: '#fff',
      gap: 40,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      textAlign: 'center',
      overflow: 'hidden'
    }}>
      {/* Logo y nombre */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        transform: loaded ? 'translateY(0)' : 'translateY(-50px)',
        opacity: loaded ? 1 : 0,
        transition: 'all 0.8s ease-out'
      }}>
        <img 
          src="/logo.png" 
          alt="Lumina Edu" 
          style={{ 
            width: 140, 
            height: 'auto', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)', 
            borderRadius: 12 
          }} 
        />
        <h1 style={{ fontSize: 56, fontWeight: 700, margin: 0, textShadow: '1px 1px 4px rgba(0,0,0,0.3)' }}>
          Lumina Edu
        </h1>
        <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 450 }}>
          La plataforma educativa moderna para academias y centros de preparación
        </p>
      </div>

      {/* Botones */}
      <div style={{
        display: 'flex',
        gap: 20,
        transform: loaded ? 'translateY(0)' : 'translateY(50px)',
        opacity: loaded ? 1 : 0,
        transition: 'all 1s ease-out 0.5s' // delay para que aparezcan después del logo
      }}>
        <Link href="/login">
          <button style={{
            padding: '14px 36px',
            borderRadius: 10,
            border: 'none',
            backgroundColor: '#fff',
            color: '#0070f3',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: 18,
            transition: '0.3s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
          >
            Iniciar sesión
          </button>
        </Link>
        <Link href="/register">
          <button style={{
            padding: '14px 36px',
            borderRadius: 10,
            border: '2px solid #fff',
            backgroundColor: 'transparent',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: 18,
            transition: '0.3s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
          >
            Registrarse
          </button>
        </Link>
      </div>
    </div>
  )
}
