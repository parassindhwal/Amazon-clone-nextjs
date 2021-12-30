import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBw49oonPSfvSe5ocf4k3C2Bon9RcMRtzs",
    authDomain: "clone-nextjs-4ccb7.firebaseapp.com",
    projectId: "clone-nextjs-4ccb7",
    storageBucket: "clone-nextjs-4ccb7.appspot.com",
    messagingSenderId: "950642753086",
    appId: "1:950642753086:web:aff3159bf3cd11e88f5b6f"
};

const app = !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig) 
  : firebase.app();

const db = app.firestore();

export default db;