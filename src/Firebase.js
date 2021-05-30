import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyCVfv4l3sSCmN8P0PMdSJnJgoITrRwGOLs",
    authDomain: "freshfromfarmer-ac95f.firebaseapp.com",
    projectId: "freshfromfarmer-ac95f",
    storageBucket: "freshfromfarmer-ac95f.appspot.com",
    messagingSenderId: "13077936468",
    appId: "1:13077936468:web:a0b4a5bad3ab36bf20f0c1",
    measurementId: "G-FS3FMFVY28"
};
// Initialize Firebase
const db = firebase.initializeApp(firebaseConfig);
export default db;
