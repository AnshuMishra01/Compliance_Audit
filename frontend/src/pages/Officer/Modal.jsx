import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Modal({ isOpen, onClose, content }) {
  if (!content) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold text-white mb-4">{content.$guideline_name}</h2>
            <div className="text-gray-300 space-y-2">
              <p><strong>Date:</strong> {content.$passedon}</p>
              <p><strong>Department:</strong> {content.$department}</p>
              <p><strong>Implementation:</strong> {content.$implementation}</p>
              <p><strong>Passed By:</strong> {content.$passedby}</p>
              <div>
                <strong>Summary:</strong>
                <p className="mt-2 whitespace-pre-wrap">{content.$summary}</p>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={onClose}
              >
                Close
              </button>
              <a
                href={content.$pdf}
                download
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Download PDF
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
