import { Route, Routes } from "react-router-dom";
import NotFound from "./404";
import DashboardPage from "../components/dashboard/pages/dashboardPage";

const Dashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Dashboard;
