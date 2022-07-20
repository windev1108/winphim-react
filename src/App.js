import { Home , Movies , Signin , Signup , WatchView, Search , History , ErrorPage, MoviesStore , UsersStore} from './components'
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import { useStore, actions } from './store'


function App() {
    const [state, dispatch] = useStore()
    const mid  = localStorage.getItem("mId") || ''
   
    return ( 
    <BrowserRouter>
    <Routes>
         <Route path='/' element = {<Home/> }/> 
         <Route path='/movies' element={<Movies/> }/> 
         <Route path='/history' element={<History/> }/> 
         <Route path='/signin' element={<Signin/> }/> 
         <Route path='/signup' element={<Signup/> }/> 
         <Route path='/admin/users' element={<UsersStore/> }/> 
         <Route path='/admin/movies' element={<MoviesStore/> }/> 
         <Route path={'/movie/' + mid}  element={<WatchView /> }/> 
         <Route path={'/search/:slug'} element={<Search/>} />
         <Route path='/*' element={<ErrorPage/> }/> 
     </Routes>
  </BrowserRouter>
    )
}

export default App;