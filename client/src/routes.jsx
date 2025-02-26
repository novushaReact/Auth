import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import HRDashboard from "./pages/HRDashboard";
import NotFound from "./pages/NotFound";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hr-dashboard" element={<HRDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}