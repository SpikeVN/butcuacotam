import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBU3v8q4Mn-IVXNafAMqJtCjApW-cmlQc0",
    authDomain: "butcuacotam.firebaseapp.com",
    databaseURL: "https://butcuacotam-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "butcuacotam",
    storageBucket: "butcuacotam.firebasestorage.app",
    messagingSenderId: "1052446845033",
    appId: "1:1052446845033:web:d74371132dab963c6edaf8"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
