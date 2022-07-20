import { 
    GET_MOVIES,
    GET_USERS,
    UPDATE_MOVIE,
    DELETE_MOVIE,
    GET_SELECTED_ID,
    GET_MOVIES_SEARCHED,
    GET_FORM_SEARCHED
} from './constants'

export const getMovies = payload => ({
   type: GET_MOVIES,
   payload,
})
export const getUsers = payload => ({
   type: GET_USERS,
   payload,
})
 export const updateMovies = payload => ({
    type: UPDATE_MOVIE,
    payload,
 })
 export const deleteMovies = payload => ({
    type: DELETE_MOVIE,
    payload,
 })
 export const getSeletedId = payload => ({
    type: GET_SELECTED_ID,
    payload,
 })
 export const getMoviesSeached = payload => ({
   type: GET_MOVIES_SEARCHED,
   payload,
})
export const getFormSearched = payload => ({
   type: GET_FORM_SEARCHED,
   payload,
})


 