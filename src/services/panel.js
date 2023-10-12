import {db} from './firebase.js';
import {addDoc, collection, onSnapshot, query, doc, deleteDoc} from "firebase/firestore";

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


export async function updateCourse(courseId) {
    const courseRef = doc(db, "cursos", courseId);

    updateDoc(courseRef, this.nuevosDatos)
      .then(() => {
        console.log("Documento actualizado con éxito.");
      })
      .catch((error) => {
        console.error(error);
      });
    }


export async function deleteCourse(courseId) {
    const courseRef = doc(db, "cursos", courseId); 
    try {
      await deleteDoc(courseRef);
    } catch (error) {
      console.error(error);
    }
  }
  
