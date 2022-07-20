import React from 'react';
import ClampLines from 'react-clamp-lines';
import { Link } from 'react-router-dom';
import { useStore , actions } from '../../store'
import logo from '../../assets/images/logo.png';

const History = () => {
    const [ state, dispatch ] = useStore()
    const [ movies , users ] = state
    return (
          <h1>Hello History</h1>
        // <div className="lg:px-[6rem] md:px-[3rem] px-[1rem] pt-5 bg-[#191a1f] h-full">
        //    <div className="flex justify-between fixed top-[2%] right-[6%] left-[6%] h-[2rem] z-[1]">
        //       <Link to='/' className='group top-8 left-8 flex '>
        //        <img className="w-[2rem] h-[2rem] mt-[4px] group-hover:animate-spin-infinite transition-transform" src={logo}/>
        //        <span className='text-gray-300 text-[1.5rem] mt-1 mx-2 sm:hidden xl:block'>WinPhim</span>
        //       </Link> 
        //       <div className="max-w-[500px] hidden md:block"><div className="relative group w-full"><form className="relative">
        //       <input className="bg-transparent outline-none border border-gray-600 w-full rounded-full py-2 pl-4 pr-8" type="text" placeholder="Search..."/>
        //       <button className="absolute right-2 top-1/2 -translate-y-1/2"><i className="fas fa-search text-xl"></i>
        //       </button>
        //       </form>
        //       </div>
        //       </div>
        //    </div>

        //    <div className="flex gap-2 flex-wrap">
        //         {movies && movies.map(movie => (
        //         <Link className="group lg:w-[16%] sm:w-[33.333%] w-[calc(50% - 8px)] relative overflow-hidden" to={"/movie/"+ movie.mId} onClick={() => dispatch(actions.getSeletedId(movie.mId))}>
        //           <img className="w-full h-full hover:scale-150 transition-all duration-500 group-hover:blur-md" alt={movie.name} src={movie.thumbnail}/>
        //           <span className="absolute bottom-0 right-0 left-0 h-10 leading-10 bg-black bg-opacity-60 font-bold text-gray-300 text-center text-ellipsis overflow-hidden text ">{movie.name}</span>
        //            <div className="absolute top-0 right-0 left-0 text-center translate-y-[-100%] group-hover:translate-y-[60%] transition-all duration-700">
        //                <p className="font-bold text-gray-50 ">IMDB: {movie.imdb}</p>
        //                <p className="font-bold text-gray-50 ">Duration: {movie.duration}</p>
        //                <ClampLines
        //                    text={`Genres: ${movie.genres}`}
        //                     lines={1}
        //                     ellipsis="..."
        //                     moreText="See More..."
        //                     lessText="Collapse"
        //                     className="font-bold text-gray-50 "
        //                     innerElement="p"
        //                 />
        //            </div>
        //         </Link>
        //         ))}
        //    </div>

           
        // </div>
    );
}

export default History;
