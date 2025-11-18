"use client";

import { useState } from "react";
import Link from "next/link";
import { registerUser } from "@/lib/api";

export default function RegisterPage() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      await registerUser(nombre, apellido, email, password);

      alert("Registro exitoso. Ahora inicia sesión.");
      window.location.href = "/login";

    } catch (error: any) {
      alert(error.message || "Error al registrarte");
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #6b73ff 0%, #000dff 100%)",
      color: "#fff",
      padding: 20
    }}>
      <div style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: 40,
        borderRadius: 12,
        width: 360,
        textAlign: "center",
        backdropFilter: "blur(10px)"
      }}>
        <h2 style={{ fontSize: 32, marginBottom: 20 }}>Registrarse</h2>

        <form 
          onSubmit={handleRegister} 
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >

          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ padding: 12, borderRadius: 8, border: "none" }}
            required
          />

          <input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            style={{ padding: 12, borderRadius: 8, border: "none" }}
            required
          />

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

          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ padding: 12, borderRadius: 8, border: "none" }}
            required
          />

          <button
            type="submit"
            style={{
              padding: 12,
              borderRadius: 8,
              border: "none",
              backgroundColor: "#fff",
              color: "#0070f3",
              fontWeight: 600
            }}
          >
            Registrarse
          </button>
        </form>

        <p style={{ marginTop: 16 }}>
          ¿Ya tienes cuenta?
          <Link href="/login" style={{ color: "#fff", fontWeight: 600 }}>
            {" "}Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
