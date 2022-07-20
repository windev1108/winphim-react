import React , { useState, useEffect, useRef, useLayoutEffect  } from 'react';
import logo from '../../assets/images/logo.png' 
import { Avatar , Button , Tooltip } from 'antd'
import { AiOutlineAppstore } from 'react-icons/ai'
import { FaHome , FaHistory , FaSignInAlt, FaUsersCog, FaBars, FaSearch } from 'react-icons/fa'
import { BiMoviePlay } from 'react-icons/bi'
import { Link , useNavigate} from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination ,Navigation , Autoplay} from "swiper";
import { getCurrentId } from '../../store/actions';
import { useStore , actions} from '../../store'
import clsx from 'clsx'
import ClampLines from 'react-clamp-lines';
const axios = require("axios");


export default function Home  ()  {
    const navigate = useNavigate();
    const [ userStorage, setUserStorage ] = useState(JSON.parse(localStorage.getItem('user')) || '')
    const [ state , dispatch   ] = useStore();
    const { movies , users  ,isLoading  } = state
    const [ formSearch , setFormSearch ] = useState()
    const [ TypeButton , setTypeButton ] = useState(userStorage ? true : false)
    const [ foundUser , setFoundUser ] = useState(!isLoading && users.find(user => user.id ===  userStorage.uid))
    const [ isAdmin , setIsAdmin ] = useState(false);
    const [ avatarColor ,setAvatarColor] = useState('');
    const [ name , setName] = useState('')
    const [ isNavbar , setIsNavbar ] = useState(false)
    const [ movieSearch, setMovieSearch ] = useState([])
    const  movieImdb  = movies && movies.filter(movie => movie.imdb > 7)
    const [ historyId , setHistoryId ] = useState([])
    const moviesTypeRef = useRef(() => {})
    const moviesSearchRef = useRef([])

  
    useEffect(() =>{
     // handleSearchMovie
      setMovieSearch(formSearch && movies.filter(movie => movie.name && movie.name.toLowerCase().trim().match(new RegExp(formSearch.toLowerCase(), "i")))) 
    },[formSearch]) 

    useLayoutEffect(() => {
      moviesTypeRef.current = ((type) =>{
      const moviesFilter = movies && movies.filter(movie => movie.genres &&  movie.genres.includes(type) &&  movie.imdb >= 7)
        return ( 
          <div className="mt-8">
          {!isLoading && <span className="text-2xl text-gray-50 select-none">{`Hot ${type}`}</span>}
          <Swiper 
             slidesPerView={4}
             spaceBetween={10}
             navigation={{
             clickable: true,
          }}
          modules={[Navigation]}
          className="flex"
           > 
           {moviesFilter.map((movie,index) => (
            <SwiperSlide key={index}  className={clsx({["animate-pulse bg-gray-700"] : isLoading },"group relative lg:rounded-3xl rounded-xl overflow-hidden my-6 cursor-pointer")}>
             <div onClick={() => handleSelectedMovie(movie.mId)}>
            <img className="w-full h-[18rem]  transition-all duration-500 group-hover:scale-150 group-hover:brightness-75  group-hover:blur-md" alt={movie.name} src={movie.thumbnail}/>
            <ClampLines
                     text={movie.name}
                      lines={1}
                      ellipsis="..."
                      moreText="See More..."
                      lessText="See Less..."
                      className="absolute bottom-0 right-0 left-0 lg:h-10 h-5 lg:leading-10 leading-5 bg-black bg-opacity-70 font-medium text-gray-300 text-center lg:text-base text-[8px]"
                      innerElement="div"
                  />
              <div className="absolute top-0 right-0 left-0 text-center translate-y-[-100%] group-hover:translate-y-[60%] transition-all duration-700">
                 <p className="font-bold text-gray-50 ">IMDB: {movie.imdb}</p>
                 <p className="font-bold text-gray-50 ">Duration: {movie.duration} min</p>
                 <ClampLines
                     text={`Genres: ${movie.genres}`}
                      lines={1}
                      ellipsis="..."
                      moreText="See More..."
                      lessText="See Less..."
                      className="font-bold text-gray-50 "
                      innerElement="p"
                   />
             </div>
          </div>
           </SwiperSlide>
           ))}
           </Swiper>
       </div>
        )
      } )
      return () =>{
      }
    },[isLoading])
    
    useLayoutEffect(() => { 
      const foundUser = users.find(user => user.id ===  userStorage.uid)
      setIsAdmin(foundUser && foundUser.role)
      setAvatarColor(foundUser && foundUser.avatarColor)
      setName(foundUser && foundUser.name)
      console.log('movies: ', movies);
      console.log('isLoading: ', isLoading);
      return () =>{
        setIsAdmin(false)
        setAvatarColor('')
        setName('')
      }
    })
    
  
    // handle show navbar
    const showNavBar = () =>{
      console.log("navbar ne`");
      setIsNavbar(true)
    } 
    const hideNavBar = () =>{
      setIsNavbar(false)
    }
    // Handle signout
    const handleSignOut = () =>{
        JSON.stringify(localStorage.removeItem('user', ''))
        setTypeButton(false)
        setIsAdmin(false)
        setName('')
        setUserStorage('')
        console.log('Logout');
    }
  
    
    // get selected id movie
    const handleSelectedMovie = (mId) => {
       dispatch(actions.getSeletedId(mId))
       localStorage.setItem("mId" , mId)
       navigate('/movie/' + mId)
    }

    // hanlde get formData
    const handleSubmitFormSearch = (e) => {
      e.preventDefault()
      console.log("Value: ",formSearch) 
      localStorage.setItem("searched", JSON.stringify({s: formSearch}))
      navigate('/search/' + formSearch)
    }
  
    return (   
       <div className="flex flex-nowrap h-full bg-[#191a1f]">
        {isNavbar && <div onClick={hideNavBar} className="bg-[#000] lg:hidden  bg-opacity-50 fixed top-0 right-0 left-0 bottom-0 z-[1]"></div>}
       {/* Navbar */}
           <div
           className={clsx({['translate-x-0 sm:!translate-x-0'] : !isNavbar,['translate-x-[100%] bg-[#191a1f]']: isNavbar} ,'lg:!translate-x-0 flex-shrink-0 sm:sticky sm:w-[10%] left-auto right-full sm:!right-0 sm:!left-0 fixed top-0 flex flex-col items-stretch py-10 pl-5 xl:pl-10 pr-0 w-[90vw] max-w-[288px] sm:max-w-none  xl:w-72 border-r border-gray-600 h-screen overflow-y-auto lg:z-[1] z-[50] bg-dark sm:bg-transparent last:transition-all duration-500 lg:w-[20%]')}>
           <Link to='/' className='group flex w-full '>
               <img className='hover:animate-spin-infinite transition-transform w-[2.2rem] h-[2.2rem] select-none' src={logo} />
               <span className='text-gray-300 text-[1.5rem] md:hiden lg:block select-none sm:hidden ml-3 sm:ml-4 lg:ml-0'>WinFilm</span>
           </Link>
           <div className='flex mt-20'> 
               <span className='md:hiden lg:block text-gray-300 text-lg sm:hidden'>MENU</span>
           </div>
           <Link to='/' className='flex mt-5 text-gray-300'>
                <FaHome className='w-6 h-6 sm:ml-1 lg:ml-0'/>
                <span className='md:hiden lg:block lg:text-md sm:hidden ml-2'>Home</span>
           </Link>
           <Link to='movies' className='flex mt-2 text-gray-300'>
                 <BiMoviePlay className='w-6 h-6 sm:ml-1 lg:ml-0'/>
                <span className='md:hiden lg:block lg:text-md sm:hidden ml-2'>Movies</span>
           </Link>
           <Link to='history' className='flex mt-2 text-gray-300'>
                 <FaHistory className='w-6 h-6 sm:ml-1 lg:ml-0'/>
                <span className='md:hiden lg:block lg:text-md sm:hidden mb-3 ml-2'>History</span>
           </Link>

           {userStorage && isAdmin && <div className='lg:mt-10 sm:mt-0'>
            <span className='md:hiden lg:block text-gray-300 text-lg sm:hidden'>MANAGER</span>
            <Link to='/admin/movies' className='flex text-gray-300  mt-3'>
                 <AiOutlineAppstore className='w-6 h-6 sm:ml-1 lg:ml-0'/>
                <span className='md:hiden lg:block lg:text-md sm:hidden ml-2'>Manager Movies</span>
           </Link>
           <Link to='/admin/users' className='flex mt-2 text-gray-300'>
                 <FaUsersCog className='w-6 h-6 sm:ml-1 lg:ml-0'/>
                <span className='md:hiden lg:block lg:text-md sm:hidden ml-2'>Manager Users</span>
           </Link>
           </div>}
           <div className='flex lg:mt-10 sm:mt-0 text-gray-300 mt-3'> 
               <span className='md:hiden lg:block lg:text-md text-lg sm:hidden'>PERSONAL</span>
           </div>
            
              {userStorage && name &&
                <div
                className="flex">
                <Avatar 
                 style={{ backgroundColor: avatarColor || '#999',
                 margin: '8px 0',
                verticalAlign: 'middle', }} 
                size="medium">
                    {name.charAt(0).toUpperCase() || "404"}
               </Avatar>
                <span className="text-gray-300 mt-4 ml-2 lg:block sm:hidden">{name}</span>
              </div>
             }
             {TypeButton && <button onClick={handleSignOut} className='flex mt-5 sm:mt-2 text-gray-300 pr-20'>
               <FaSignInAlt className='w-6 h-6'/>
               <span className='lg:block sm:hidden ml-2'>Sign out</span>
            </button>}
            {!TypeButton &&  
             <Link  to='/signin' className='flex mt-5 sm:mt-2 text-gray-300 pr-20'>
               <FaSignInAlt className='w-6 h-6'/>
               <span className='lg:block sm:hidden ml-2'>Sign in</span>
            </Link>}
          
        </div>


        {/* Content */}
        <div className="lg:w-[60%] sm:w-[90%] w-[100%]">
          <div className="flex-grow px-[4vw] md:px-8 pb-8 pt-0 overflow-x-hidden  overflow-y-scroll  scrollbar scroll-m-[24rem] scroll-ml-[6rem] flex flex-col h-screen">
          <div className="fixed top-3 right-4 left-4 lg:hidden sm:hidden">
              <div className="flex justify-between">
              <Link to='/' className='flex w-full '>
               <img className='w-[2rem] h-[2rem] select-none mr-2' src={logo} />
               <span className='text-gray-300 text-[1.5rem] md:hiden lg:block select-none sm:hidden ml-1 sm:ml-4'>WinFilm</span>
               </Link>
               <FaBars onClick={showNavBar} className="text-gray-50 text-3xl"/>
              </div>
          </div>
            <div className="relative h-0 pb-[42%] mt-[4rem]">
            <div className={clsx({["animate-pulse bg-gray-700 123"] : isLoading}, "flex absolute top-0 left-0 w-full h-full rounded-2xl")}>
              <Swiper 
              className="mySwiper rounded-2xl overflow-hidden flex justify-content align-center"
              spaceBetween={30}
              centeredSlides={true}
                autoplay={{
                  delay: 5000,
                 disableOnInteraction: false,
              }}
               pagination={{
                 clickable: true,
              }}
              navigation={true}
             modules={[Autoplay, Navigation]}
             >
             {!isLoading && movies.map((movie, index) => (
               <SwiperSlide key={index} onClick={() => handleSelectedMovie(movie.mId)}>
                   <div className="relative">
                    <img className="w-full"  src={movie.largeImage} alt={movie.name}/>
                    <div className="absolute lg:top-[18rem] lg:left-5 lg:w-[20rem] top-[7rem] left-3 lg:w-full">
                        <span className="font-light text-xl lg:text-3xl text-gray-50">
                        {movie.name || ""}
                        </span>
                     </div>
                  </div>    
              </SwiperSlide>
         ))}
          </Swiper>
          </div>  
         </div>
          {moviesTypeRef.current("Action")}
          {moviesTypeRef.current("Drama")}
          {moviesTypeRef.current("Science Fiction")}
          {moviesTypeRef.current("Thriller")}
          {moviesTypeRef.current("Crime")}
          {moviesTypeRef.current("Horror")}
       </div>
    </div>

    {/* Category */}
    <div className="lg:w-[20%] sm:w-[10%]">
        <div className="flex w-full mt-5">
        <div className="md:block  w-full">
           <div className="relative group">
           <form  onSubmit={handleSubmitFormSearch}>
              <input value={formSearch} onChange={e => setFormSearch(e.target.value)} className="bg-transparent outline-none border border-gray-600 w-full text-gray-50 rounded-full py-2 pl-4 pr-8" type="text" placeholder="Search..."/>
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2"><FaSearch className="fas fa-search text-xl text-gray-50"></FaSearch>
              </button>
               </form>
              {formSearch && movieSearch &&
                  <ul className="bg-[#333] max-h-[18rem] overflow-y-scroll absolute right-0 left-0 top-[100%] divide-solid divide-y-[0.01px]">
                     {movieSearch.map((movie,index) => (
                        <li key={index} onClick={() => handleSelectedMovie(movie.mId)} className="w-full p-2 cursor-pointer hover:bg-[#111]">
                              <span className="text-gray-200">{movie.name}</span>
                        </li>
                     ))}
                 </ul>}
              </div>
            </div>
        </div>

        <div className="w-full mt-6">
             <span className="text-gray-50 text-2xl mb-3">Top IMDB</span>
             {movieImdb && movieImdb.map((movie,index) => (
                  <div key={index} onClick={() => handleSelectedMovie(movie.mId)} >
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
                 </div>
             ))}
        </div>
        </div>
       </div>
    );
}   

