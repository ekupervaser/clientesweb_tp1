import {db} from './firebase.js';
import {addDoc, collection, onSnapshot, query} from "firebase/firestore";

const refCursos = collection(db, 'cursos');

export function SaveNewCourse(data) {

    return addDoc(refCursos, {
        ...data,
    });
}

/**
 * 
 * @param {() => {}} callback 
 * @returns  {import('firebase/auth').Unsubscribe}
 */
export function getCourses(callback) {

    const q = query(refCursos);

    return onSnapshot(q, snapshot => {
        const data = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                name: doc.data().name,
                description: doc.data().description,
                price: doc.data().price,
            };
        });

        callback(data);
    });
}
