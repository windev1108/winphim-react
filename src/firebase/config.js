import { initializeApp } from "firebase/app" 
import { getFirestore , collection , getDocs } from "firebase/firestore"

const firebaseConfig = {
    apiKey : "AIzaSyBrcMmRAXIscPk0EDhyr0a-IVlVJZyfhQc" , 
    authDomain : "winphim-react.firebaseapp.com" , 
    projectId : "winphim-react" , 
    storageBucket : "winphim-react.appspot.com" , 
    messagingSenderId : "995937524652" , 
    appId : "1:995937524652:web:bdf1a820d719ddc110f809" , 
    measurementId : "G-J56EH94CT5" 
};



// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()



export default db


