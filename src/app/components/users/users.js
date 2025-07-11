"use client";

import User from "../user/user";
import styles from "./users.module.css";

function Users({ users }) {
    return (
        <div className={styles.ctUsers}>
            {users === undefined ? (
                <h3 className={styles.txtError}>Cargando usuarios...</h3>
            ) : users.length === 0 ? (
                <div className={styles.ctEmpty}>
                    <h3 className={styles.txtError}>No hay usuarios registrados</h3>
                </div>
            ) : (
                users.map((user, index) => <User user={user} key={index} />)
            )}
        </div>
    );
}

export default Users;