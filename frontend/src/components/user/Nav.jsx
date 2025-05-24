// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser, disconnectSocket } from '@/store/auth-slice';
import { Button } from '../ui/button';
import { IoLogOut } from 'react-icons/io5';
import { AlignJustify, X } from 'lucide-react';

function Nav() {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

 function handleLogout() {
    dispatch(logoutUser()).then(() => {
 dispatch(disconnectSocket())
    })
   }

  const navLinks = [
    { to: '/messages', label: 'Message' },
    { to: '/user/service', label: 'Service' },
    { to: '/user/profile', label: 'Profile' }
  ];

  return (
    <nav className="flex justify-between gap-2 items-center shadow-md py-4 px-8 bg-white">
      <h1 className="text-5xl font-bold text-green-950">
        <a href="/user/home">ProHire</a>
      </h1>

      <Button onClick={() => setIsMenuOpen(prev => !prev)} className="lg:hidden sm:block px-4 py-2">
        {isMenuOpen ? <X /> : <AlignJustify />}
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="hidden lg:flex space-x-5 mr-10">
        {navLinks.map(link => (
          <Link key={link.label} to={link.to} className="text-green-950 font-bold text-2xl hover:text-neutral-500 transition duration-300">
            {link.label}
          </Link>
        ))}
        <Button onClick={handleLogout} className="inline-flex px-4 py-2 gap-2 items-center rounded-md text-light bg-green-950">
          <IoLogOut />
        </Button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 right-0 bg-white shadow-lg w-full p-4 z-20">
          {navLinks.map(link => (
            <Link key={link.label} to={link.to} onClick={() => setIsMenuOpen(false)} className="block text-green-950 font-bold text-2xl hover:text-neutral-500 transition duration-300 py-2">
              {link.label}
            </Link>
          ))}
          <Button onClick={handleLogout} className="inline-flex justify-center px-4 py-2 gap-2 items-center rounded-md text-light bg-green-950">
            <IoLogOut />
          </Button>
        </div>
      )}
    </nav>
  );
}

export default Nav;
