'use client'

import { useEffect, useState } from 'react';
import Trips from '../components/trips/trips';
import styles from '../page.module.css';
import { TripsService } from '@/services/tripsService';

function Page() {

  const [tripsAuth, setTripsAuth] = useState();
  const api = TripsService();

    useEffect(() => {
      const userId = JSON.parse(localStorage.getItem('authUser'))?.id;
      if (userId) {
        api.getTripsOrderByAuthUser(userId).then(res => {
          setTripsAuth(res.data);
        }).catch(error => {
          console.error('Error al cargar destinos del usuario:', error);
        });
      }
    }, [])

  return (
    <div className={styles.main}>
      <Trips trips={tripsAuth}/>
    </div>
    
  )
}

export default Page