import React from "react";
import { Spinner } from "@nextui-org/react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary-50">
      <div className="relative">
        <Spinner size="lg" color="success" className="w-16 h-16" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
      <p className="text-green-600 font-semibold mt-4 text-lg">Chargement de vos finances...</p>
      <p className="text-white-600 mt-2">Suivi des dépenses en FCFA</p>
    </div>
  );
};

export default Loading;
