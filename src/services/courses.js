import {db} from './firebase.js';
import {addDoc, collection, onSnapshot, serverTimestamp, query, orderBy} from "firebase/firestore";

const refCursos = collection(db, 'cursos');

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