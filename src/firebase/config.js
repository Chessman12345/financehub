import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAsHV8xGR5p4MUwp7EGDSpqXKYNpUVYAZ0",
    authDomain: "financehub-491ad.firebaseapp.com",
    projectId: "financehub-491ad",
    storageBucket: "financehub-491ad.firebasestorage.app",
    messagingSenderId: "392587955506",
    appId: "1:392587955506:web:fc34e058960b83553c9b2b",
    measurementId: "G-7QSRSSBTXN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);
const database = getDatabase(app)

export { ref, set, get, auth, provider, database }