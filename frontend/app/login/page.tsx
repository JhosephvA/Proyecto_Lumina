"use client"

import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica real de login
    alert(`Email: ${email}\nPassword: ${password}`)
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #6b73ff 0%, #000dff 100%)',
      color: '#fff',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: 20
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 40,
        borderRadius: 12,
        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        width: 360,
        textAlign: 'center',
        backdropFilter: 'blur(10px)'
      }}>
        <h2 style={{ fontSize: 32, marginBottom: 20, fontWeight: 700 }}>Iniciar sesión</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: '12px 16px',
              borderRadius: 8,
              border: 'none',
              fontSize: 16
            }}
            required
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '12px 16px',
              borderRadius: 8,
              border: 'none',
              fontSize: 16
            }}
            required
          />
          <button type="submit" style={{
            padding: '12px 0',
            borderRadius: 8,
            border: 'none',
            backgroundColor: '#fff',
            color: '#0070f3',
            fontWeight: 600,
            fontSize: 16,
            cursor: 'pointer',
            transition: '0.3s'
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
          >
            Entrar
          </button>
        </form>
        <p style={{ marginTop: 16, fontSize: 14, opacity: 0.85 }}>
          ¿No tienes cuenta? <Link href="/register" style={{ color: '#fff', fontWeight: 600 }}>Regístrate</Link>
        </p>
      </div>
    </div>
  )
}
