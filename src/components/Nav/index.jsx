import { Avatar } from 'antd';
import clsx from 'clsx';
import React, { useState } from 'react';
import { AiOutlineAppstore } from 'react-icons/ai';
import { BiMoviePlay } from 'react-icons/bi';
import { FaHistory, FaHome, FaSignInAlt, FaUsersCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'

const Nav = () => {
    const [ userStorage, setUserStorage ] = useState(JSON.parse(localStorage.getItem('user')) || '')
    const [ isAdmin , setIsAdmin ] = useState(false);
    const [ isNavbar , setIsNavbar ] = useState(false)
    const [ avatarColor ,setAvatarColor] = useState('');
    const [ name , setName] = useState('')
    const [ TypeButton , setTypeButton ] = useState(userStorage ? true : false)

    const handleSignOut = () =>{
        JSON.stringify(localStorage.removeItem('user', ''))
        setTypeButton(false)
        setIsAdmin(false)
        setName('')
        setUserStorage('')
    }

    return (
        <div className={clsx({['translate-x-0 sm:!translate-x-0'] : !isNavbar,['translate-x-[100%] bg-[#191a1f]']: isNavbar} ,'lg:!translate-x-0 flex-shrink-0 sm:sticky sm:w-[10%] left-auto right-full sm:!right-0 sm:!left-0 fixed top-0 flex flex-col items-stretch py-10 pl-5 xl:pl-10 pr-0 w-[90vw] max-w-[288px] sm:max-w-none  xl:w-72 border-r border-gray-600 h-screen overflow-y-auto lg:z-[1] z-[50] bg-dark sm:bg-transparent last:transition-all duration-500 lg:w-[20%]')}>
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
    );
}

export default Nav;
