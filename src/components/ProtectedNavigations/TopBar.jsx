import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Avatar } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

import { Settings, ShutDown as Logout } from "../../utils/Icons";
import arrow from "../../assets/arrow.gif";
import avatar from "../../assets/avatar.webp";
import { openModal } from "../../features/logoutModal/logoutModalSlice";
import Menu from "./Menu";

const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme(); 

  const isRouteActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-full h-[10vh] flex justify-between items-center px-8 py-2 border-b-1 border-secondary">
      <div className="block xl:hidden">
        <Menu />
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <img src={arrow} alt="" className="w-[35px]  onClick={() => navigate("/")}" />
        <Link
          to="https://www.linkedin.com/in/kenmegne-yoh-ivana-marina-a656a92a0"
          target="_blank"
          className="text-xl text-secondary transition-all hover:text-primary relative animateBottom"
        >
          Contact Me
        </Link>
      </div>
      <div className="flex justify-center items-center space-x-4">
        {/* <Settings
          className={`hidden sm:block p-1 border-1 border-secondary rounded-lg size-[1.8rem] transition-all cursor-pointer hover:bg-slate-300 ${
            isRouteActive("/dashboard/settings") ? "activeLink" : ""
          }`}
          onClick={() => navigate("/dashboard/settings")}
        /> */}
        <Logout
          className="p-1 border-1 border-secondary rounded-lg size-[1.8rem] transition-all cursor-pointer hover:bg-error hover:text-white"
          onClick={() => dispatch(openModal())}
        />
        <Avatar
          src={avatar}
          name="Avatar"
          size="md"
          isBordered
          color="secondary"
          showFallback
        />

        {/* Bouton de changement de thème */}
        <div
          onClick={toggleTheme}
          className={`w-10 h-10 flex items-center justify-center cursor-pointer rounded-full border-2 border-primary bg-${theme === 'light' ? 'gray-300' : 'gray-700'} text-${theme === 'light' ? 'black' : 'white'} transition-colors`}
        >
          {theme === 'light' ? '🌙' : '🌞'}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
