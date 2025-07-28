'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TripsService } from "@/services/tripsService";
import { useAuthContext } from '@/context/authContext';
import Link from 'next/link';
import Image from "next/image";
import edit from '../../../../public/Edit-icon.svg';
import del from '../../../../public/Delete-icon.svg';
import styles from './page.module.css';

export default function TripDetailPage({ params }) {
    const { isAuthenticated, username } = useAuthContext();
    const { id } = params;
    const [trip, setTrip] = useState(null);
    const [error, setError] = useState("");
    const router = useRouter();
    const api = TripsService();

    

    useEffect(() => {
        if (!id) return;

        api.getTripById(id)
            .then(res => setTrip(res.data))
            .catch(err => {
                console.error(err);
                setError("Destino no encontrado");
                setTrip(null);
            });
            
    }, [id]);

    if (error) {
        return (
            <div className={styles.ctPage}>
                <h2>{error}</h2>
                <button onClick={() => router.back()} className={styles.btCancel}>
                    Volver
                </button>
            </div>
        );
    }

    if (!trip) {
        return (
            <div className={styles.ctPage}>
                <h2>Cargando destino...</h2>
            </div>
        );
    }

    return (
        <div className={styles.ctTripDetail}>
            <h1 className={styles.title}>{trip.country}</h1>
            <p className={styles.title}>{trip.city}</p>
            <div className={styles.ctImg}>
                <Image
                    src={trip.image}
                    alt={trip.country}
                    width={600}
                    height={400}
                    className={styles.imgTrip}
                    priority
                />
            </div>
            <p className={styles.description}>{trip.description}</p>
            {
            isAuthenticated && trip?.user?.username && username === trip.user.username &&
                <div>
                    <Link href={`/update/${trip.id}`}>
                        <Image
                            src={edit}
                            height={40}
                            width={40}
                            alt='edit destination'
                        />
                    </Link>
                    <Link href={`/delete/${trip.id}`}>
                        <Image
                            src={del}
                            height={40}
                            width={40}
                            alt='delete destination'
                        />
                    </Link>
                </div>
            }
        </div>
    );
}