import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { LockClosedIcon } from '@heroicons/react/solid'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { MdDoneOutline } from 'react-icons/md'
import logo from '../../assets/images/logo.png'
import { useStore } from '../../store';
import { addUser } from '../../firebase';
import { Button, Modal } from 'antd';
import { serverTimestamp , Timestamp  } from 'firebase/firestore';

const SignUp = () => {
  const [ state, dispatch ] = useStore();
  const { users } = state;
  const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
  const [ invalidUsername , setInvalidUsername ] = useState(false);
  const [ invalidPassword , setInvalidPassword ] = useState(false);
  const [ name ,setName ] = useState('');
  const [ username ,setUsername ] = useState('');
  const [ password ,setPassword ] = useState('');
  const [ repeatPassword ,setRepeatPassword ] = useState('');
  const [ showModal, setShowModal ] = useState(true);
  const navigate = useNavigate()

  // Handle signup
  const handleSignUp = async (e) => {
    e.preventDefault();
    const checkUsername = users.some(user => user.username === username)
    const checkPassword = password === repeatPassword
    if(checkUsername){
      setInvalidUsername(true)
      setInvalidPassword(false)
      console.log("setInvalidPassword(false) + setInvalidUsername(true)");
    }else if(!checkUsername && !checkPassword){
      setInvalidPassword(true)
      setInvalidUsername(false)
      console.log("setInvalidUsername(false)");
    } else if(!checkPassword){
      setInvalidPassword(true)
      console.log("setInvalidPassword(true)");
    } else{
      const formData =  {
        name,
        username,
        password,
        avatarColor: ColorList[Math.floor(Math.random() * ColorList.length)],
        role: false,
        createdAt:  new Date()
      }
      setName(null);
      setUsername(null);
      setPassword(null);
      setRepeatPassword(null);
      Modal.confirm({
        title: 'Register successfully!',
        okText: <div onClick={handleOk}>Sign in</div>,
        cancelText: 'Cancel',
      });
      addUser(formData);
    }
  }
  const handleOk = () =>{
    console.log("HandleOk");
    navigate('/signin')
  }
  return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background bg-no-repeat	bg-cover h-screen">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Link to='/' className='group fixed top-8 left-8 flex '>
               <img className="w-[2rem] h-[2rem] mt-[4px] group-hover:animate-spin-infinite transition-transform" src={logo}/>
               <span className='text-gray-300 text-[1.5rem] mt-1 mx-2 sm:hidden xl:block'>WinPhim</span>
           </Link>
            <h2 className="text-center text-3xl font-extrabold text-gray-50">Sign Up</h2>
          </div>
          <form onSubmit={handleSignUp} className="mt-8">
          <label className="text-gray-50 font-bold" htmlFor="name">
                  Name
                </label>
                <input
                  onChange={e => setName(e.target.value)}
                  value={name}
                  id="name"
                  name="Name"
                  type="name"
                  autoComplete="Name"
                  required
                  className="mt-3 mb-5 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                />
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="relative">
                <label className="text-gray-50 font-bold" htmlFor="username">
                  Username
                </label>
                <input
                  onChange={e => setUsername(e.target.value)}
                  value={username}
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  className="mt-3 mb-5 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
                {invalidUsername && <span className="text-red-500 absolute bottom-[-1.3rem] right-0 left-0">Username already exists!</span>}
              </div>
              <div>
                <label className="text-gray-50 font-bold" htmlFor="password" >
                  Password
                </label>
                <input
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-3 mb-5 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div className="relative">
                <label className="text-gray-50 font-bold" htmlFor="repeatPassword">
                  Repeat Password
                </label>
                <input
                  onChange={e => setRepeatPassword(e.target.value)}
                  value={repeatPassword}
                  id="repeatPassword"
                  name="repeatPassword"
                  type="password"
                  autoComplete="current-repeat Password"
                  required
                  className="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Repeat Password"
                />
                {invalidPassword && <span className="text-red-500 absolute bottom-[-1.3rem] right-0 left-0">Password does not match!</span>}
              </div>
            </div>

            <div className="flex items-center float-right pb-5">
              <div className="text-sm">
               <Button>
                 <Link
                 to="/signin">
                  Sign In
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
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default SignUp;
