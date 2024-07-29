import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../../assets/Bank-of-Baroda-Logo.png'; // Ensure the path is correct
import '../../index.css'; // Assuming custom styles are defined here

const OfficerHelp = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    isOfficer: 'Yes',
    topic: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const complain = { ...formData };
    fetch('http://localhost:2300/problem', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(complain)
    });
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen flex mt-10 items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-2xl shadow-2xl">
        <motion.h1 
          className="text-3xl font-bold text-center text-white mb-6"
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          Contact Form
        </motion.h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-lg bg-gray-900">
              <img src={logo} alt="Bank of Baroda" className="mx-auto h-24" />
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="employeeId">
              Employee ID
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform focus:scale-105"
              id="employeeId"
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="Enter your Employee ID"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Officer
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 text-gray-300">
                <input
                  type="radio"
                  name="isOfficer"
                  value="Yes"
                  checked={formData.isOfficer === 'Yes'}
                  onChange={handleChange}
                  className="form-radio text-blue-500"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-300">
                <input
                  type="radio"
                  name="isOfficer"
                  value="No"
                  checked={formData.isOfficer === 'No'}
                  onChange={handleChange}
                  className="form-radio text-blue-500"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="topic">
              Topics
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform focus:scale-105"
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
            >
              <option value="">Select a topic</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Technical Support">Technical Support</option>
              <option value="Feedback">Feedback</option>
            </select>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="description">
              Description (Problem)
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform focus:scale-105"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe your problem here"
            ></textarea>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
              type="submit"
            >
              Submit
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default OfficerHelp;
