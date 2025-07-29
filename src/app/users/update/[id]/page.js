"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuthContext } from "@/context/authContext";
import { UsersService } from "@/services/usersService";
import styles from "../../page.module.css";

export default function UpdateUserPage() {
  const { isAuthenticated, role } = useAuthContext();
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const api = UsersService();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("USER");
  const [isAdmin, setIsAdmin] = useState(false);
  const [authUserId, setAuthUserId] = useState(null);
  const [isEditingSelf, setIsEditingSelf] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const rawRole = payload.role || "";
      const userIdFromToken = payload.id || null;

      setIsAdmin(rawRole.includes("ROLE_ADMIN"));
      setAuthUserId(userIdFromToken);
      if (userIdFromToken && id) {
        setIsEditingSelf(userIdFromToken.toString() === id);
      }
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const rawRole = payload.role || "";
        const isAdminCheck = rawRole.includes("ROLE_ADMIN");
        setIsAdmin(isAdminCheck);

        if ((isAdminCheck || id === authUserId?.toString()) && id) {
          try {
            const data = await api.getUserById(id);
            setUsername(data.username || "");
            setEmail(data.email || "");
            setPassword(data.password || "");
            const roleName = Array.isArray(data.roles) && data.roles.length > 0
              ? data.roles[0].replace("ROLE_", "")
              : "USER";
            setSelectedRole(roleName);
          } catch (err) {
            console.error("Error al obtener datos del usuario:", err);
          }
        }
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditingSelf) return;
    const userData = {
      username,
      email,
      ...(password && { password }),
      roles: [`ROLE_${selectedRole}`],
    };
    try {
      await api.updateUser(id, userData);
      router.push("/users");
    } catch (err) {
      console.error("Error al actualizar usuario:", err);
    }
  };

  return !role ? (
    <h3 className={styles.loading}>Cargando datos...</h3>
  ) : role !== "[ROLE_ADMIN]" ? (
    <h3 className={styles.loading}>No autorizado</h3>
  ) : (
    <main className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Editar usuario</h2>
      </div>
      {isEditingSelf && (
        <p className={styles.info}>
          No puedes modificar tus propios datos mientras estás logueado.
        </p>
      )}
      <form className={styles.userform} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={isEditingSelf}
        />
        <input
          className={styles.input}
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isEditingSelf}
        />
        <select
          className={styles.input}
          id="role"
          name="role"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          disabled={!isAdmin || isEditingSelf}
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button className={styles.submitbutton} type="submit" disabled={isEditingSelf}>
          Actualizar
        </button>
      </form>
    </main>
  );
}
