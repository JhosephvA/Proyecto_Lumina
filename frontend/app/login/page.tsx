"use client";

import { useState } from "react";
import Link from "next/link";
import { loginUser } from "@/lib/api"; // IMPORTANTE

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);

      // Guardar token + usuario
      localStorage.setItem("token", data.tokens.accessToken);
      localStorage.setItem("refreshToken", data.tokens.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Inicio de sesión exitoso");

      // Redirigir según rol
      const role = data.user.rol; // ⬅ asegúrate de que sea 'rol' y no 'role'
      if (role === "ADMIN") window.location.href = "/admin";
      else if (role === "PROFESSOR") window.location.href = "/professor";
      else window.location.href = "/student";

    } catch (error: any) {
      alert(error.message || "Error al iniciar sesión");
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #6b73ff 0%, #000dff 100%)',
      color: '#fff',
      padding: 20
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 40,
        borderRadius: 12,
        width: 360,
        textAlign: 'center',
        backdropFilter: 'blur(10px)'
      }}>
        <h2 style={{ fontSize: 32, marginBottom: 20 }}>Iniciar sesión</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: 12, borderRadius: 8, border: "none" }}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: 12, borderRadius: 8, border: "none" }}
            required
          />

          <button type="submit"
            style={{
              padding: 12,
              borderRadius: 8,
              border: "none",
              backgroundColor: "#fff",
              color: "#0070f3",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Entrar
          </button>
        </form>

        <p style={{ marginTop: 16 }}>
          ¿No tienes cuenta?
          <Link href="/register" style={{ color: "#fff", fontWeight: 600 }}> Regístrate</Link>
        </p>
      </div>
    </div>
  );
}
