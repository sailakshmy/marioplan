import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/auth';

 export const fbConfig = {
     apiKey: "AIzaSyAl7xCV9_JYDQ49Ka3uRLQznbkx-6KFJVg",
    authDomain: "marioplan-6cbb1.firebaseapp.com",
    databaseURL: "https://marioplan-6cbb1.firebaseio.com",
    projectId: "marioplan-6cbb1",
    storageBucket: "marioplan-6cbb1.appspot.com",
    messagingSenderId: "535239777655",
    appId: "1:535239777655:web:2defb72e4ef922b0595572",
    measurementId: "G-ZC7BM8L5HB"
  };
  
 // Initialize Firebase
firebase.initializeApp(fbConfig);
firebase.analytics();
firebase.firestore();



  export default firebase;
