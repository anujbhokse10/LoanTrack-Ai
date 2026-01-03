// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

function getFirebase() {
    if (typeof window !== 'undefined') {
        if (!getApps().length) {
            const firebaseConfig = {
              apiKey: "AIzaSyA1nBKGDPXYDwOkT0KTehx4Vx2yoDX--08",
              authDomain: "studio-6453477558-a93d9.firebaseapp.com",
              projectId: "studio-6453477558-a93d9",
              storageBucket: "studio-6453477558-a93d9.appspot.com",
              messagingSenderId: "1007160010554",
              appId: "1:1007160010554:web:86535337d62379da445203",
            };
            app = initializeApp(firebaseConfig);
            auth = getAuth(app);
            db = getFirestore(app);
        } else {
            app = getApp();
            auth = getAuth(app);
            db = getFirestore(app);
        }
        return { app, auth, db };
    }
    //This is a mock for server-side rendering
    return { app: null, auth: null, db: null };
}

export { getFirebase };
