import {  addDoc, collection  , deleteDoc, doc, getDocs, setDoc} from 'firebase/firestore'
import db from './config'



const addMovie = async payload =>{
   const collectionMoviesRef = collection(db, "movies")
     await addDoc(collectionMoviesRef, payload);
 }
 const updateMovie = async (payload,id) =>{
   const docRef = doc(db, "movies", id)
   await setDoc(docRef, payload);
 }
 const deleteMovie = async payload =>{
   const docRef = doc(db, "movies", payload)
   await deleteDoc(docRef);
}

const addUser = async payload => {
  const colelctionUserRef = collection(db, "users")
  await addDoc(colelctionUserRef,payload)
}

const deleteUser = async payload =>{
  const docRef = doc(db, "users", payload)
  await deleteDoc(docRef);
}

export { addMovie , updateMovie , addUser , deleteMovie , deleteUser}