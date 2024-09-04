import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { Link, useNavigate } from 'react-router-dom';
import { Register, Login } from '../utils/Icons';
import { useTheme } from '../context/ThemeContext';

const NavBar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Contact Me', href: 'https://www.linkedin.com/in/kenmegne-yoh-ivana-marina-a656a92a0', external: true },
    { label: 'Register', action: () => navigate("/register"), icon: <Register /> },
    { label: 'Login', action: () => navigate("/login"), icon: <Login /> },
  ];

  return (
    <header className={`w-full py-4 px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center border-b border-gray-200 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      {/* Logo and title */}
      <div className="flex items-center space-x-3">
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white text-xs sm:text-sm'>
          DAVINCIITSOLUTIONS
        </span>
        <h1 className="text-lg sm:text-xl font-semibold cursor-pointer" onClick={() => navigate("/")}>
          Expense
        </h1>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex items-center space-x-4">
        {navItems.map((item, index) => (
          item.external ? (
            <Link key={index} to={item.href} target="_blank" className="text-sm hover:text-indigo-600 transition-colors">
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
        className="md:hidden text-2xl"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="w-full md:hidden mt-4">
          {navItems.map((item, index) => (
            item.external ? (
              <Link 
                key={index} 
                to={item.href} 
                target="_blank" 
                className="block py-2 text-sm hover:text-indigo-600 transition-colors"
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