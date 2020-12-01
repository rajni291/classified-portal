import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';        // for authentication
import 'firebase/storage';     // for storage
import 'firebase/database';    // for realtime database
import 'firebase/firestore';   // for cloud firestore
import 'firebase/messaging';   // for cloud messaging
import 'firebase/functions'; 

const config = {
  apiKey: "AIzaSyBAC5ZRZQXKev398bYbvVDpcCWXm1TF6Js",
  authDomain: "classified-portal-23823.firebaseapp.com",
  databaseURL: "https://classified-portal-23823.firebaseio.com",
  projectId: "classified-portal-23823",
  storageBucket: "classified-portal-23823.appspot.com",
  messagingSenderId: "680098996744",
  appId: "1:680098996744:web:a0ad0ebac83f6d514f27bd"
};
firebase.initializeApp(config);

export default firebase;
export const auth = firebase.auth();
export const firestore = firebase.firestore();

