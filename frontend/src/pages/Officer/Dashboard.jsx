import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Guidelines from '../../components/Guidelines';
import WeeklyReport from '../../components/WeeklyReport';
import PreviousReport from '../../components/PreviousReport';
import BankKpi from '../../components/BankKpi';
import '../../index.css';

function EmployeeDashboard() {
  const [activeCard, setActiveCard] = useState(0);

  const cards = [
    {
      id: 0,
      title: "RBI Guidelines",
      content: "RBI guidelines are crucial for maintaining financial stability and ensuring regulatory compliance.",
      component: <Guidelines />,
    },
    {
      id: 1,
      title: "Weekly Report",
      content: "The weekly report provides a snapshot of the bank's performance and key metrics.",
      component: <WeeklyReport />,
    },
    {
      id: 2,
      title: "Previous Report",
      content: "The previous report gives insights into past performance and helps in trend analysis.",
      component: <PreviousReport />,
    },
  ];

  const handleCardClick = (index) => {
    setActiveCard(index);
  };

  const getCardStyle = (index) => {
    if (index === activeCard) {
      return {
        transform: 'translateX(0) scale(1)',
        zIndex: 2,
      };
    } else if (index === (activeCard + 1) % cards.length) {
      return {
        transform: 'translateX(250px) scale(0.5) translateY(200px)',
        zIndex: 1,
      };
    } else if (index === (activeCard - 1 + cards.length) % cards.length) {
      return {
        transform: 'translateX(250px) scale(0.5) translateY(-400px)',
        zIndex: 1,
      };
    } else {
      return {
        transform: 'translateX(0) scale(0)',
        zIndex: 0,
      };
    }
  };

  return (
    <div className="bg-gradient-to-br mt-10 from-gray-900 via-gray-800 to-black min-h-screen text-white">
      <main className="p-4 md:p-8">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center">
            <span className="bg-orange-500 text-white p-2 rounded-full mr-3 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            Compliance Officer Dashboard
          </h2>
        </div>

        <div className="flex justify-between items-center mt-20 mb-8">
          <div className="hero-container relative h-96 w-1/3 flex items-center justify-center" style={{ perspective: '1000px' }}>
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                className="absolute w-64 h-96 bg-gray-800 bg-opacity-30 backdrop-blur-md rounded-xl shadow-lg cursor-pointer transition-transform duration-500"
                style={getCardStyle(index)}
                transition={{ duration: 0.5 }}
                onClick={() => handleCardClick(index)}
              >
                <div className="p-4">
                  <h2 className="text-xl font-bold">{card.title}</h2>
                  {index === activeCard && <div className="mt-4">{card.component}</div>}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            key={activeCard}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-1/3 p-4 bg-blue-800 bg-opacity-30 backdrop-blur-md rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">{cards[activeCard].title}</h2>
            <p>{cards[activeCard].content}</p>
          </motion.div>
        </div>

        <BankKpi />
      </main>
    </div>
  );
}
export default EmployeeDashboard;
