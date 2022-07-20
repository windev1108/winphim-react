import React , {useEffect , useState} from 'react';
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { useStore , actions } from '../../store'
import ClampLines from 'react-clamp-lines';


const Movies = () => {
     const [ state , dispatch ] = useStore()
     const { movies } = state
     const [ country, setCountry] = useState()
     const [ categories, setCategories] = useState()
     const [ timePeriods, setTimePeriods] = useState()
     const [ moviesSelect, setMoviesSelect] = useState()
     useEffect(() => {
          console.log("country: ",country);
          console.log("categories: ",categories);
          console.log("timePeriods: ",timePeriods);
          console.log("Movies:", movies);
          switch (country) {
               case "":
                    return movies
               case 1 :
                    return movies.filter(movie => movie.country.includes("Korea"))    
               default : 
                    return movies
          }
     },[country,categories,timePeriods])
 
    return (
        <div className="lg:px-[6rem] md:px-[3rem] px-[1rem] pt-5 bg-[#191a1f] h-full">
           <div className="flex justify-between fixed top-[2%] right-[6%] left-[6%] h-[2rem] z-[1]">
              <Link to='/' className='group top-8 left-8 flex '>
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

           <div className="flex text-gray-50 my-4 mt-20">
                <div className="float-right">
                     <button className="px-0">Movies</button>
                     <button className="px-3">TV Shows</button>
                </div>
           </div>

           <div className="flex gap-3 flex-wrap my-6">
           <select onChange={(e) => setCountry(e.target.value)} className="outline-none bg-dark-lighten px-3 py-2 rounded">
           <option className="outline-none bg-dark-lighten px-3 py-2" value="all-regions">All regions</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="Koreax  ">Korea</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="United States of America">U.S</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="3">U.K</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="4">Japan</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="5">Thailand</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="6">China</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="7">India</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="8">Australia</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="9">Indonesia</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="10">other</option></select>
           <select onChange={(e) => setCategories(e.target.value)} className="outline-none bg-dark-lighten px-3 py-2 rounded">
           <option className="outline-none bg-dark-lighten px-3 py-2" value="all-categories">All Categories</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="drama">Drama</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="action">Action</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="romance">Romance</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="fantasy">Fantasy</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="animation">Animation</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="suspense">Suspense</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="science">Sci-Fi</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="honor">Horror</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="comedy">Comedy</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="crime">Crime</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="adventure">Adventure</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="thriller">Thriller</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="fFamily">Family</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="musical">Musical</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="War">War</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="rest">other</option></select>
           <select onChange={(e) => setTimePeriods(e.target.value)} className="outline-none bg-dark-lighten px-3 py-2 rounded">
           <option className="outline-none bg-dark-lighten px-3 py-2" value="all-time">All Time Periods</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="2022">2022</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="2021">2021</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="2020">2020</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="2019">2019</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="2018">2018</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="2017">2017</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="2016">2016</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="2011">2015-2011</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="2000">2010-2000</option>
           <option className="outline-none bg-dark-lighten px-3 py-2" value="rest">Before</option></select>
           </div>

           <div className="flex gap-2 flex-wrap">
                {movies && movies.map(movie => (
                <Link className="group lg:w-[16%] sm:w-[33.333%] w-[calc(50% - 8px)] relative overflow-hidden" to={"/movie/"+ movie.mId} onClick={() => dispatch(actions.getSeletedId(movie.mId))}>
                  <img className="w-full h-full hover:scale-150 transition-all duration-500 group-hover:blur-md" alt={movie.name} src={movie.thumbnail}/>
                  <span className="absolute bottom-0 right-0 left-0 h-10 leading-10 bg-black bg-opacity-60 font-bold text-gray-300 text-center text-ellipsis overflow-hidden text ">{movie.name}</span>
                   <div className="absolute top-0 right-0 left-0 text-center translate-y-[-100%] group-hover:translate-y-[60%] transition-all duration-700">
                       <p className="font-bold text-gray-50 ">IMDB: {movie.imdb}</p>
                       <p className="font-bold text-gray-50 ">Duration: {movie.duration}</p>
                       <ClampLines
                           text={`Genres: ${movie.genres}`}
                            lines={1}
                            ellipsis="..."
                            moreText="See More..."
                            lessText="Collapse"
                            className="font-bold text-gray-50 "
                            innerElement="p"
                        />
                   </div>
                </Link>
                ))}
           </div>

           
        </div>
    );
}

export default React.memo(Movies);
