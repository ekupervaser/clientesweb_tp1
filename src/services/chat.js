import {db} from './firebase.js';
import {addDoc, collection, onSnapshot} from "firebase/firestore";

const refChat = collection(db, 'chats');

export function chatSaveMessage(data) {

    return addDoc(refChat, data);
}

export function chatSubscribeToMessages(callback) {
    onSnapshot(refChat, snapshot => {
        const data = snapshot.docs.map(doc => {
            return {
                user: doc.data().user,
                message: doc.data().message,
            };
        });

        callback(data);
    });
}
