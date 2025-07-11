'use client';
import Image from 'next/image';
import logo from '../../../../public/Logo.svg';
import home from '../../../../public/Home-icon.svg';
import myPage from '../../../../public/myDestinations-icon.svg';
import avatar from '../../../../public/Avatar-icon.svg';
import logout from '../../../../public/Logout-icon.svg';
import create from '../../../../public/Create-icon.svg';
import admin from '../../../../public/Admin-icon.svg';
import styles from './navbar.module.css';
import Link from 'next/link';
import { useAuthContext } from '@/context/authContext';

function Navbar() {

  const { isAuthenticated, role } = useAuthContext();

  return (
    <header className={styles.ctHeader}>
      <Image
        src={logo}
        width={165}
        height={78}
        alt='happy travel logo'
      />
      <nav className={styles.ctNav}>
        <Link href={'/'}>
          <Image
            src={home}
            width={40}
            height={40}
            alt='home'
          />
        </Link>
        {
          isAuthenticated && (
            <>
              <Link href='/auth'>
                <Image
                  src={myPage}
                  width={40}
                  height={40}
                  alt='mis destinos'
                />
              </Link>
              <Link href='/create'>
                <Image
                  src={create}
                  width={40}
                  height={40}
                  alt='crear destino'
                />
              </Link>
              {
                role === "[ROLE_ADMIN]" && (
                  <Link href='/users'>
                    <Image
                      src={admin}
                      width={40}
                      height={40}
                      alt='admin panel'
                    />
                  </Link>
                )
              }
              <Link href='/auth/logout'>
                <Image
                  src={logout}
                  width={40}
                  height={40}
                  alt='logout'
                  className={styles.imgLogout}
                />
              </Link>
            </>)
        }
        {
          !isAuthenticated && (
            <Link href={'/login'}>
              <Image
                src={avatar}
                width={40}
                height={40}
                alt='login'
              />
            </Link>)
        }
      </nav>
    </header>
  )
}

export default Navbar