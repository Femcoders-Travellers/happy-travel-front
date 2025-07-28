'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { UsersService } from '@/services/usersService';

export default function DeleteUserPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const api = UsersService();

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
    if (isAdmin && id) {
      api.deleteUser(id)
        .then(() => router.push('/users'))
        .catch(err => console.error('Error al eliminar usuario:', err));
    }
  }, [isAdmin, id]);

  if (!isAdmin) return <p>No tienes permisos para acceder a esta página.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <p>Eliminando usuario...</p>
    </div>
  );
}