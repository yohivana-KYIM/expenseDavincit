import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { Button } from "../components/ui/button";
import NavBar from "../components/NavBar";
import { StartNow, ThreeDots } from "../utils/Icons";

const Home = () => {
  const navigate = useNavigate();
  const userIsVerified = useSelector((state) => state.auth?.user?.verified);

  useEffect(() => {
    if (userIsVerified) {
      navigate("/dashboard");
    }
  }, [userIsVerified, navigate]);

  return (
    <main className={`${userIsVerified ? "hidden" : ""} w-full min-h-screen`}>
      <NavBar />
      <div className="bg-primary-50 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold">
                Suivez vos{" "}
                <TypeAnimation
                  sequence={["Finances", 1000, "Dépenses", 1000, "Revenus", 1000]}
                  wrapper="span"
                  speed={20}
                  className="text-primary inline-block transition-transform duration-300 ease-in-out hover:scale-105"
                  repeat={Infinity}
                />
              </h2>
              <p className="text-base lg:text-lg text-gray-700">
                Bienvenue chez <span className="font-bold">DAVINCIITSOLUTIONS</span>,
                votre solution ultime pour gérer efficacement vos finances personnelles.
                Avec cette solution, vous pouvez facilement suivre vos dépenses,
                surveiller vos revenus et rester au fait de vos objectifs financiers.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  className="w-full sm:w-auto px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-transform hover:scale-105"
                  onClick={() => navigate("/register")}
                >
                  <StartNow className="mr-2" />
                  Démarrez maintenant!
                </Button>
                <ThreeDots
                  className="text-4xl text-green-500 hover:text-green-600 cursor-pointer transition-colors duration-300"
                  onClick={() => navigate("/login")}
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <img
                src="/assets/dashboard.webp"
                alt="Dashboard preview"
                className="w-full rounded-xl border-3 border-gray-300 shadow-lg transition-transform hover:scale-105 duration-300"
              />
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link to="https://github.com/yohivana-KYIM" target="_blank" rel="noopener noreferrer">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300">
                En savoir plus sur le projet
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;