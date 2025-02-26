import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import Navbar from "./components/Layout/Navbar"; // Import Navbar
import Footer from "./components/Layout/Footer"; // Import Footer
import Home from "./pages/Home"; // Import Home page
import Login from "./pages/Login"; // Import Login page
import Dashboard from "./pages/Dashboard"; // Import Dashboard page
import HRDashboard from "./pages/HRDashboard"; // Import HRDashboard page
import NotFound from "./pages/NotFound"; // Import 404 page

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/hr-dashboard" element={<HRDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;