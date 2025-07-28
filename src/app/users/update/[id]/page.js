'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuthContext } from "@/context/authContext";
import { UsersService } from '@/services/usersService';
import styles from "../../page.module.css";

export default function UpdateUserPage() {
  const { isAuthenticated, role } = useAuthContext();
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const api = UsersService();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('USER');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const rawRole = payload.role || '';
      setIsAdmin(rawRole.includes('ROLE_ADMIN'));
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const rawRole = payload.role || '';
        const isAdminCheck = rawRole.includes('ROLE_ADMIN');
        setIsAdmin(isAdminCheck);

        if (isAdminCheck && id) {
          try {
            const data = await api.getUserById(id);
            setUsername(data.username || '');
            setEmail(data.email || '');
            setSelectedRole(data.role?.replace('[', '').replace(']', '') || 'USER');
          } catch (err) {
            console.error('Error al obtener datos del usuario:', err);
          }
        }
      }
    };

    fetchUser();
  }, [id]);

const handleSubmit = async (e) => {
  e.preventDefault();

  const userData = {
    username,
    email,
    roles: [`ROLE_${selectedRole}`]
  };

  try {
    await api.updateUser(id, userData);
    router.push('/users');
  } catch (err) {
    console.error('Error al actualizar usuario:', err);
  }
};

      return (
          !role ? (
              <h3 className={styles.loading}>Cargando datos...</h3>
          ) : role !== "[ROLE_ADMIN]" ? (
              <h3 className={styles.loading}>No autorizado</h3>
          ) : (
              <main className={styles.container}>
                  <div className={styles.header}>
                    <h2 className={styles.title}>Editar usuario</h2>
                  </div>
                    <form className={styles.userform} onSubmit={handleSubmit}>
                      <input className={styles.input} id="username" name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                      <input className={styles.input} id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                      <select style={{ display: "none" }} className={styles.input} id="role" name="role" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                      <button className={styles.submitbutton} type="submit">Actualizar</button>
                    </form>
              </main>
          )
      );
}