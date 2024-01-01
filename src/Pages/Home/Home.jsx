import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h2 className="text-3xl font-bold text-center mb-6">
        Welcome to my Website
      </h2>
      <p className="text-[16px] font-medium text-center mb-6">
        Do you want to go homepage? Kindly click this button
      </p>
      <Link
        className="login-btn text-lg font-semibold text-white bg-blue-500 py-4 px-8 rounded-full"
        to="/home"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default Home;
