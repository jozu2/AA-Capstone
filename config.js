import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBrkihEf6X2YEFwDNBxCnTVZjezpyOLEn0",
  authDomain: "aa-ridealong.firebaseapp.com",
  databaseURL:
    "https://aa-ridealong-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aa-ridealong",
  storageBucket: "aa-ridealong.appspot.com",
  messagingSenderId: "723756690653",
  appId: "1:723756690653:web:48cf043bd1df60bedbbf34",
  measurementId: "G-LCHFRDZLHL",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = getDatabase();
export { firebase, db };
