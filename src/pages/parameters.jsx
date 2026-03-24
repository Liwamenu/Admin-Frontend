import { Route, Routes } from "react-router-dom";
import ParametersPage from "../components/parameters/parametersPage";
import NotFound from "./404";

const Parameters = () => {
  return (
    <Routes>
      <Route path="/" element={<ParametersPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Parameters;
