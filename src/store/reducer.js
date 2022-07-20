import { GET_SELECTED_ID , 
    GET_MOVIES,
     GET_USERS ,
     GET_MOVIES_SEARCHED,
     GET_FORM_SEARCHED
 } 
    from "./constants"

export const INIT_STATE = { 
    movies: [],
    users: [],
    moviesSearched: [],
    formSearched: '',
    selectedId: null,
    isLoading: true,
}

 function  reducer(state,action) {
    switch(action.type){
        case  GET_SELECTED_ID:
            return {
                ...state,
                selectedId: action.payload,
                isLoading: false,
            }
        case  GET_MOVIES_SEARCHED:
                return {
                    ...state,
                    moviesSearched: action.payload,
                    isLoading: false,
                }
         case  GET_FORM_SEARCHED:
                    return {
                ...state,
                formSearched: action.payload,
                isLoading: false,
                    }        
        case  GET_MOVIES:
            return {
               ...state,
               movies: action.payload,
               isLoading: false,
            }
         case GET_USERS:
                return {
                ...state,
                users: action.payload,
                isLoading: false,
                }
        default:
            throw new Error("Invalid" + action.type)
    }  
}


export default reducer