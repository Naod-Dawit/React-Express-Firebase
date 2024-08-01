import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyBt0lihPxXL0CEhbQucwkxj6Lf7ZIHymRU",
  authDomain: "my-chat-app-fa016.firebaseapp.com",
  projectId: "my-chat-app-fa016",
  storageBucket: "my-chat-app-fa016.appspot.com",
  messagingSenderId: "920264255928",
  appId: "1:920264255928:web:d6e35e300594b24ea0c74d",
  measurementId: "G-15Q89E16SF"
};





// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const db=getFirestore(app)
 export const storage=getStorage(app)




