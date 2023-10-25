import {db} from './firebase.js';
import {collection, onSnapshot, query} from "firebase/firestore";

const refCursos = collection(db, 'cursos');

/**
 * Función para obtener el listado de cursos
 * 
 * @param {() => {}} callback 
 * @returns {import('firebase/auth').Unsubscribe}
 */
export function importCursos(callback) {

    const q = query(refCursos);

    return onSnapshot(q, snapshot => {
        const data = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                name: doc.data().name,
                description: doc.data().description,
                price: doc.data().price.toLocaleString("es"),
               /*  image: doc.data().url, */
            };
        });

        callback(data);
    });
}