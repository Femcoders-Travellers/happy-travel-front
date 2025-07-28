"use client";

import Image from 'next/image';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/authContext";
import { UsersService } from "@/services/usersService";
import Users from "../components/users/users";
import create from '../../../public/Create-icon.svg';
import Link from 'next/link';
import styles from "./page.module.css";

export default function AdminUsersPage() {
    const { isAuthenticated, role } = useAuthContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated || role !== "[ROLE_ADMIN]") {
            return;
        }

        UsersService().getUsers()
            .then(res => setUsers(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [isAuthenticated, role]);

    return (
        !role ? (
            <h3 className={styles.loading}>Cargando datos...</h3>
        ) : role !== "[ROLE_ADMIN]" ? (
            <h3 className={styles.loading}>No autorizado</h3>
        ) : (
            <main className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Gestión de Usuarios</h2>
                    <Link href='/users/create'>
                        <Image
                            src={create}
                            width={40}
                            height={40}
                            alt='crear destino'
                            className={styles.createIcon}
                        />
                    </Link>
                </div>
                <Users users={users} />
            </main>
        )
    );
}