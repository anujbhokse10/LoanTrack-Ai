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
              apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "your-api-key",
              authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "your-auth-domain",
              projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "your-project-id",
              storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "your-storage-bucket",
              messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "your-messaging-sender-id",
              appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "your-app-id",
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
