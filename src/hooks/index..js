import React, { useEffect } from 'react';
import { useStore } from '../store';

const useMovies = (type) => {

    const [ state , dispatch ] = useStore()
    const { movies } = state


    useEffect(()=> {
      console.log("movies: ",movies);
      console.log("type: ",type);
    },[type])

    return {}
}



export default useMovies
