import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyDwyHWZc-Q6RWqzcMTDO572sj_9teEIbN4",
    authDomain: "cakes-ordering-app.firebaseapp.com",
    databaseURL: "https://cakes-ordering-app.firebaseio.com",
    projectId: "cakes-ordering-app",
    storageBucket: "cakes-ordering-app.appspot.com",
    messagingSenderId: "1019952357139",
    appId: "1:1019952357139:web:ea0eb39ff160ffbabb44e6",
    measurementId: "G-QSCL1BRLEM"
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)

  export const db = firebase.firestore()
  export const auth = firebase.auth()
  export const storage = firebase.storage()

  export default firebase



  //if request.auth != null