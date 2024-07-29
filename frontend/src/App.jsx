import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import OfficerDashboard from './pages/Officer/Dashboard';
import OfficerGuidelines from './pages/Officer/Guidelines';
import OfficerHelp from './pages/Officer/Help';
import EmployeeDashboard from './pages/Employee/Dashboard';
import EmployeeGuidelines from './pages/Employee/Guidelines';
import EmployeeHelp from './pages/Employee/Help';
import { isAuthenticated } from './utils/auth';
import Report from './pages/Officer/Report';
import PrevReport from './pages/Officer/PrevReport';
import FloatingChatbot from './components/chatbot';

function App() {
  return (<div>
    <FloatingChatbot></FloatingChatbot>
    <Router>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route 
          path="/officer/*" 
          element={
            <ProtectedRoute userType="officer">
              {isAuthenticated() && <Navigation />}
              
              <Routes>
                <Route path="dashboard" element={<OfficerDashboard />} />
                <Route path="guidelines" element={<OfficerGuidelines />} />
                <Route path="help" element={<OfficerHelp />} />
                <Route path="Report" element={<Report />} />
                <Route path="Guideline" element={<OfficerGuidelines />} />
                <Route path="PrevReport" element={<PrevReport />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/employee/*" 
          element={
            
            <ProtectedRoute userType="employee">
              
               {isAuthenticated() && <Navigation />}
               
              <Routes>
                <Route path="dashboard" element={<EmployeeDashboard />} />
                <Route path="guidelines" element={<EmployeeGuidelines />} />
                <Route path="help" element={<EmployeeHelp />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router></div>
  );
}

export default App;