import React from 'react';
import { Link } from 'react-router-dom';
import ErrorPage from '../../assets/images/error.png';

const Error = () => {
    return (
        <div className="flex justify-center items-center h-screen fixed top-0 right-0 left-0 bottom-0 bg-[#111]">
             <div className="text-center">
                <img src={ErrorPage} alt={ErrorPage} className="h-[15rem] w-[15rem]" />
                 <p className="text-gray-50 font-semibold mt-3">Not found this page!</p>
                 <Link to='/' className="text-blue-600 cursor-pointer font-semibold">Return Home</Link>
             </div>

         </div>
    );
}   

export default Error;
