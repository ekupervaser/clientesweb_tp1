import { doc, getDoc, serverTimestamp, setDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Función para obtener el listado de usuarios registrados
 * 
 * @param {string} id 
 * @returns {Promise<{id: string, email: string}>}
 */

export async function getUsers() {
    const querySnapshot = await getDocs(collection(db, "users"));
    const userList = [];

    querySnapshot.forEach((doc) => {
        if (doc.id !== 'lpzKk2JucWR1Bqyr3IOWlht8LQ33') {
            userList.push({
                id: doc.id, 
                email: doc.data().email});
        }
    });

    return userList;
}

/**
 * Función para obtener un usuario por id
 * 
 * @param {id} data 
 * @returns {Promise<{id: string, email: string, role: string|null, displayName: string|null}>}
 */

export async function getUserProfileById(id) {
    const refUser = doc(db, `users/${id}`);
    const docSnapshot = await getDoc(refUser);

    return {
        id: docSnapshot.id,
        email: docSnapshot.data().email,
        role: docSnapshot.data().role,
        displayName: docSnapshot.data().displayName,
    }
}

/**
 * Función para crear el perfil de un usuario en Firestore
 * 
 * @param {string} id 
 * @param {{email: string}} data 
 * @returns {promise}
 */
export async function createUserProfile(id, data) {
    const refUser = doc(db, `users/${id}`);
    return setDoc(refUser, {...data, created_at: serverTimestamp()});
}

/**
 * 
 * @param {string} id 
 * @param {{displayName: string|null}} data 
 * @returns {Promise}
 */
export async function updateUserProfile(id, data) {
    updateDoc(
    doc(db, `users/${id}`),
    {...data}
    );
}