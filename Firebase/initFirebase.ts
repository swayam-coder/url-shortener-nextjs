import { initializeApp, FirebaseApp } from "firebase/app"

import { getAuth } from 'firebase/auth'
// import "firebase/storage"
// import "firebase/firestore"
// import "firebase/analytics"
// import "firebase/performance"
// import "firebase/database";

const app: FirebaseApp  = initializeApp({
    apiKey: "AIzaSyArtiV46CImtSjCMgguYv7a8OYqD4pDPto",
    authDomain: "intern-14c93.firebaseapp.com",
    projectId: "intern-14c93",
    storageBucket: "intern-14c93.appspot.com",
    messagingSenderId: "585229632272",
    appId: "1:585229632272:web:f3910fa64290a8fccd9b95"
});

export const auth = getAuth(app)