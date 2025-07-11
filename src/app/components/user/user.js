import styles from './user.module.css';
import Image from 'next/image';
import Link from 'next/link';
import edit from '../../../../public/Edit-icon.svg';
import del from '../../../../public/Delete-icon.svg';

function User({ user }) {
    const { username, email, id } = user;

    return (
        <div className={styles.ctUser}>
            <div className={styles.ctTxt}>
                <div>
                    <h6>{username}</h6>
                    <p>{email}</p>
                </div>
                <div>
                    <Link href={`/users/update/${id}`}>
                        <Image
                            src={edit}
                            height={40}
                            width={40}
                            alt='edit user'
                        />
                    </Link>
                    <Link href={`/users/delete/${id}`}>
                        <Image
                            src={del}
                            height={40}
                            width={40}
                            alt='delete user'
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default User;