import { Link } from "react-router-dom"; // Import useNavigate
// eslint-disable-next-line no-unused-vars
import React from 'react';


function Navv() {

  
  return (
    <nav className="flex justify-between items-center shadow-md py-4 px-8 bg-white aspect-auto">
      <div>
        <h1 className="text-5xl font-bold text-green-950">
          <a href="/">ProHire</a>
        </h1>
      </div>
      <div className="flex space-x-5 mr-10">
        <Link
          to="/authen/login"
          className="text-green-950 font-bold text-2xl hover:text-neutral-500 transition duration-300"
        >
          Service
        </Link>
       
       <Link to="/authen/signup" className="text-green-950 font-bold text-2xl hover:text-neutral-500 transition duration-300">Join us</Link>
       
      </div>
     
    </nav>
  );
}


export default Navv