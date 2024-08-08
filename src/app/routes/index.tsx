import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "../pages";

export const LocalRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="login"/>} />
      </Routes>
    </BrowserRouter>
  );
};