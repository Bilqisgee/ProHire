// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";




function AuthLayout() {

const [isAdmin, setIsAdmin] = useState(false);
const navigate = useNavigate();



function handleBecomeWorkerClick(){
  setIsAdmin(true);
  navigate("/authen/login");
}



  return (
    <div className=" h-dvh w-dvw relative md:absolute sm:shrink aspect-auto">
      
<div>
<button  onClick={handleBecomeWorkerClick} aria-label="Become a worker" className="pr-10 text-white text-2xl w-64 p-6 fixed top-6 right-0 left-[-2] rounded-lg md:aspect-auto  bg-green-950  hover:bg-green-900">
Become a worker 
</button>
</div>
      <div className="flex items-center mx-8 mt-32 ">
        <Outlet  context={{isAdmin, setIsAdmin}} /> {/* Pass isAdmin and setIsAdmin to child routes */}
      </div>

    </div>
  );
}

export default AuthLayout;