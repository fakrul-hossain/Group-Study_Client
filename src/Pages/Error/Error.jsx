import React from 'react';
import errorLogo from '../../assets/error.svg'
import { NavLink } from 'react-router-dom';

const Error = () => {
    return (
        <div className='text-center'>
            <h1 className=' text-3xl font-bold text-purple-500 mt-20'>Something Went Wrong</h1>
            <div className="flex justify-center items-center my-20">
                    <img className='lg:w-[700px] w-96' src={errorLogo} alt="" />
            </div>

            <NavLink className="px-4 py-2 rounded-lg font-medium text-white bg-purple-500" to="/">Go To Home</NavLink>

        </div>
    );
};

export default Error;