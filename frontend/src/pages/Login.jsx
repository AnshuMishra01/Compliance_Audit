import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/auth';
import { Eye, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [isOfficer, setIsOfficer] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(employeeId, password, isOfficer ? 'officer' : 'employee');
    navigate(isOfficer ? '/officer/dashboard' : '/employee/dashboard');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="flex flex-col md:flex-row w-full">
        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 p-8 flex items-center justify-center"
        >
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
              >
                Login.
              </motion.div>
              <button className="text-gray-500 text-2xl">&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-6"
              >
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="employeeId">
                  Email
                </label>
                <div className="relative">
                  <input
                    className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
                    id="employeeId"
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    required
                  />
                  <Mail className="absolute right-3 top-2.5 text-gray-400" size={20} />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6"
              >
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Eye className="absolute right-3 top-2.5 text-gray-400" size={20} />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-6"
              >
                <a href="#" className="text-sm text-orange-500 hover:underline">Forgot Password?</a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center mb-6"
              >
                <input
                  type="checkbox"
                  id="isOfficer"
                  checked={isOfficer}
                  onChange={() => setIsOfficer(!isOfficer)}
                  className="mr-2"
                />
                <label htmlFor="isOfficer" className="text-sm text-gray-700">Login as Officer</label>
              </motion.div>
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="w-full bg-blue-600 transition-colors duration-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Log In
              </motion.button>
            </form>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-gray-600">
                Don't have an account? <a href="#" className="text-orange-500 hover:underline">Sign Up here</a>
              </p>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:block md:w-1/2 bg-gradient-to-br from-gray-700 to-gray-800 p-8"
        >
          <div className="w-full h-full rounded-md bg-gradient-to-br from-gray-800 to-gray-700 shadow-2xl flex items-center justify-center">
            <img className='w-3/4' src='../src/assets/tablet-login-concept-illustration.png' alt='Login Illustration'/>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
