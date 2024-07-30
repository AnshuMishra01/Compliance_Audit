import React from 'react';
import { Link } from 'react-router-dom';
import reportIcon from '../assets/report-icon.png'; // Ensure the path is correct
import '../index.css'; // Assuming you've defined a CSS file for custom fonts

function WeeklyReport() {
  return (
    <div className="bg-white h-full">
      <Link to="/officer/report" className="block">
        <div className="bg-blue-400 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
          <div className="bg-white h-full flex justify-center items-center">
            <img 
              className="w-full h-full object-cover" 
              src={reportIcon} 
              alt="Weekly Report Icon"
            />
          </div>
         
        </div>
      </Link>
    </div>
  );
}

export default WeeklyReport;
