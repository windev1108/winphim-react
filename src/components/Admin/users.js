import { Avatar, Tooltip, Modal} from 'antd';
import React, { useLayoutEffect } from 'react'; 
import { Link , useNavigate } from 'react-router-dom'
import { useStore } from '../../store' 
import { deleteUser } from '../../firebase';
import { IoIosAdd } from 'react-icons/io'
import { useState } from 'react'
import { addUser } from '../../firebase'
import logo from '../..//assets/images/logo.png';

const Users = () => {
    const [ state , dispatch ] = useStore()
    const { users } = state
    const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
    const classInput = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
    const [ showModalAdd , setShowModalAdd] = useState(false)
    const [ name , setName ] = useState('')
    const [ username , setUsername ] = useState('')
    const [ password , setPassword ] = useState('')
    const [ repeatPassword , setRepeatPassword ] = useState('')
    const [ invalidUsername , setInvalidUsername ] = useState(false)
    const [ invalidPassword , setInvalidPassword ] = useState()
    const [ userStorage , setUserStorage ] = useState(JSON.parse(localStorage.getItem('user')) || '')
    const [ foundUser, setFoundUser] = useState(userStorage && users.find(user => user.id === userStorage.uid) || '')
    const [ isAdmin , setIsAdmin] = useState(foundUser && foundUser.role)
    const navigate = useNavigate()
     
    const handleAddDoc = (e) => {
    e.preventDefault()
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
      Modal.confirm({
        title: 'Add user success!',
        okText: <div onClick={handleOk}>Sign in</div>,
        cancelText: 'Cancel',
      });
      setShowModalAdd(false);
      addUser(formData);
      setName(null);
      setUsername(null);
      setPassword(null);
      setRepeatPassword(null);
       }
    }
    const handleOk = () =>{
        console.log("HandleOk");
        navigate('/signin')
      }
      useLayoutEffect(() => {
         if(!foundUser || !foundUser.role){
                  navigate('/404Error')
              }
     })
    
    return (
        <div className="bg-background h-screen bg-cover bg-no-repeat">
         <Modal 
            title="Add Movie"
            visible={showModalAdd} 
            width={500}
            footer={false}
            onCancel={() => setShowModalAdd(false)}
            style={{
              position: 'fixed',
              top: '20%',
              right: '50%',
              left: '35%',
              height: '500px'
            }}
            >
        <form className="pt-2" 
            onSubmit={handleAddDoc}>
          <div className="mb-8"> 
         <input
          onChange={e => setName(e.target.value)}
          value={name}
          className={classInput}  required placeholder="Name"/>
         </div>
         <div className="relative mb-8">
         <input
          onChange={e => setUsername(e.target.value)}
          value={username}
          className={classInput}  required placeholder="Username"/>
         {invalidUsername && <span className="text-red-500 absolute bottom-[-1.5rem] left-0">Username already exists!</span>}
         </div>
         <div className="mb-8">
         <input
          onChange={e => setPassword(e.target.value)}
          value={password}
          type="password"
          className={classInput} required placeholder="Password"/>
         </div>
         <div className="relative mb-8">
         <input
          onChange={e => setRepeatPassword(e.target.value)}
          type="password"
          value={repeatPassword}
          className={classInput} required placeholder="Repeat Password"/>
          {invalidPassword && <span className="text-red-500 absolute bottom-[-1.5rem] left-0">Password does not match!</span>}
         </div>
       <div className="flex justify-center">
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Thêm mới
      </button>
    </div>
              </form>
           </Modal>
         <div className="container flex justify-center align-middle mx-auto">
          <div className="flex justify-between mx-5">
            <Link to='/' className='group fixed top-8 left-8 flex '>
               <img className="w-[2rem] h-[2rem] mt-[4px] group-hover:animate-spin-infinite transition-transform" src={logo}/>
               <span className='text-gray-300 text-[1.5rem] mt-1 mx-2 sm:hidden xl:block'>WinPhim</span>
           </Link>
           <button
            className="bg-slate-300 px-6 py-2 group fixed top-8 right-8 flex" 
            onClick={() => setShowModalAdd(true)}>
                <IoIosAdd title="Add Camera" size={40}/>
           </button>
          </div>
          <div className="flex flex-col mt-[10rem]">
       <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 lg:w-90%">
        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th
                            className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            ID</th>
                        <th 
                            className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                             Avatar
                        </th>
                        <th
                            className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Name</th>
                        <th
                            className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Username</th>
                        <th
                            className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Password</th>
                        <th
                            className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Role</th>
                        <th
                            className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            CreatedAt</th>
                        <th
                            className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Edit</th>
                        <th
                            className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Delete</th>
                    </tr>
                </thead>

                <tbody className="bg-white">
                   {users && users.map((user,index) => 
                    <tr key={index}>
                         <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-500">{index + 1}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <Tooltip title={user.name} placement="bottom">
                               <Avatar 
                                 style={{ backgroundColor: user.avatarColor || '#999',
                                 verticalAlign: 'middle', }} 
                                 size="large">
                                {user.name.charAt(0).toUpperCase()}
                               </Avatar>
                          </Tooltip>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <div className="text-sm font-medium leading-5 text-gray-900">
                                     {user.name}
                               </div>
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-500">{user.username}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-500">{user.password}</div>
                        </td>                    
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <span
                                style={{backgroundColor: user.role ? '#dcfce7' : '#66a8fa', color: user.role ? '#333' : '#fff' }}
                                className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">{user.role ? 'Admin' : 'Member'}</span>
                        </td>

                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 trumcate">
                             {user.name}
                         </td>

                        <td
                            className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 hover:opacity-70 text-blue-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </td>
                        <td
                            className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            <svg onClick={() => deleteUser(user.id)} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer w-6 h-6 hover:opacity-70 text-red-400" fill="none"
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
    );
}

export default Users;
