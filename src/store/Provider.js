import Context from './Context'
import { useReducer, useState ,useEffect, useRef} from 'react'
import { onSnapshot,collection ,getDocs  } from 'firebase/firestore'
import reducer, { INIT_STATE } from './reducer'
import db from '../firebase/config'
import { actions } from '../store'


const Provider = ({ children }) => {
const [state, dispatch] = useReducer(reducer, INIT_STATE)
const { movies , users, isLoading }  = state
const colMoviesRef = collection(db, 'movies')
const colUsersRef = collection(db, 'users')



useEffect(() => {
        onSnapshot(colMoviesRef, (snapshot) => {
        dispatch(actions.getMovies(snapshot.docs.map((doc => ({...doc.data(), id: doc.id})))))
      })
        onSnapshot(colUsersRef, (snapshot) => {
          dispatch(actions.getUsers(snapshot.docs.map((doc => ({...doc.data(), id: doc.id})))))
      });
},[isLoading])

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider> 
    )
}

export default Provider