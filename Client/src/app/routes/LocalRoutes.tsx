import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "../global/Components/navbar/navbar";
import { AuthProvider } from "../global/Config/context/AuthContext";
import PrivateRoute from "./PrivatesRoute";
import {
  Vendas,
  Monitoria,
  FichaMonitoria,
  FichaMarketing,
  FichaFinanceiro,
  FichaCobranca,
  FichaBoleto,
} from "../pages";
import { Comprovantes } from "../pages/Comprovantes/Comprovantes";
import { FichaCancelamento } from "../pages/Fichas/FichaCancelamento/FichaCancelamento";
import { FichaPosVenda } from "../pages/Fichas/FichaPosVenda/FichaPosVenda";
import { Assinatura } from "../pages/Estatico/Assinatura/Assinatura";
import { MsgMonitoria } from "../pages/Estatico/MsgMonitoria/MsgMonitoria";
import { MsgMkt } from "../pages/Estatico/MsgMkt/MsgMkt";
import { VizuMonitoria } from "../pages/Estatico/VizuMonitoria/VizuMonitoria";
import { VizuFinanceiro } from "../pages/Estatico/VizuFinanceiro/VizuFinanceiro";
import { See } from "../pages/Contrato/See/See";
import { Add } from "../pages/Contrato/Add/Add";
import { Edit } from "../pages/Contrato/Edit/Edit";
import { Login } from "../pages/User/login/Login";
import { Setores } from "../pages/User/setores/setores";
import { Perfil } from "../pages/User/perfil_funcionario/perfil";
import { Relatorio } from "../pages/User/Relatório/Relatorio";
import { Cancelados } from "../pages/dashboard/cancelados/Cancelados";
import { NovoMkt } from "../pages/dashboard/novo_mkt/NovoMkt";
import { Analise } from "../pages/dashboard/analise/Analise";
import { Financeiro } from "../pages/dashboard/financeiro/Financeiro";
import { Cobranca } from "../pages/dashboard/cobranca/Cobranca";


export const LocalRoutes: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavbarWrapper />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/setores" element={<PrivateRoute element={<Setores />} />} />
          <Route path="/perfil" element={<PrivateRoute element={<Perfil />} />} />
          <Route path="/vendas" element={<PrivateRoute element={<Vendas />}/>} />
          <Route path="/cancelados" element={<PrivateRoute element={<Cancelados />} />} />
          <Route path="/monitoria" element={<PrivateRoute element={<Monitoria />} />} />
          <Route path="/novomarketing" element={<PrivateRoute element={<NovoMkt />} />} />
          <Route path="/analises" element={<PrivateRoute element={<Analise />} />} />
          <Route path="/financeiro" element={<PrivateRoute element={<Financeiro />} />} />
          <Route path="/cobranca" element={<PrivateRoute element={<Cobranca />} requiredCargo="cobranca" />} />
          <Route path="/relatorio" element={<PrivateRoute element={<Relatorio />} />} />
          <Route path="/add" element={<PrivateRoute element={<Add />} />} />
          <Route path="/contrato/:id" element={<PrivateRoute element={<See />} />} />
          <Route path="/assinatura/:id" element={<PrivateRoute element={<Assinatura />} />} />
          <Route path="/editcontrato/:id" element={<PrivateRoute element={<Edit />} />} />
          <Route path="/comprovantes/:id" element={<PrivateRoute element={<Comprovantes />} />} />
          <Route path="/fichamonitoria/:id" element={<PrivateRoute element={<FichaMonitoria />} />} />
          <Route path="/vizumonitoria/:id" element={<PrivateRoute element={<VizuMonitoria />} />} />
          <Route path="/fichamsgmonitoria/:id" element={<PrivateRoute element={<MsgMonitoria />}  />} />
          <Route path="/fichamsgmarketing/:id" element={<PrivateRoute element={<MsgMkt />}  />} />
          <Route path="/fichamarketing/:id" element={<PrivateRoute element={<FichaMarketing />} />} />
          <Route path="/fichaposvenda/:id" element={<PrivateRoute element={<FichaPosVenda />} />} />
          <Route path="/fichafinanceiro/:id" element={<PrivateRoute element={<FichaFinanceiro />} requiredCargo="financeiro" />} />
          <Route path="/vizufinanceiro/:id" element={<PrivateRoute element={<VizuFinanceiro />} />} />
          <Route path="/fichacobranca/:id" element={<PrivateRoute element={<FichaCobranca />} requiredCargo="cobranca" />} />
          <Route path="/fichaboleto/:id" element={<PrivateRoute element={<FichaBoleto />} />} />
          <Route path="/fichacancelamento/:id" element={<PrivateRoute element={<FichaCancelamento />} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

const NavbarWrapper: React.FC = () => {
  const location = useLocation();
  const showNavbarRoutes = ["/vendas", "/monitoria", "/marketing", "/financeiro", "/cobranca", "/cancelados", "/pos-venda", "/analises", "/novomarketing"];

  return showNavbarRoutes.includes(location.pathname) ? <Navbar /> : null;
};