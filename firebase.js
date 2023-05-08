import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

    apiKey: "AIzaSyADEPOqOJakXNUm4w8yg8WtEXVyksa6c10",

    authDomain: "craftyboy.firebaseapp.com",

    projectId: "craftyboy",

    storageBucket: "craftyboy.appspot.com",

    messagingSenderId: "209188326491",

    appId: "1:209188326491:web:1512bd45b3aa933b7d837e",

    measurementId: "G-PP690DRTQY"
};
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase); 
