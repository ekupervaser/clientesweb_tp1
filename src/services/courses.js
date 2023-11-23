import {db} from './firebase.js';
import {doc, getDoc, collection, onSnapshot, query} from "firebase/firestore";

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
            };
        });

        callback(data);
    });
}

/**
 * Función para obtener un curso por su ID
 * 
 * @param {string} courseId 
 * @returns {Promise<{ id: string, name: string, description: string, price: string } | null>}
 */
export async function getCourseById(courseId) {
    const cursoRef = doc(db, 'cursos', courseId);
    const cursoSnapshot = await getDoc(cursoRef);
  
    if (cursoSnapshot.exists()) {
      return {
        id: cursoSnapshot.id,
        name: cursoSnapshot.data().name,
        description: cursoSnapshot.data().description,
        price: cursoSnapshot.data().price.toLocaleString,
      };
    } else {
      return null;
    }
  }