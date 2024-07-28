import React from "react";
import { Button } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
//import { FaMoon, FaSun } from 'react-icons/fa';
// import {  Button } from 'flowbite-react';
//import { toggleTheme } from '../redux/theme/themeSlice';
import arrow from "../assets/arrow.gif";
import logo from "/logo.webp";
import { Register, Login } from "../utils/Icons";

const NavBar = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  return (
    <header className="w-full h-[10vh] px-6 sm:px-8 md:px-12 flex justify-between items-center border-b-1 border-gray-300 z-[999]">
      <div className="flex items-center gap-x-3">
        {/* <img
          src={logo}
          alt="spend smart logo"
          className="w-[2rem] md:w-[3rem]"
        /> */}
      


        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
        DAVINCIITSOLUTIONS
    </span>
    <h6
        className="text-sm sm:text-base md:text-lg uppercase cursor-pointer text-gray-700 font-light"
        onClick={() => navigate("/")}
    >
        Expense{" "}
          {/* <span className="text-primary text-base sm:text-xl md:text-2xl">
            Smart.
          </span> */}
    </h6>





      </div>
      <div className="hidden xmd:flex items-center space-x-4">
        <img src={arrow} alt="" className="w-[35px]" />
        <Link
          to="https://www.linkedin.com/in/kenmegne-yoh-ivana-marina-a656a92a0"
          target="_blank"
          className="text-xl text-secondary transition-all hover:text-primary relative animateBottom"
        >
          Contact Me
        </Link>
      </div>
      <div className="hidden min-[460px]:flex items-center space-x-2 sm:space-x-4">
      {/* <Button
          className='w-12 h-10 sm:w-auto sm:h-auto' // Adjusted button size for responsiveness
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button> */}
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
      </div>
    </header>
  );
};

export default NavBar;
