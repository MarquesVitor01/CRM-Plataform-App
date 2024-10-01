import { HeaderDash } from "./components/header-dash";
import "./components/dashboard.css";
import { ListDashboard } from "./components/list-dashboard";

export const Dashboard = () => {
  return (
    <div className="bg-dash">
      <div className="itens-dash">
        <HeaderDash />
        <ListDashboard />
      </div>
    </div>
  );
};
