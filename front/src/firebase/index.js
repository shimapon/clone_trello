  
  import firebase from 'firebase';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCyZZO8hwAUrGIW0tUyGVLHn4XfmJR6Oi4",
    authDomain: "ourtrello-d2b2c.firebaseapp.com",
    projectId: "ourtrello-d2b2c",
    storageBucket: "ourtrello-d2b2c.appspot.com",
    messagingSenderId: "745270783944",
    appId: "1:745270783944:web:f6bf2b384e834c18e45afd"
  };


  export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseDb = firebaseApp.firestore();