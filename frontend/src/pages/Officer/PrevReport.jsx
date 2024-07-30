import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const ReportData = [
  {
    id: 1,
    name: "Jan 2024 week1 Report",
    date: "06/01/24",
    download: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: 2,
    name: "Jan 2024 week2 Report",
    date: "13/01/23",
    download: "https://www.rd.usda.gov/sites/default/files/pdf-sample_0.pdf",
  },
];

function CashierReport() {
  const [filterText, setFilterText] = useState('');

  const filteredReports = useMemo(() => {
    return ReportData.filter(report =>
      report.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [filterText]);

  const handleDownload = async (downloadLink, name) => {
    try {
      const response = await fetch(downloadLink);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const aTag = document.createElement('a');
      aTag.href = blobUrl;
      aTag.setAttribute('download', name);
      document.body.appendChild(aTag);
      aTag.click();
      document.body.removeChild(aTag);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="bg-gray-900 p-8 h-screen flex items-center justify-center">
      <div className="w-full max-w-6xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-white mb-6">Officer Previous Reports</h1>
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Reports</h2>
            <input 
              type="text" 
              placeholder="Filter by name" 
              className="px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform focus:scale-105"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          
          <div className="overflow-x-auto">
            <motion.table
              className="w-full text-sm text-left text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="px-4 py-2">Report Name</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Download</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <motion.tr
                    key={report.id}
                    className="bg-gray-800 hover:bg-gray-700 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-4 py-2">{report.name}</td>
                    <td className="px-4 py-2">{report.date}</td>
                    <td className="px-4 py-2">
                      <button 
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
                        onClick={() => handleDownload(report.download, report.name)}
                      >
                        PDF
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CashierReport;
