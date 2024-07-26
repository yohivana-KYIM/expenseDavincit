import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "@nextui-org/react";
import { useNavigate, Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

import NavBar from "../components/NavBar";

import dashboard from "../assets/dashboard.webp";
import { StartNow, ThreeDots } from "../utils/Icons";

const Home = () => {
  const navigate = useNavigate();
  const userIsVerified = useSelector((state) => state.auth?.user?.verified);

  useEffect(() => {
    if (userIsVerified) {
      navigate("/dashboard");
    }
  }, [userIsVerified]);

  return (
    <main className={`${userIsVerified ? "hidden" : ""} w-full h-full`}>
      <NavBar />
      <div className="bg-primary-50 pb-4 pt-12 sm:pt-0 gap-y-12 flex flex-col sm:block h-[90vh] sm:h-full">
        <div className="w-full sm:h-[65vh] flex flex-col justify-center items-center order-2 sm:order-1">
          <h2 className="text-4xl md:text-5xl xl:text-7xl">
            Track your{" "}
            <TypeAnimation
              sequence={["Finances", 1000, "Expenses", 1000, "Incomes", 1000]}
              wrapper="span"
              speed={20}
              className="text-primary inline-block"
              repeat={Infinity}
            />{" "}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg my-8 text-balance text-center w-[90%] xl:w-[60%]">
          Bienvenue chez{" "}
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
            DAVINCIITSOLUTIONS
            </span>, votre solution ultime pour gérer efficacement vos finances personnelles. Avec cette solutions , 
            vous pouvez facilement suivre vos dépenses, surveiller vos revenus et rester au fait de vos objectifs financiers. 
          </p>
          <Button
            color="primary"
            className="text-sm sm:text-base lg:text-lg lg:w-[14rem] px-6 py-6"
            radius="sm"
            startContent={<StartNow />}
            onPress={() => navigate("/register")}
          >
          Démarrez maintenant! 
          </Button>
          <ThreeDots
            className="text-primary size-[2.5rem] mt-4 cursor-pointer"
            onClick={() => navigate("/login")}
          />
        </div>
        <img
          src={dashboard}
          alt="home image"
          className="w-[90%] xl:w-[80%] mx-auto rounded-xl border-3 border-gray-300 order-1 sm:order-2"
        />
        <div className="hidden sm:flex justify-center items-center mt-4">
          <Link
            to="https://github.com/SaxenaShourya/spend-smart"
            target="_blank"
          >
            <Button color="primary" radius="sm">
    
              En savoir plus sur le projet


            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
