import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages";

export const LocalRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="login"/>} />
      </Routes>
    </BrowserRouter>
  );
};