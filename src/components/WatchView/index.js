import React, {useCallback, useEffect,  useLayoutEffect,  useRef,  useState } from 'react';
import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useStore } from '../../store'
import logo from '../../assets/images/logo.png'
const WatchView = () => {   
    const [ state , dispatch ] = useStore();
    const { movies , selectedId , isLoading  } = state
    const  mId = localStorage.getItem("mId") || ''
    const  foundMovie  = movies && movies.find(movie => movie.mId === mId)
    const [ groupGenres , setGroupGenres ] = useState([])

   useLayoutEffect(() => {
    const arrGenres = foundMovie && foundMovie.genres.split(",")
    setGroupGenres(arrGenres)
   },[selectedId , isLoading])
    return (
        <div className="h-full bg-[#191a1f] pb-10">
           <div className="flex justify-between mx-6 pt-6">
              <Link to='/' className='group  flex '>
               <img className="w-[2rem] h-[2rem] mt-[4px] group-hover:animate-spin-infinite transition-transform" src={logo}/>
               <span className='text-gray-300 text-[1.5rem] mt-1 mx-2 sm:hidden xl:block'>WinPhim</span>
              </Link> 
              <div className="max-w-[500px] hidden md:block"><div className="relative group w-full"><form className="relative">
              <input className="bg-transparent outline-none border border-gray-600 w-full rounded-full py-2 pl-4 pr-8" type="text" placeholder="Search..."/>
              <button className="absolute right-2 top-1/2 -translate-y-1/2"><i className="fas fa-search text-xl"></i>
              </button>
              </form>
              </div>
              </div>
           </div>
            <div className="flex mx-20 mt-10 gap-3">
             <div className="w-[80%]">
                  <div className="h-[35rem]">
                   <iframe 
                   src={foundMovie && "https://www.2embed.ru/embed/tmdb/movie?id="+ foundMovie.mId} width="100%" height="100%"></iframe>
                  </div>
                    <div className="my-4 flex">
                        <span className="float-left text-3xl text-gray-50">{foundMovie && foundMovie.name}</span>
                    </div>
                    <div className="flex inline-flex">
                       <AiFillStar className="text-xl text-yellow-500"/>
                       <div className="float-left text-md text-gray-50 mx-2">{foundMovie && foundMovie.imdb + ".0"}</div>
                    </div>
                    <div className="flex my-3">
                        {groupGenres && groupGenres.map((genres,index) => (
                        <span key={index} className="float-left text-md mr-3 bg-[#555] px-4 py-1 rounded-2xl text-gray-50">{genres}</span>
                        ))}
                    </div>
                    <div className="flex">
                        <span className="float-left text-sm text-gray-50">{foundMovie && foundMovie.description}</span>
                    </div>
             </div>
                <div className="w-[20%]">
                {/* {movieImdb.map((movie,index) => (
                 <Link key={index} to={"movie/" + movie.mId}  onClick={() => handleSelectedMovie(movie.mId)} >
                  <div className="flex w-full my-2"> 
                     <div className="w-[40%]">
                          <div>
                         <img src={movie.largeImage} alt={movie.name} className="lg:w-[20rem] h-[5rem] rounded-lg"/>
                          </div>
                     </div>
                     <div className="w-[60%]">
                        <div>
                         <span className="text-gray-50 text-lg ml-2">{movie.name}</span>
                        </div>
                     </div>
                  </div>
                 </Link>
             ))}       */}
                </div>
            </div>
            <div className="flex">
                  
            </div>
        </div>
    );
}

export default WatchView;
