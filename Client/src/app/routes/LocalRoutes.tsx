import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "../components/navbar/navbar";
import { AuthProvider } from "../context/AuthContext";
import PrivateRoute from "./PrivatesRoute";
import {
  Login,
  Setores,
  Perfil,
  Vendas,
  Monitoria,
  Marketing,
  Relatorio,
  Add,
  EditContrato,
  FichaMonitoria,
  FichaMarketing,
  FichaFinanceiro,
  FichaCobranca,
  FichaBoleto,
} from "../pages";
import { Contrato } from "../pages";
import { Financeiro } from "../pages/dashboard/financeiro/Financeiro";
import { Cobranca } from "../pages/dashboard/cobranca/Cobranca";
import { Comprovantes } from "../pages/Comprovantes/Comprovantes";
import { Cancelados } from "../pages/dashboard/cancelados/Cancelados";
import { FichaCancelamento } from "../pages/Fichas/FichaCancelamento/FichaCancelamento";
import { PosVenda } from "../pages/dashboard/pos_venda/PosVenda";
import { FichaPosVenda } from "../pages/Fichas/FichaPosVenda/FichaPosVenda";
import { Assinatura } from "../pages/Assinatura/Assinatura";


export const LocalRoutes: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavbarWrapper />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/setores" element={<PrivateRoute element={<Setores />} />} />
          <Route path="/perfil" element={<PrivateRoute element={<Perfil />} />} />
          <Route path="/vendas" element={<PrivateRoute element={<Vendas />} requiredCargo="vendas" />} />
          <Route path="/cancelados" element={<PrivateRoute element={<Cancelados />} requiredCargo="vendas" />} />
          <Route path="/monitoria" element={<PrivateRoute element={<Monitoria />} requiredCargo="monitoria" />} />
          <Route path="/marketing" element={<PrivateRoute element={<Marketing />} requiredCargo="marketing" />} />
          <Route path="/pos-venda" element={<PrivateRoute element={<PosVenda />} requiredCargo="posVenda" />} />
          <Route path="/financeiro" element={<PrivateRoute element={<Financeiro />} requiredCargo="financeiro" />} />
          <Route path="/cobranca" element={<PrivateRoute element={<Cobranca />} requiredCargo="cobranca" />} />
          <Route path="/relatorio" element={<PrivateRoute element={<Relatorio />} />} />
          <Route path="/add" element={<PrivateRoute element={<Add />} />} />
          <Route path="/contrato/:id" element={<PrivateRoute element={<Contrato />} />} />
          <Route path="/assinatura/:id" element={<PrivateRoute element={<Assinatura />} />} />
          <Route path="/editcontrato/:id" element={<PrivateRoute element={<EditContrato />} />} />
          <Route path="/comprovantes/:id" element={<PrivateRoute element={<Comprovantes />} />} />
          <Route path="/fichamonitoria/:id" element={<PrivateRoute element={<FichaMonitoria />} requiredCargo="monitoria" />} />
          <Route path="/fichamarketing/:id" element={<PrivateRoute element={<FichaMarketing />} requiredCargo="marketing" />} />
          <Route path="/fichaposvenda/:id" element={<PrivateRoute element={<FichaPosVenda />} requiredCargo="posVenda" />} />
          <Route path="/fichafinanceiro/:id" element={<PrivateRoute element={<FichaFinanceiro />} requiredCargo="financeiro" />} />
          <Route path="/fichacobranca/:id" element={<PrivateRoute element={<FichaCobranca />} requiredCargo="cobranca" />} />
          <Route path="/fichaboleto/:id" element={<PrivateRoute element={<FichaBoleto />} />} />
          <Route path="/fichacancelamento/:id" element={<PrivateRoute element={<FichaCancelamento />} requiredCargo="vendas" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

const NavbarWrapper: React.FC = () => {
  const location = useLocation();
  const showNavbarRoutes = ["/vendas", "/monitoria", "/marketing", "/financeiro", "/cobranca", "/cancelados", "/pos-venda"];

  return showNavbarRoutes.includes(location.pathname) ? <Navbar /> : null;
};