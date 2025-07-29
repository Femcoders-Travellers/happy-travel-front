"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/authContext";
import { UsersService } from "@/services/usersService";
import styles from "../page.module.css";

export default function CreateUserPage() {
  const { isAuthenticated, role } = useAuthContext();
  const router = useRouter();
  const api = UsersService();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("USER");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const rawRole = payload.role || "";
      setIsAdmin(rawRole.includes("ROLE_ADMIN"));
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const rolesToSend = [`ROLE_${selectedRole}`];
    try {
      await api.createUser({ username, email, password, roles: rolesToSend });
      router.push("/users");
    } catch (err) {
      console.error("Error al crear usuario:", err);
    }
  };
  return !role ? (
    <h3 className={styles.loading}>Cargando datos...</h3>
  ) : role !== "[ROLE_ADMIN]" ? (
    <h3 className={styles.loading}>No autorizado</h3>
  ) : (
    <main className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Crear nuevo usuario</h2>
      </div>
      <form className={styles.userform} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          id="username"
          name="username"
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className={styles.input}
          id="email"
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={styles.input}
          id="password"
          name="password"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          className={styles.input}
          id="role"
          name="role"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button className={styles.submitbutton} type="submit">
          Crear usuario
        </button>
      </form>
    </main>
  );
}
