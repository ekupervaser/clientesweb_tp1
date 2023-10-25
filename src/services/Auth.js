import { auth } from "./firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createUserProfile } from './user.js';

let userData = {
  id: null,
  email: null,
  role: null,
}

let observers = [];

if (localStorage.getItem('user')) {
  userData = JSON.parse(localStorage.getItem('user'));
}

onAuthStateChanged(auth, user => {
  if (user) {
    setUserData({
      id: user.uid,
      email: user.email,
    });
    localStorage.setItem('user', JSON.stringify(userData));
  } else {
    clearUserData();
    localStorage.removeItem('user');
  }
})

/**
 * Función para registrarse
 * 
 * @param {{email: string, password: string, role: string}} user
 * @return {Promise}
 */
export async function register({email, password, role}) {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

     // Función para crear el usuario en Firestore
    createUserProfile(userCredentials.user.uid, {email, role});

    return {
      id: userCredentials.user.uid,
      email: userCredentials.user.email,
      role: userCredentials.role,
    }
  } catch (error) {
    return {
      code: error.code,
      message: error.message,
    }
  }
}


/**
 * Función para iniciar sesión
 * 
 * @param {{email: string, password: string}} user 
 * @return {Promise}
 */
export function login({email, password}) {
    return signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
          console.log("Sesión iniciada", userCredentials);
          return userData;
        })
        .catch(error => {
            return {
            code: error.code,
            message: error.message,
            }
        });
}

/**
 * Función para salir de la sesión
 * 
 * @returns {Promise}
 */
export function logout () {

  return signOut(auth);
}


/**
 * Función para cancelar la suscripción
 * 
 * @param {({id: null|string, email: null|string}) => void} observer 
 * @returns {() => void} 
 */
export function subscribeToAuth(observer) {
  observers.push(observer);

  notify(observer);

  return () => {
    observers = observers.filter(obs => obs !== observer);
  }
}

function notify(observer) {
  observer({...userData});
}

function notifyAll () {
  observers.forEach(observer => notify(observer));
}

/**
 * 
 * @param {{id: null|string, email: null|string}} newData 
 */
function setUserData (newData) {
  userData = {
    ...userData,
    ...newData,
  }
  notifyAll();
}

function clearUserData () {
  setUserData({
    id: null,
    email: null,
});
}

export function getUserData () {
  return {...userData};
}