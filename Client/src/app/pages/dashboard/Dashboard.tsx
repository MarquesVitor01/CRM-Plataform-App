import React, { useState } from "react";
import { HeaderDash } from "./components/header-dash";
import "./components/dashboard.css";
import { ListDashboard } from "./components/list-dashboard";

export const Dashboard = () => {
  const [totalClientes, setTotalClientes] = useState(0);

  return (
    <div className="bg-dash">
      <div className="itens-dash">
        <HeaderDash totalClientes={totalClientes} />
        <ListDashboard setTotalClientes={setTotalClientes} /> 
      </div>
    </div>
  );
};
