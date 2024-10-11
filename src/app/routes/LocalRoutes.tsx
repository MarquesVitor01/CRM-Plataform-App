import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "../components/navbar/navbar";
import { AuthProvider } from "../context/AuthContext";
import PrivateRoute from "./PrivatesRoute";
import {
  Login,
  Setores,
  Perfil,
  Dashboard,
  Relatorio,
  Add,
  EditContrato,
  FichaMonitoria,
  FichaMarketing,
  FichaFinanceiro,
  FichaCobranca,
} from "../pages";
import Contrato from "../pages/Contrato/Contrato";

export const LocalRoutes: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavbarWrapper /> 
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/setores" element={<PrivateRoute element={<Setores />} />} />
          <Route path="/perfil" element={<PrivateRoute element={<Perfil />} />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/relatorio" element={<PrivateRoute element={<Relatorio />} />} />
          <Route path="/add" element={<PrivateRoute element={<Add />} />} />
          <Route path="/contrato/:id" element={<PrivateRoute element={<Contrato />} />} />
          <Route path="/editcontrato/:id" element={<PrivateRoute element={<EditContrato />} />} />
          <Route path="/fichamonitoria" element={<PrivateRoute element={<FichaMonitoria />} />} />
          <Route path="/fichamarketing" element={<PrivateRoute element={<FichaMarketing />} />} />
          <Route path="/fichafinanceiro" element={<PrivateRoute element={<FichaFinanceiro />} />} />
          <Route path="/fichacobranca" element={<PrivateRoute element={<FichaCobranca />} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

const NavbarWrapper: React.FC = () => {
  const location = useLocation();
  const showNavbarRoutes = ["/dashboard"];

  return showNavbarRoutes.includes(location.pathname) ? <Navbar /> : null;
};
