// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOnv_lZoChKPUdd65qSkGFO2eGg8lS-rA",
  authDomain: "fir-practice-a909c.firebaseapp.com",
  projectId: "fir-practice-a909c",
  storageBucket: "fir-practice-a909c.appspot.com",
  messagingSenderId: "711040271457",
  appId: "1:711040271457:web:d60571171d62988f079620",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);

export { authentication };
