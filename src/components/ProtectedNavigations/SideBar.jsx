import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Dashboard,
  Income,
  Expense,
  Settings,
  ShutDown as Logout,
} from "../../utils/Icons";
import { openModal } from "../../features/logoutModal/logoutModalSlice";

import logo from "/logo.webp";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isRouteActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="hidden xl:flex flex-col w-[15%] h-full border-r-1 border-secondary py-3">
  <div className="flex items-center px-4 gap-x-6">
  <img src={logo} alt="Da Vinci IT Solutions logo" className="w-[10rem]"  />
 
        
    {/* <span className='px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
        DAVINCIITSOLUTIONS
    </span> */}
    
</div>


      <menu className="flex flex-col w-full h-full px-3 mt-12">
        <div className="flex flex-col space-y-6">
          <li
            className={`link ${
              isRouteActive("/dashboard") ? "activeLink" : ""
            }`}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <Dashboard className="size-[1.5rem]" />
            Dashboard
          </li>
          <li
            className={`link ${
              isRouteActive("/dashboard/incomes") ? "activeLink" : ""
            }`}
            onClick={() => {
              navigate("/dashboard/incomes");
            }}
          >
            <Income className="size-[1.5rem]" />
           Revenu
          </li>
          <li
            className={`link ${
              isRouteActive("/dashboard/expenses") ? "activeLink" : ""
            }`}
            onClick={() => {
              navigate("/dashboard/expenses");
            }}
          >
            <Expense className="size-[1.5rem]" />
           Depense
          </li>
          <li
          className={`link ${isRouteActive("/dashboard/Suggestion") ? "activeLink" : ""}`}
          onClick={() => navigate("/dashboard/Suggestion")}
        >
          <Expense className="size-[1.5rem]" />
          Suggestion  </li>
        </div>
        <li
          className={`link mt-auto ${
            isRouteActive("/dashboard/settings") ? "activeLink" : ""
          }`}
          onClick={() => {
            navigate("/dashboard/settings");
          }}
        >
          <Settings className="size-[1.5rem]" />
        Parametre
        </li>
        <li
          className="mt-6 link hover:bg-error hover:text-white"
          onClick={() => dispatch(openModal())}
        >
          <Logout className="size-[1.5rem]" />
          Deconnexion
        </li>
      </menu>
    </nav>
  );
};

export default SideBar;
