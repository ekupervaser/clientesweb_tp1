import { auth } from "./firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

let userData = {
  id: null,
  email: null,
}

let observers = [];
/**
 * 
 * @param {{email: string, password: string}} user 
 * @return {Promise}
 */
export function login({email, password}) {
    return signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
          console.log("Sesión iniciada", userCredentials);

          setUserData({
              id: userCredentials.user.uid,
              email:userCredentials.user.email,
          })

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
  const promise = signOut(auth);
  clearUserData();

  return signOut(auth);
}

/**
 * 
 * @param {({id: null|string, email: null|string}) => void} observer 
 */
export function subscribeToAuth(observer) {
  observers.push(observer);

  notify(observer);
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