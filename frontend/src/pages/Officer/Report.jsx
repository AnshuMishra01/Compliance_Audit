import { useState, useEffect, useRef } from "react";
import Modal from "./reportModel";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import cosmosData from "../../../../backend/cosmosData.json";
import guidelineData from "../../../../backend/guideline_categorize.json";

function Report() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    description: "",
    pdfLink: "",
  });
  const [badKpis, setBadKpis] = useState([]);
  const [goodKpis, setGoodKpis] = useState([]);
  const [guidelines, setGuidelines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const guidelinesPerPage = 5;

  const reportRef = useRef(null);
  const hiddenRef = useRef(null);

  useEffect(() => {
    // Filter KPIs with 'Bad' comparison
    const badKpisList = cosmosData.filter((item) => item.$comparison === "Bad");
    setBadKpis(badKpisList);

    // Filter KPIs with 'Good' comparison
    const goodKpisList = cosmosData.filter(
      (item) => item.$comparison === "Good"
    );
    setGoodKpis(goodKpisList);

    // Filter guidelines based on bad KPIs
    const relevantGuidelines = guidelineData.filter((guideline) =>
      badKpisList.some((kpi) => guideline.$major === kpi.$kpi)
    );
    setGuidelines(relevantGuidelines);
  }, []);

  const openModal = (guideline) => {
    setModalContent({
      title: guideline.$guideline_name,
      description: `This guideline is related to ${guideline.$major} KPI.`,
      pdfLink: guideline.$pdf,
    });
    setIsModalOpen(true);
  };

  const weeklyReport =
    "The compliance monitoring system has flagged the above issues for immediate attention. While the overall compliance posture remains strong, addressing these areas will help maintain and improve our adherence to regulatory standards. Please review the recommendations and take necessary actions to rectify these issues. The compliance team should also be reminded of the importance of following established guidelines diligently.";

  // Get current guidelines
  const indexOfLastGuideline = currentPage * guidelinesPerPage;
  const indexOfFirstGuideline = indexOfLastGuideline - guidelinesPerPage;
  const currentGuidelines = guidelines.slice(
    indexOfFirstGuideline,
    indexOfLastGuideline
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const downloadReport = async () => {
    const pdf = new jsPDF();

    const renderPage = async (page) => {
      setCurrentPage(page);
      await new Promise((resolve) => setTimeout(resolve, 500)); // wait for the content to re-render
      const canvas = await html2canvas(reportRef.current);
      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      if (page > 1) pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    };

    for (
      let page = 1;
      page <= Math.ceil(guidelines.length / guidelinesPerPage);
      page++
    ) {
      await renderPage(page);
    }

    pdf.save("report.pdf");
  };

  return (
    <div className="bg-gradient-to-br mt-10 from-gray-900 via-gray-800 to-black min-h-screen p-8">
      <div
        className="max-w-5xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        id="report-content"
        ref={reportRef}
      >
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center mb-6"
          >
            <h1 className="text-3xl font-bold text-white">Weekly Report</h1>
            <div className="text-sm text-gray-400">
              Date: {new Date().toLocaleDateString()}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <p className="text-gray-300 text-sm">{weeklyReport}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <h2 className="text-lg font-semibold mb-2 text-white">
              KPIs with Poor Performance
            </h2>
            <div className="flex space-x-4 text-gray-50">
              {badKpis.map((kpi, index) => (
                <div
                  key={index}
                  className="bg-gray-700 px-3 py-1 rounded-lg shadow-md"
                >
                  <span className="font-medium">{kpi.$kpi}</span>
                  <span className="ml-2 text-red-400">
                    {parseFloat(kpi.$calculated_val).toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <h2 className="text-lg font-semibold mb-2 text-white">
              KPIs with Good Performance
            </h2>
            <div className="flex space-x-4 text-gray-50">
              {goodKpis.map((kpi, index) => (
                <div
                  key={index}
                  className="bg-gray-700 px-3 py-1 rounded-lg shadow-md"
                >
                  <span className="font-medium">{kpi.$kpi}</span>
                  <span className="ml-2 text-green-400">
                    {parseFloat(kpi.$calculated_val).toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-lg font-semibold mb-2 text-white">
              Guidelines Related to Underperforming KPIs
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="bg-gray-700 text-gray-200">
                  <tr>
                    <th className="px-4 py-2">Guideline Name</th>
                    <th className="px-4 py-2">Related KPI</th>
                    <th className="px-4 py-2">View</th>
                  </tr>
                </thead>
                <tbody>
                  {currentGuidelines.map((guideline, index) => (
                    <motion.tr
                      key={index}
                      className="bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="px-4 py-2">{guideline.$guideline_name}</td>
                      <td className="px-4 py-2">{guideline.$major}</td>
                      <td className="px-4 py-2">
                        <button
                          className="text-blue-400 hover:underline"
                          onClick={() => openModal(guideline)}
                        >
                          Click/Open
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-center">
              {Array.from(
                { length: Math.ceil(guidelines.length / guidelinesPerPage) },
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`mx-1 px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              )}
            </div>
          </motion.div>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={downloadReport}
            >
              Download Report
            </button>
          </div>
        </div>
      </div>
      <div ref={hiddenRef} style={{ display: "none" }}>
        {Array.from(
          { length: Math.ceil(guidelines.length / guidelinesPerPage) },
          (_, i) => (
            <div key={i} className="p-6">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-between items-center mb-6"
              >
                <h1 className="text-3xl font-bold text-white">Weekly Report</h1>
                <div className="text-sm text-gray-400">
                  Date: {new Date().toLocaleDateString()}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-6"
              >
                <p className="text-gray-300 text-sm">{weeklyReport}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6"
              >
                <h2 className="text-lg font-semibold mb-2 text-white">
                  KPIs with Poor Performance
                </h2>
                <div className="flex space-x-4">
                  {badKpis.map((kpi, index) => (
                    <div
                      key={index}
                      className="bg-gray-700 px-3 py-1 rounded-lg shadow-md"
                    >
                      <span className="font-medium">{kpi.$kpi}</span>
                      <span className="ml-2 text-red-400">
                        {parseFloat(kpi.$calculated_val).toFixed(2)}%
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6"
              >
                <h2 className="text-lg font-semibold mb-2 text-white">
                  KPIs with Good Performance
                </h2>
                <div className="flex space-x-4">
                  {goodKpis.map((kpi, index) => (
                    <div
                      key={index}
                      className="bg-gray-700 px-3 py-1 rounded-lg shadow-md"
                    >
                      <span className="font-medium">{kpi.$kpi}</span>
                      <span className="ml-2 text-green-400">
                        {parseFloat(kpi.$calculated_val).toFixed(2)}%
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-lg font-semibold mb-2 text-white">
                  Guidelines Related to Underperforming KPIs
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-300">
                    <thead className="bg-gray-700 text-gray-200">
                      <tr>
                        <th className="px-4 py-2">Guideline Name</th>
                        <th className="px-4 py-2">Related KPI</th>
                        <th className="px-4 py-2">View</th>
                      </tr>
                    </thead>
                    <tbody>
                      {guidelines
                        .slice(
                          i * guidelinesPerPage,
                          (i + 1) * guidelinesPerPage
                        )
                        .map((guideline, index) => (
                          <motion.tr
                            key={index}
                            className="bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <td className="px-4 py-2">
                              {guideline.$guideline_name}
                            </td>
                            <td className="px-4 py-2">{guideline.$major}</td>
                            <td className="px-4 py-2">
                              <span className="text-blue-400">
                                <a
                                  href={guideline.$pdf}
                                  download
                                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                                >
                                  Download Pdf
                                </a>
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          )
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={modalContent}
      />
    </div>
  );
}

export default Report;
