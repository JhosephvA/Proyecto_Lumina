"use client";

import { useState } from "react";
import Link from "next/link";
import { loginUser } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginUser(email, password);

      console.log("RESPUESTA LOGIN:", data);

      alert("Inicio de sesión exitoso");

      // ============================
      // Rol normalizado
      // ============================
      const role = data.user.rol?.toLowerCase();

      // ============================
      // Redirección por rol
      // ============================
      if (role === "admin") {
        window.location.href = "/admin";
      } else if (role === "profesor" || role === "teacher") {
        window.location.href = "/teacher";
      } else if (role === "estudiante") {
        window.location.href = "/student";
      } else {
        alert("Rol desconocido: " + role);
      }

    } catch (error: unknown) {
      // Comprobamos si el error es una instancia de Error
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Error al iniciar sesión");
      }
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
            }}>
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
