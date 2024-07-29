import React from 'react';
import { Link } from 'react-router-dom';

function Guidelines() {
  return (
    <Link to="/officer/Guidelines" className="block transform transition-transform duration-300 hover:scale-105">
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-white h-full flex justify-center items-center">
          <img 
            className="w-full h-full object-cover" 
            src='../src/lotties/5098274.jpg' 
            alt="RBI Icon"
          />
        </div>
      </div>
    </Link>
  );
}

export default Guidelines;
