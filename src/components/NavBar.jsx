import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { Link, useNavigate } from 'react-router-dom';
import { Register, Login } from '../utils/Icons';
import { useTheme } from '../context/ThemeContext';
import logo from "/logo.webp";
const NavBar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Contact ', href: 'https://www.linkedin.com/in/kenmegne-yoh-ivana-marina-a656a92a0', external: true },
    { label: "S'inscrire", action: () => navigate("/register"), icon: <Register /> },
    { label: 'Connexion', action: () => navigate("/login"), icon: <Login /> },
  ];

  return (
    <header className={`w-full py-4 px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center border-b border-gray-200 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      {/* Logo and title */}
      <div className="flex items-center space-x-3">


      <img
          src={logo}
          alt="spend smart logo"
          className="w-[2rem] md:w-[10rem]" onClick={() => navigate("/")}
        />
        
  {/* </h1> */}
        {/* <span className='px-2 py-1 text-xs text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 sm:text-sm'>
          DA VINCI IT SOLUTIONS
        </span>
        <h1 className="text-lg font-semibold cursor-pointer sm:text-xl" onClick={() => navigate("/")}>
          Expense
        </h1> */}
      </div>

      {/* Desktop Menu */}
      <nav className="items-center hidden space-x-4 md:flex">
        {navItems.map((item, index) => (
          item.external ? (
            <Link key={index} to={item.href} target="_blank" className="text-sm transition-colors hover:text-indigo-600">
              {item.label}
            </Link>
          ) : (
            <Button 
              key={index}
              color="primary" 
              variant={item.label === 'Login' ? 'bordered' : 'solid'}
              className="text-sm"
              startContent={item.icon}
              onPress={item.action}
              size="sm"
            >
              {item.label}
            </Button>
          )
        ))}
        <button 
          onClick={toggleTheme}
          className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}
        >
          {theme === 'light' ? '🌙' : '🌞'}
        </button>
      </nav>

      {/* Mobile Menu Button */}
      <button 
        className="text-2xl md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="w-full mt-4 md:hidden">
          {navItems.map((item, index) => (
            item.external ? (
              <Link 
                key={index} 
                to={item.href} 
                target="_blank" 
                className="block py-2 text-sm transition-colors hover:text-indigo-600"
              >
                {item.label}
              </Link>
            ) : (
              <Button 
                key={index}
                color="primary" 
                variant={item.label === 'Login' ? 'bordered' : 'solid'}
                className="w-full mb-2 text-sm"
                startContent={item.icon}
                onPress={item.action}
                size="sm"
              >
                {item.label}
              </Button>
            )
          ))}
          <button 
            onClick={toggleTheme}
            className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} text-center`}
          >
            {/* {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'} */}
            {theme === 'light' ? '🌙' : '🌞'}
          </button>
        </div>
      )}
    </header>
  );
};

export default NavBar;