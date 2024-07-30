import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import OfficerDashboard from "./pages/Officer/Dashboard";
import OfficerGuidelines from "./pages/Officer/Guidelines";
import OfficerHelp from "./pages/Officer/Help";
import EmployeeDashboard from "./pages/Employee/Dashboard";
import EmployeeGuidelines from "./pages/Employee/Guidelines";
import EmployeeHelp from "./pages/Employee/Help";
import Report from "./pages/Officer/Report";
import PrevReport from "./pages/Officer/PrevReport";
import FloatingChatbot from "./components/chatbot";
import { useAuth0 } from "@auth0/auth0-react";



function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <div>
      <FloatingChatbot />
      <Router>
      {isAuthenticated && <Navigation />}
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/officer">
            <Route path="dashboard" element={<OfficerDashboard />} />
            <Route path="guidelines" element={<OfficerGuidelines />} />
            <Route path="help" element={<OfficerHelp />} />
            <Route path="report" element={<Report />} />
            <Route path="prevreport" element={<PrevReport />} />
          </Route>

          <Route path="/employee">
            <Route path="dashboard" element={<EmployeeDashboard />} />
            <Route path="guidelines" element={<EmployeeGuidelines />} />
            <Route path="help" element={<EmployeeHelp />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
