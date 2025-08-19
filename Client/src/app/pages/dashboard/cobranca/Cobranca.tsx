import React, { useState } from "react";
import { HeaderDash } from "./components/header-dash";
import "../styles.css";
import { ListDashboard } from "./components/list-dashboard";

export const Cobranca = () => {
  const [totalFinanceiros, setTotalFinanceiros] = useState(0);

  return (
    <div className="bg-dash">
      <div className="itens-dash">
        <HeaderDash totalFinanceiros={totalFinanceiros} />
        <ListDashboard setTotalFinanceiros={setTotalFinanceiros} /> 
      </div>
    </div>
  );
};
