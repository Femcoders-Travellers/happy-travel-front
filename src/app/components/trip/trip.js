import { useAuthContext } from '@/context/authContext';
import styles from './trip.module.css';
import Image from 'next/image';
import Link from 'next/link';
import edit from '../../../../public/Edit-icon.svg';
import del from '../../../../public/Delete-icon.svg';
import { usePathname, useRouter } from 'next/navigation';
import { TripsService } from '@/services/tripsService'; // ✅

function Trip({ trip }) {
  const { country, city, description, image, username: tripUsername } = trip;
  const { isAuthenticated, username } = useAuthContext();
  const pathname = usePathname();
  const router = useRouter();

  const isOwner = isAuthenticated && username?.toLowerCase() === tripUsername?.toLowerCase();
  const showEditDelete = isOwner && pathname === '/auth';

  const { deleteDestinationById } = TripsService();

  const handleDelete = async () => {
    try {
      const response = await deleteDestinationById(trip.id);
      if (response.status === 200) {
        window.location.reload();
      } else {
        console.error("Error al borrar destino:", response.data);
      }
    } catch (error) {
      console.error("Error en la petición de borrado:", error);
    }
  };

  return (
    <div className={styles.ctTrip}>
      <Link href={`/destinations/${trip.id}`}>
        <div className={styles.ctImg}>
          <Image
            src={image}
            height={300}
            width={300}
            alt={country}
            priority
          />
        </div>
      </Link>

      <div className={styles.ctTxt}>
        <div>
          <h6>{country}</h6>
          <p>{city}</p>
        </div>
        {isOwner && showEditDelete && (
          <div>
            <Link href={`destinations/update/${trip.id}`}>
              <Image src={edit} height={40} width={40} alt="edit destination" />
            </Link>
            <button onClick={handleDelete} className={styles.deleteButton}>
              <Image src={del} height={40} width={40} alt="delete destination" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Trip;