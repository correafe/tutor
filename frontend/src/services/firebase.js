// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from 'firebase/auth'
// import { GoogleAuthProvider } from 'firebase/auth';


// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD8gNW4z2zZDf2w6_UHQLRLbPvEJm-kfxg",
//   authDomain: "journeymapeasy.firebaseapp.com",
//   projectId: "journeymapeasy",
//   storageBucket: "journeymapeasy.appspot.com",
//   messagingSenderId: "741919285657",
//   appId: "1:741919285657:web:526c48ccd7b6e8d3d8f308"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const auth = getAuth();

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCpk8RK6hG6SRM1fcb3Cnn7TdwTDjjeJsA",
  authDomain: "journeymapeasy-1dbc6.firebaseapp.com",
  projectId: "journeymapeasy-1dbc6",
  storageBucket: "journeymapeasy-1dbc6.firebasestorage.app",
  messagingSenderId: "159977605689",
  appId: "1:159977605689:web:246f353883d87b80511be8",
  measurementId: "G-NR5Z1WE6P7"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa e exporta a Autenticação (passando a variável 'app' dentro)
export const auth = getAuth(app);