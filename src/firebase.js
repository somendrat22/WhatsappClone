import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA_HroCzlpwarra48Hv0Q4Bs4GJ2vDHqxk",
    authDomain: "whatsapp-clone-92765.firebaseapp.com",
    projectId: "whatsapp-clone-92765",
    storageBucket: "whatsapp-clone-92765.appspot.com",
    messagingSenderId: "230399608010",
    appId: "1:230399608010:web:dc52553968dd9ca2cca033",
    measurementId: "G-DWMGW7MBRV"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;



