import React from 'react';
import { Link } from 'react-router-dom';

function PreviousReport() {
  return (
    <div className="bg-white h-full">
      <Link to="/officer/PrevReport" className="block">
        <div className="bg-blue-400 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
          <div className="bg-white h-full p-6 flex justify-center items-center">
            <img 
              className="w-full h-full object-cover" 
              src='../src/lotties/Documents-(1).jpg' 
              alt="Previous Report Icon"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PreviousReport;
