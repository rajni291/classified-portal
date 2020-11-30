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
  databaseURL: "https://classified-portal-23823.firebaseio.com/",
  projectId: "classified-portal-23823"
};
firebase.initializeApp(config);

export default firebase;