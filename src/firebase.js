import firebase from 'firebase';

const firebaseApp = firebase.initializeApp(
    {apiKey: "AIzaSyAswDzy3Lo7OhJ0brHZzryo4uzuinyxWhQ",
    authDomain: "facebook-messanger-clone-c12cd.firebaseapp.com",
    projectId: "facebook-messanger-clone-c12cd",
    storageBucket: "facebook-messanger-clone-c12cd.appspot.com",
    messagingSenderId: "424602163493",
    appId: "1:424602163493:web:b5a74428fefa0593a362cc"}
);

const db = firebaseApp.firestore();

export default db;