import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import Modal from './Modal';
import guidelineSummaries from '../../../../backend/guideline_summ.json'; // Import the JSON file

function CashierGuidelines() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [guidelines, setGuidelines] = useState([]);

  useEffect(() => {
    setGuidelines(guidelineSummaries);
  }, []);

  const filteredGuidelines = useMemo(() => {
    return guidelines.filter(guideline =>
      guideline.$department.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [filterText, guidelines]);

  const openModal = (guideline) => {
    setModalContent(guideline);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen p-8 mt-10">
      <div className="max-w-6xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <motion.h1 
            className="text-3xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            All Guidelines
          </motion.h1>
          
          <div className="flex justify-between items-center mb-4">
            <motion.h2 
              className="text-lg font-semibold text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              Guidelines
            </motion.h2>
            <input 
              type="text" 
              placeholder="Filter by Deparment" 
              className="px-3 py-1 border rounded-md"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          
          <motion.div 
            className="overflow-x-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="bg-gray-700 text-gray-200">
                <tr>
                  <th className="px-4 py-2">Guideline Name</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Department</th>
                  <th className="px-4 py-2">View</th>
                  <th className="px-4 py-2">Implementation</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuidelines.map((guideline) => (
                  <motion.tr 
                    key={guideline.id} 
                    className="bg-gray-700 hover:bg-gray-600"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-4 py-2 text-gray-200">{guideline.$guideline_name}</td>
                    <td className="px-4 py-2 text-gray-400">{guideline.$passedon}</td>
                    <td className="px-4 py-2 text-gray-400">{guideline.$department}</td>
                    <td className="px-4 py-2">
                      <button 
                        className="text-blue-400 hover:underline"
                        onClick={() => openModal(guideline)}
                      >
                        Click/Open
                      </button>
                    </td>
                    <td className="px-4 py-2 text-gray-400">{guideline.$implementation}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        content={modalContent}
      />
    </div>
  );
}

export default CashierGuidelines;