// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDEi_zW7y01frOuvDZi7vWiEOAoR_C052Y",
    authDomain: "react-instagram-clone-5b3b8.firebaseapp.com",
    projectId: "react-instagram-clone-5b3b8",
    storageBucket: "react-instagram-clone-5b3b8.appspot.com",
    messagingSenderId: "346311415713",
    appId: "1:346311415713:web:44de310cb05b49946c1de0",
    measurementId: "G-HT5HR72P0H"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage }