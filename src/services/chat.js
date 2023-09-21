import { dateToString } from '../helpers/date.js';
import {db} from './firebase.js';
import {addDoc, collection, onSnapshot, serverTimestamp, query, orderBy} from "firebase/firestore";

const refChat = collection(db, 'chats');

export function chatSaveMessage(data) {

    return addDoc(refChat, {
        ...data,
        created_at: serverTimestamp(),
    });
}

export function chatSubscribeToMessages(callback) {

    const q = query(refChat, orderBy('created_at'));

    onSnapshot(q, snapshot => {
        const data = snapshot.docs.map(doc => {
            return {
                user: doc.data().user,
                message: doc.data().message,
                created_at: dateToString(doc.data().created_at.toDate()),
            };
        });

        callback(data);
    });
}
