import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { Link, useNavigate } from 'react-router-dom';
import arrow from '../assets/arrow.gif';
import { Register, Login } from '../utils/Icons';
import { useTheme } from '../context/ThemeContext'; // Importer le hook de thème

const NavBar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme(); // Utiliser le hook de thème
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`w-full h-[10vh] px-6 sm:px-8 md:px-12 flex justify-between items-center border-b-1 border-gray-300 z-[999] ${theme}`}>
      {/* Logo and title */}
      <div className="flex items-center gap-x-3">
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
          DAVINCIITSOLUTIONS
        </span>
        <h6
          className="text-sm sm:text-base md:text-lg uppercase cursor-pointer text-gray-700 font-light"
          onClick={() => navigate("/")}
        >
          Expense
        </h6>
      </div>

      {/* Menu for large screens */}
      <div className="hidden md:flex items-center space-x-4">
        <img src={arrow} alt="" className="w-[35px]" />
        <Link
          to="https://www.linkedin.com/in/kenmegne-yoh-ivana-marina-a656a92a0"
          target="_blank"
          className="text-xl text-secondary transition-all hover:text-primary relative animateBottom"
        >
          Contact Me
        </Link>
        <Button
          color="primary"
          className="text-base md:text-lg w-[7rem] sm:w-[8rem]"
          startContent={<Register />}
          onPress={() => navigate("/register")}
          radius="sm"
        >
          Register
        </Button>
        <Button
          color="primary"
          variant="bordered"
          className="text-base md:text-lg w-[7rem] sm:w-[8rem]"
          startContent={<Login />}
          onPress={() => navigate("/login")}
          radius="sm"
        >
          Login
        </Button>
        <div
          onClick={toggleTheme} // Changer le thème lorsqu'on clique
          className={`w-10 h-10 flex items-center justify-center cursor-pointer rounded-full border-2 border-primary bg-${theme === 'light' ? 'gray-300' : 'gray-700'} text-${theme === 'light' ? 'black' : 'white'} transition-colors`}
        >
          {theme === 'light' ? '🌙' : '🌞'} {/* Icône en fonction du thème */}
        </div>
      </div>

      {/* Hamburger menu for small screens */}
      <div className="md:hidden flex items-center">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="text-2xl"
        >
          {isMenuOpen ? '✕' : '☰'} {/* Icon for menu toggle */}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-[10vh] left-0 w-full bg-white shadow-lg p-4 md:hidden">
          <img src={arrow} alt="" className="w-[35px]" />
          <Link
            to="https://www.linkedin.com/in/kenmegne-yoh-ivana-marina-a656a92a0"
            target="_blank"
            className="block text-xl text-secondary transition-all hover:text-primary relative animateBottom py-2"
          >
            Contact Me
          </Link>
          <Button
            color="primary"
            className="block text-base md:text-lg w-full mb-2"
            startContent={<Register />}
            onPress={() => navigate("/register")}
            radius="sm"
          >
            Register
          </Button>
          <Button
            color="primary"
            variant="bordered"
            className="block text-base md:text-lg w-full mb-2"
            startContent={<Login />}
            onPress={() => navigate("/login")}
            radius="sm"
          >
            Login
          </Button>
          <div
            onClick={toggleTheme} // Changer le thème lorsqu'on clique
            className={`w-10 h-10 flex items-center justify-center cursor-pointer rounded-full border-2 border-primary bg-${theme === 'light' ? 'gray-300' : 'gray-700'} text-${theme === 'light' ? 'black' : 'white'} transition-colors`}
          >
            {theme === 'light' ? '🌙' : '🌞'} {/* Icône en fonction du thème */}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
