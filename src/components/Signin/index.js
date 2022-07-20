import React, { useEffect ,useRef,useState } from 'react';
import { Link , useNavigate  } from 'react-router-dom'
import { LockClosedIcon } from '@heroicons/react/solid'
import logo from '../../assets/images/logo.png'
import { useStore , actions } from '../../store'
import { Button } from 'antd';

const Login = () => {
    const [ state , dispatch ] = useStore()
    const { users , movies  , currentUser } = state
    const [ checked, setChecked ] = useState(false);
    const [ username , setUsername ] = useState(JSON.parse(localStorage.getItem('remember')).username);
    const [ password , setPassword ] = useState(JSON.parse(localStorage.getItem('remember')).password);
    const [ invalidUsername, setInvalidUsername ] = useState(false);
    const [ invalidPassword, setInvalidPassword ] = useState(false);
    const navigate = useNavigate()
    const usernameRef = useRef()
    const passwordRef = useRef()


    useEffect(() => {
         if(username && password) {
             usernameRef.current.style = 'background: #e8f0fe'
             passwordRef.current.style = 'background: #e8f0fe'
         }
    },[])
   

    const handleSubmit = (e) =>{ 
      e.preventDefault()
      if(checked){
        localStorage.setItem('remember', JSON.stringify({username, password}))
      }
      const foundUser =  users.find(user => user.username === username)
      console.log('Username: ' ,username );
      console.log('Password: ' ,password );
      console.log('Found user: ' ,foundUser );

      if(foundUser && foundUser.username === username && foundUser.password === password && foundUser.role){
        localStorage.setItem('user', JSON.stringify({uid: foundUser.id }))
        navigate('/')
      }else if(foundUser && foundUser.username === username && foundUser.password === password && !foundUser.role) {
        localStorage.setItem('user', JSON.stringify({ uid: foundUser.id}))
        navigate('/')
      }else if(!foundUser){
        setInvalidUsername(true)
        setInvalidPassword(false)
      }else{
        setInvalidUsername(false)
        setInvalidPassword(true)
      }
    }
    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background bg-no-repeat	bg-cover h-screen">
        <div className="max-w-md w-full space-y-8">
          <div>
          <Link to='/' className='group fixed top-8 left-8 flex '>
               <img className="w-[2rem] h-[2rem] mt-[4px] group-hover:animate-spin-infinite transition-transform" src={logo}/>
               <span className='text-gray-300 text-[1.5rem] mt-1 mx-2 sm:hidden xl:block'>WinPhim</span>
           </Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">Sign In</h2>
          </div>
          <form
          onSubmit={handleSubmit} 
          className="mt-8 space-y-6">
            <input className="text-gray-300" type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div 
              className="relative">
                <label className="text-gray-300 font-bold">Username</label>
                <input
                  onChange={e => setUsername(e.target.value)}
                  value={username}
                  ref={usernameRef}
                  autoComplete="username"
                  required
                  className="my-3 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
                {invalidUsername &&  <span className="text-red-500 absolute bottom-[-1.3rem] right-0 left-0">Username does not exist!</span>}
              </div>
              <div 
              className="relative top-3"
              >
                <label className="text-gray-300 font-bold">Password</label>
                <input
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  ref={passwordRef}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
               {invalidPassword && <span className="text-red-500 absolute bottom-[-1.3rem] right-0 left-0">Password incorrect!</span>}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center mt-5">
                <input
                  onChange={() => setChecked(!checked)}
                  id="rememberme"
                  type="checkbox"
                  checked={checked}
                  className="h-4 w-4  text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-50">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Button type="primary">
                   <Link to="/signup">
                     Sign Up
                   </Link>
                </Button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-lg font-lg rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default React.memo(Login);
