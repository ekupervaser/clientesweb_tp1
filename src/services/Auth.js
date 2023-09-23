import { auth, signInWithEmailAndPassword } from "./firebase";

/**
 * 
 * @param {{email: string, password: string}} user 
 */
export function login ({email, password}) {
    return signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {

        })
        .cath(error => {
            return {
            code: error.code,
            message: error.message,
            }
        });
}

const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });