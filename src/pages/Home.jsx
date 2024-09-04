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
      <div className="bg-primary-50 pb-8 pt-12 sm:pt-0 flex flex-col sm:block h-[90vh] sm:h-full gap-y-12 transition-all duration-500 ease-in-out">
        <div className="w-full sm:h-[65vh] flex flex-col justify-center items-center order-2 sm:order-1 space-y-8 sm:space-y-12 animate-fadeIn">
          <h2 className="text-4xl md:text-5xl xl:text-7xl font-bold my-8 text-center">
            Suivez vos{" "}
            <TypeAnimation
              sequence={["Finances", 1000, "Dépenses", 1000, "Revenus", 1000]}
              wrapper="span"
              speed={20}
              className="text-primary inline-block transition-transform duration-300 ease-in-out transform hover:scale-110"
              repeat={Infinity}
            />
          </h2>
          <p className="text-sm sm:text-base lg:text-lg my-8 text-balance text-center w-[90%] xl:w-[60%] mx-auto">
            Bienvenue chez{" "}
            <span className="font-bold">DAVINCIITSOLUTIONS</span>, votre
            solution ultime pour gérer efficacement vos finances personnelles.
            Avec cette solution, vous pouvez facilement suivre vos dépenses,
            surveiller vos revenus et rester au fait de vos objectifs
            financiers.
          </p>
          <Button
            color="primary"
            className="text-sm sm:text-base lg:text-lg lg:w-[14rem] px-6 py-4 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg transition-transform transform hover:scale-105"
            radius="sm"
            startContent={<StartNow />}
            onPress={() => navigate("/register")}
          >
            Démarrez maintenant!
          </Button>
          <ThreeDots
            className="text-primary text-[2.5rem] mt-4 cursor-pointer hover:text-green-600 transition-colors duration-300"
            onClick={() => navigate("/login")}
            style={{ color: "#38a169" }}
          />
        </div>
        <img
          src={dashboard}
          alt="home image"
          className="w-[90%] xl:w-[80%] mx-auto rounded-xl border-3 border-gray-300 order-1 sm:order-2 shadow-lg transition-transform transform hover:scale-105 duration-300"
        />
        <div className="hidden sm:flex justify-center items-center mt-8">
          <Link to="https://github.com/yohivana-KYIM" target="_blank">
            <Button
              color="primary"
              radius="sm"
              className="hover:bg-blue-600 transition-colors duration-300"
            >
              En savoir plus sur le projet
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
