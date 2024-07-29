import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import cosmosData from '../../../backend/cosmosData.json';  // Adjust the path as needed

function BankKpi() {
  const [kpis, setKpis] = useState([]);
  const [score, setScore] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    // Process the cosmosData and set the state
    const processedKpis = cosmosData.map(item => ({
      name: item.$kpi,
      value: parseFloat(item.$calculated_val),
      benchmark: parseFloat(item.$benchmark),
      comparison: item.$comparison
    }));

    setKpis(processedKpis);

    // Calculate the score (you may want to adjust this calculation)
    const totalScore = processedKpis.reduce((acc, kpi) => {
      return acc + (kpi.comparison === 'Good' ? 1 : 0);
    }, 0);
    setScore((totalScore / processedKpis.length) * 100);
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  function getKpiDescription(kpiName) {
    const descriptions = {
      "NIM": "Net Interest Margin measures the difference between interest income and interest paid out, relative to interest-earning assets.",
      "CAR": "Capital Adequacy Ratio measures a bank's available capital expressed as a percentage of its risk-weighted credit exposures.",
      "NPA Ratio": "Non-Performing Assets Ratio indicates the proportion of loans in or near default.",
      "Cost to Income Ratio": "Reflects operational efficiency by comparing expenses to income.",
      "RoA": "Return on Assets indicates how efficiently assets are used to generate profit."
    };
    return descriptions[kpiName] || "Description not available.";
  }

  return (
    <div className="bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 p-8 rounded-xl shadow-2xl">
      <h2 className="text-4xl font-extrabold text-white mb-6 border-b-2 border-indigo-400 pb-2">Bank KPI Dashboard (Real Time)</h2>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-1/3 px-4 mb-6">
          <div className="bg-gradient-to-br from-gray-100 to-gray-300 rounded-lg shadow-lg p-4">
            <Plot
              data={[{
                type: "indicator",
                mode: "gauge+number",
                value: score,
                title: { text: "Performance Score", font: { size: 24, color: "indigo" } },
                gauge: {
                  axis: { range: [null, 100], tickwidth: 1, tickcolor: "darkblue" },
                  bar: { color: "lightgreen" },
                  bgcolor: "white",
                  borderwidth: 2,
                  bordercolor: "gray",
                  steps: [
                    { range: [0, 50], color: "lightyellow" },
                    { range: [50, 80], color: "lightgreen" },
                    { range: [80, 100], color: "cyan" }
                  ],
                }
              }]}
              layout={{ width: 300, height: 200, margin: { t: 0, b: 0 } }}
            />
          </div>
        </div>
        <div className="w-full lg:w-2/3 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {kpis.map((kpi, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-100 to-gray-300 rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
                <div className="flex items-center mb-2">
                  <div className={`w-2 h-8 ${kpi.comparison === 'Good' ? 'bg-green-500' : 'bg-red-500'} mr-3 rounded`}></div>
                  <p className="text-sm font-medium text-gray-700">{kpi.name}</p>
                </div>
                <p className="text-2xl font-bold text-indigo-800">{kpi.value.toFixed(2)}%</p>
                <p className="text-sm text-gray-600">Benchmark: {kpi.benchmark}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 bg-gradient-to-br from-gray-100 to-gray-300 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-indigo-800 mb-4">KPI Explanations</h3>
        <ul className="space-y-3">
          {kpis.map((kpi, index) => (
            <li key={index} className="bg-white p-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
              <button
                onClick={() => toggleAccordion(index)}
                className="flex justify-between items-center w-full text-left focus:outline-none"
              >
                <span className="text-lg font-semibold text-indigo-600">What is {kpi.name}?</span>
                <span className={`text-indigo-600 transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {activeIndex === index && (
                <div className="mt-3 text-gray-700">
                  <p>{getKpiDescription(kpi.name)}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BankKpi;