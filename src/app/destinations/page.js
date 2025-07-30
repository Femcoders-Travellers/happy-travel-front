'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TripsService } from "@/services/tripsService";
import styles from "./page.module.css";

export default function CreateDestinationPage() {
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const router = useRouter();
    const api = TripsService();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.createDestination({ city, country, description, image });
            router.push('/');
        } catch (error) {
            console.error("Error al crear destino:", error);
        }
    };

    return (
        <main className={styles.container}>
            <h2 className={styles.title}>Crear nuevo destino</h2>
            <form onSubmit={handleSubmit} className={styles.destinationform}>
                <input
                    type="text"
                    placeholder="Ciudad"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={styles.input}
                    required
                />
                <input
                    type="text"
                    placeholder="País"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className={styles.input}
                    required
                />
                <textarea
                    placeholder="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={styles.input}
                    required
                />
                <input
                    type="text"
                    placeholder="URL de la imagen"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className={styles.input}
                    required
                />
                <button type="submit" className={styles.submitbutton}>Crear destino</button>
            </form>
        </main>
    );
}