import { Route, Routes } from "react-router-dom";
import RolesPage from "../components/roles/pages/rolesPage";
import NotFound from "./404";

const Roles = () => {
  return (
    <Routes>
      <Route path="/" element={<RolesPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Roles;
