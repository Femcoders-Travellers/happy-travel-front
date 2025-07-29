'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { UsersService } from '@/services/usersService';
import styles from './page.module.css';

export default function UserProfilePage() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const api = UsersService();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.getUserByUsername(username);
        setUserData(response);
      } catch (err) {
        setError('No se pudo cargar la información del usuario.');
        console.error(err);
      }
    };

    if (username) fetchUser();
  }, [username]);

  if (error) return <p>{error}</p>;
  if (!userData) return <p>Cargando datos del usuario...</p>;

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>Mi perfil</h2>
      <div className={styles.card}>
        <p><strong>Nombre de usuario:</strong> {userData.username}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Rol:</strong> {userData.roles?.map(role => role.replace('ROLE_', '')).join(', ')}</p>      </div>
    </main>
  );
}