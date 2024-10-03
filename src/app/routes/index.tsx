import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "../components/navbar/navbar";
import { Login, Setores, Perfil, Dashboard, Relatorio, Contrato, EditContrato, FichaMonitoria, FichaMarketing, FichaFinanceiro } from "../pages";

const Layout = () => {
  const location = useLocation();
  
  const showNavbarRoutes = [ "/dashboard"];

  return (
    <>
      {showNavbarRoutes.includes(location.pathname) && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/setores" element={<Setores />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/relatorio" element={<Relatorio />} />
        <Route path="/contrato" element={<Contrato />} />
        <Route path="/editcontrato" element={<EditContrato />} />
        <Route path="/fichamonitoria" element={<FichaMonitoria />} />
        <Route path="/fichamarketing" element={<FichaMarketing />} />
        <Route path="/fichafinanceiro" element={<FichaFinanceiro />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export const LocalRoutes = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};
