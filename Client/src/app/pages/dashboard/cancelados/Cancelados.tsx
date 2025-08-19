import React, { useState } from "react";
import { HeaderDash } from "./components/header-dash";
import "../styles.css";
import { ListDashboard } from "./components/list-dashboard";

export const Cancelados = () => {
  const [totalCancelados, setTotalCancelados] = useState(0);

  return (
    <div className="bg-dash">
      <div className="itens-dash">
        <HeaderDash totalCancelados={totalCancelados} />
        <ListDashboard setTotalCancelados={setTotalCancelados} /> 
      </div>
    </div>
  );
};
