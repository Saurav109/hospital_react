import firebase from "firebase";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCjlcbg0VLvbxdzirGCZnMbcd62f9ixsFg",
  authDomain: "hospital-fe7e2.firebaseapp.com",
  projectId: "hospital-fe7e2",
  storageBucket: "hospital-fe7e2.appspot.com",
  messagingSenderId: "607909709830",
  appId: "1:607909709830:web:679550852fd286df921b87",
  measurementId: "G-QZVLJE0N4E",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
