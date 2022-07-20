import {  serverTimestamp } from 'firebase/firestore';
import React , { useEffect, useLayoutEffect, useRef, useState }from 'react';
import { AiOutlinePlus } from 'react-icons/ai'
import { Link , useNavigate } from 'react-router-dom'
import { Modal } from 'antd';
import logo from '../../assets/images/logo.png'
import { useStore } from '../../store'
import { addMovie , deleteMovie , updateMovie } from '../../firebase';
import { makeStyles } from '@material-ui/styles';
import ClampLines from 'react-clamp-lines';
import notFoundImage from '../../assets/images/cinema.svg'


const useStyles = makeStyles(theme => ({
    bgImage: {
      backgroundImage: `url(${notFoundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#111',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      height: '100%',
      backgroundSize: '10rem',
      position: "relative",
      borderRadius: '1.5rem',
    },
    bgColor: {
    backgroundColor: '#999',
    height: '100%'
    },
  }));
const Movies = () => {
  const [ state , dispatch] = useStore();
  const { movies , users , isLoading }  = state
  const classes = useStyles()
  const [ isShowModal , setIsShowModal] = useState(false)
  const [ userStorage , setUserStorage ] = useState(JSON.parse(localStorage.getItem('user')))
  const [ foundUser, setFoundUser] = useState(userStorage && users.find(user => user.id === userStorage.uid) || '')
  const [ isAdmin , setIsAdmin] = useState(foundUser && foundUser.role)
  const [ mId , setMid ] = useState('')
  const [ name , setName ] = useState('')
  const [ thumbnail , setThumbnail ] = useState('')
  const [ largeImage , setLargeImage ] = useState('')
  const [ genres , setGenres ] = useState('')
  const [ duration , setDuration ] = useState('')
  const [ countries , setCountries ] = useState('')
  const [ cast , setCast ] = useState('')
  const [ imdb , setImdb ] = useState('')
  const [ description , setDescription ] = useState('')
  const [ type, setType ] = useState('odd');
  const classTh = "px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border border-gray-200 bg-gray-50"
  const classInput = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
  const [ invalidId , setInvalidId ] = useState(false)
  const stateButtonRef = useRef(false)
  const selectIdRef = useRef()
  const navigate = useNavigate()

  useLayoutEffect(() => {
    console.log("Movies: ", movies);
    console.log("isLoading: ", isLoading);
    if(!userStorage && !isAdmin){
             navigate('/404Error')
         }
         return () => {
            //  
         }
})
const someMethodIThinkMightBeSlow = () => {
    const startTime = performance.now();

    // Do the normal stuff for this function
    const duration = performance.now() - startTime;
    console.log(`someMethodIThinkMightBeSlow took ${duration}ms`);
}

setTimeout(someMethodIThinkMightBeSlow,0);
//   ShowModalAdd
 const showModalAdd = () => {
    setIsShowModal(true)
    stateButtonRef.current = false
    console.log("Clear");
    setMid(null)
    setName(null)
    setThumbnail(null)
    setLargeImage(null)
    setGenres(null)
    setDuration(null)
    setCountries(null)
    setCast(null)
    setImdb(null)
    setDescription(null)
 }

// hideModalAdd
 const hideModalAdd = () => {
    setIsShowModal(false)
 }

  //  Handle addDoc
  const  handleAddDoc = (e) =>{
    const checkId = movies.some(movie => movie.mId === mId)
    console.log('Sumit');
    e.preventDefault();
     const formData = {
      mId,
      name,
      thumbnail,
      largeImage,
      genres,
      duration,
      countries,
      cast,
      imdb,
      description,
      type: type,
      createdAt: serverTimestamp()
    } 
    if(checkId){
        console.log("Case 1");
        setInvalidId(true)
    }else{
        console.log("Case 2");
        hideModalAdd()
        addMovie(formData)
        setMid(null)
        setName(null)
        setThumbnail(null)
        setLargeImage(null)
        setGenres(null)
        setDuration(null)
        setCountries(null)
        setCast(null)
        setImdb(null)
        setDescription(null)
    }
  }
//  Handle UpdateDoc
  const hanldeUpdateDoc = (e) =>{
    e.preventDefault();
    console.log("selectIdRef" , selectIdRef.current);
    const formData = {
        mId,
        name,
        thumbnail,
        largeImage,
        genres,
        duration,
        countries,
        cast,
        imdb,
        description,
        type: type,
        createdAt: serverTimestamp()
      } 
      updateMovie(formData, selectIdRef.current)
}
const setUpFormUpdate = (id) =>{
     setIsShowModal(true)
     selectIdRef.current = id
     stateButtonRef.current = true
     const foundMovie = movies.find(movie => movie.id === id)
     setMid(foundMovie.mId)
     setName(foundMovie.name)
     setThumbnail(foundMovie.thumbnail)
     setLargeImage(foundMovie.largeImage)
     setGenres(foundMovie.genres)
     setDuration(foundMovie.duration)
     setCountries(foundMovie.countries)
     setCast(foundMovie.cast)
     setImdb(foundMovie.imdb)
     setDescription(foundMovie.description)
  }

    return (
        <div className="bg-background h-screen bg-cover bg-no-repeat overflow-x-hidden">
           <div className="container flex justify-center align-middle mx-auto relative z-10">
          <div className="flex ">
            <Link to='/' className='group fixed top-8 left-8 flex '>
               <img className="w-[2rem] h-[2rem] mt-[4px] group-hover:animate-spin-infinite transition-transform" src={logo}/>
               <span className='text-gray-300 text-[1.5rem] mt-1 mx-2 sm:hidden xl:block'>WinPhim</span>
           </Link>   
           <button
            className="bg-gray-300 p-4 group absolute top-3 right-10 flex rounded-full shadow-lg shadow-cyan-500/50 z-10" 
            onClick={showModalAdd}>
                <AiOutlinePlus title="Add Movie" size={40 }/>
           </button>     
          </div>
          <div className="flex flex-col mt-[10rem]">
       <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 lg:w-90% fixed top-[6rem] right-10 left-10">
    <div className={movies.length === 0 ? classes.bgImage : classes.bgColor}>
        <div
         className="inline-block min-w-full relative align-middle border-b border-gray-200 shadow sm:rounded-lg  overflow-y-scroll h-[35rem]">
            <table className="min-w-full">
                <thead className="overflow-y-hidden">
                    <tr>
                        <th
                            className={classTh}>
                            ID</th>
                        <th
                            className={classTh}>
                            Thumbnail</th>
                        <th 
                            className={classTh}>
                             Name
                        </th>
                        <th
                            className={classTh}>
                            Genres</th>
                       <th
                            className={classTh}>
                            Contries</th>
                        <th
                            className={classTh}>
                            Cast</th>
                        <th
                            className={classTh}>
                            Duration</th>
                        <th
                            className={classTh}>
                            IMDB</th>
                         <th
                            className={classTh}>
                            Description</th>
                        <th
                         className={classTh}>
                            CreatedAt</th>
                        <th
                            className={classTh}>
                            Edit</th>
                        <th
                            className={classTh}>
                            Delete</th>
                    </tr>
                </thead>

                <tbody className="bg-white overflow-y-scroll">
                   {movies  &&  movies.map((movie,index) => 
                    <tr key={index}>
                         <td className="whitespace-no-wrap border border-gray-200">
                            <div className="text-sm text-center leading-5">{index + 1}</div>
                        </td>
                        <td className="whitespace-no-wrap border border-gray-200">
                        <img
                         className="h-[10rem] w-full"
                         src={movie.thumbnail}
                         alt={movie.name}
                       />
                        </td>
                        <td className="whitespace-no-wrap border border-gray-200">
                        <ClampLines
                            text={movie.name || "N/A"}
                            lines={2}
                            ellipsis="..."
                            moreText="See More..."
                            lessText="See Less..."
                            className="custom-class text-sm font-bold px-3 leading-5 text-gray-900"
                            innerElement="div"
                        />
                        </td>
                        <td className="whitespace-no-wrap border border-gray-200">
                            <div className="text-sm px-3 leading-5 text-gray-500">{movie.genres}</div>
                        </td>
                        <td className="whitespace-no-wrap border border-gray-200">
                            <div className="text-sm px-3 leading-5 text-gray-500">{movie.countries || "N/A"}</div>
                        </td>                    
                        <td 
                         className="border border-gray-200">
                        <ClampLines
                            text={movie.cast || "N/A"}
                            lines={2}
                            ellipsis="..."
                            moreText="See More..."
                            lessText="See Less..."
                            className="custom-class text-sm px-3 leading-5 text-gray-500"
                            innerElement="div"
                        />
                        </td> 
                        <td className="whitespace-no-wrap border border-gray-200">
                            <div className="text-sm text-center leading-5 text-gray-500">{movie.duration}</div>
                        </td> 
                        <td className="whitespace-no-wrap border border-gray-200">
                            <div className="text-sm text-center leading-5 text-gray-500">{movie.imdb}</div>
                        </td> 
                        
                        <td className="border border-gray-200">
                         <ClampLines
                           text={movie.description ||  "N/A"}
                            lines={2}
                            ellipsis="..."
                            moreText="See More..."
                            lessText="See Less..."
                            className="custom-class text-sm px-3 leading-5 text-gray-500"
                            innerElement="div"
                        />
                        </td> 
                        
                        <td className="whitespace-no-wrap px-2 border border-gray-200">
                        <ClampLines
                            text={movie.createdAt.toDate().toString() || "N/A"}
                            lines={1}
                            ellipsis="..."
                            moreText="See More..."
                            lessText="See Less..."
                            className="custom-class text-sm px-3 leading-5 text-gray-500"
                            innerElement="div"
                        />
                         </td>
                         <td
                            className="whitespace-no-wrap  border border-gray-200 px-6 py-4">
                            <svg onClick={() => setUpFormUpdate(movie.id)} xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 hover:opacity-70 text-blue-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </td>
                        <td
                            className="whitespace-no-wrap  border border-gray-200 px-8   py-4">
                            <svg onClick={() => deleteMovie(movie.id)} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer w-6 h-6 hover:opacity-70 text-red-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </td>
                    </tr>
                    )}
                </tbody>
                
            </table>
        </div>
       
        </div>
    </div>
</div>
         </div>
         <div>
         <Modal 
            title={`${stateButtonRef.current ? "Update" : "Add"} Movie`}
            visible={isShowModal} 
            width={500}
            footer={false}
            onCancel={hideModalAdd}
            style={{
              position: 'fixed',
              top: '2%',
              right: '50%',
              left: '35%',
              height: '500px'
            }}
            > 
        <form className="pt-2">
          <div className="mb-4"> 
          {invalidId && <label className="text-red-500">ID already exists</label>}
         <input className={classInput} value={mId} onChange={e => setMid(e.target.value)} required placeholder="ID"/>
         </div>
         <div className="mb-4">
         <input className={classInput} value={name} onChange={e => setName(e.target.value)} required placeholder="Name"/>
         </div>
         <div className="mb-4">
         <input className={classInput} value={thumbnail} onChange={e => setThumbnail(e.target.value)} required placeholder="Thumbnail"/>
         </div>
         <div className="mb-4">
         <input className={classInput} value={largeImage} onChange={e => setLargeImage(e.target.value)} required placeholder="Large Image"/>
         </div>
         <div className="mb-4">
         <input className={classInput} value={genres} onChange={e => setGenres(e.target.value)} required placeholder="Genres"/>
         </div>
         <div className="mb-4">
         <input className={classInput} value={duration} onChange={e => setDuration(e.target.value)} required placeholder="Duration"/>
         </div>
         <div className="mb-4">
         <input className={classInput} value={countries} onChange={e => setCountries(e.target.value)}  placeholder="Countries"/>
         </div>
         <div className="mb-4">
         <input className={classInput} value={imdb} onChange={e => setImdb(e.target.value)} required placeholder="IMDB"/>
         </div>
         <div className="mb-4">
         <input className={classInput} value={cast} onChange={e => setCast(e.target.value)} required placeholder="Cast"/>
         </div>
         <div className="mb-4">
          <div className="flex">
              <select
              value={type}
               onChange={e => setType(e.target.value)}
               className="w-[6rem] outline outline-1 rounded-md  outline-offset-2  outline-gray-300">
                  <option  value="odd">Odd</option>
                  <option  value="set">Set</option>
              </select>
          </div> 
         </div>
        <div className="mb-6">
        <textarea className={classInput} value={description} onChange={e => setDescription(e.target.value)} placeholder="Description"/>
        </div>
       <div className="flex justify-center">
       {stateButtonRef.current && 
           <button onClick={hanldeUpdateDoc} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
           Update
         </button>}
        {!stateButtonRef.current && 
           <button onClick={handleAddDoc} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
           Add
         </button>}
    </div>
              </form>
           </Modal>
         </div>
        </div>


    );
}

export default React.memo(Movies);
