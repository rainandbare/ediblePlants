import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAYeCkXgxcm9jbgD2N46fRr4RAOMskqjvs",
    authDomain: "edible-plants.firebaseapp.com",
    databaseURL: "https://edible-plants.firebaseio.com",
    projectId: "edible-plants",
    storageBucket: "edible-plants.appspot.com",
    messagingSenderId: "876085718936",
    appId: "1:876085718936:web:787a950809e90a19d185ed"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const storageRef = firebase.storage().ref();
  export const dbRef = firebase.database().ref();


export default firebase;