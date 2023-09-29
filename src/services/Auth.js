import { auth } from "./firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

let userData = {
  id: null,
  email: null,
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
 * 
 * @returns {Promise}
 */
export function logout () {

  return signOut(auth);
}

/**
 * 
 * @param {({id: null|string, email: null|string}) => void} observer 
 * @returns {() => void} Función para cancelar la suscripción
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
  return {...userData}
}