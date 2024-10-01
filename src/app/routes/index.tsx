import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "../components/navbar/navbar";
import { Login, Setores, Perfil, Dashboard, Relatorio } from "../pages";

const Layout = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/setores", "/perfil", "/relatorio"]; 

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/setores" element={<Setores />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/relatorio" element={<Relatorio />} />
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
