import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}
