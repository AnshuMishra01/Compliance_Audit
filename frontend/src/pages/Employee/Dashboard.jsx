import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Hardcoded employee details as fallback
const fallbackEmployeeDetails = {
  name: "Pawan Kumar Mishra",
  age: 55,
  department: "Azure",
  jobPost: "Cashier"
};

function EmployeeDashboard() {
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        // Replace this with your actual API call
        const response = await fetch('/api/employee/details');
        
        // Check if the response is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Oops, we haven't received JSON!");
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setEmployeeDetails(data);
      } catch (err) {
        console.error('Error fetching employee details:', err);
        setError(err.message);
        setEmployeeDetails(fallbackEmployeeDetails);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen p-8 mt-10">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          className="text-3xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          DASHBOARD
        </motion.h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left column */}
          <motion.div 
            className="flex-1 bg-gray-800 rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">Cashier (Employee)</h2>
            
            <h3 className="text-lg font-medium text-gray-300 mb-3">Employee Details</h3>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <table className="w-full text-gray-300">
              <tbody>
                <tr>
                  <td className="font-medium pr-4 py-2">Name</td>
                  <td>{employeeDetails?.name}</td>
                </tr>
                <tr>
                  <td className="font-medium pr-4 py-2">Age</td>
                  <td>{employeeDetails?.age}</td>
                </tr>
                <tr>
                  <td className="font-medium pr-4 py-2">Department</td>
                  <td>{employeeDetails?.department}</td>
                </tr>
                <tr>
                  <td className="font-medium pr-4 py-2">Job Post</td>
                  <td>{employeeDetails?.jobPost}</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
          
          {/* Right column */}
          <motion.div 
            className="flex-1 flex flex-col gap-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/employee/guidelines" className="block">
              <motion.div 
                className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform"
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src='../src/assets/rbi.png' 
                  alt="RBI Logo" 
                  className="w-24 h-24 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-white">Guidelines</h3>
              </motion.div>
            </Link>
          </motion.div>
        </div>
        
        {/* Help section */}
        <motion.div 
          className="mt-8 bg-gray-800 rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-white mb-2">
            Ask for Help - <Link to="/employee/help" className="text-blue-400 hover:underline">Click Here</Link>
          </h3>
          <h4 className="font-medium text-gray-300 mb-2">Guidelines</h4>
          <p className="text-gray-300 mb-4">
            This section displays the guidelines you must follow. It updates in real-time if any new guidelines are issued, so make sure to check it at least twice a day.
          </p>
          <p className="font-bold text-gray-200">NOTE: Ensure to follow all the RBI guidelines properly.</p>
        </motion.div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
