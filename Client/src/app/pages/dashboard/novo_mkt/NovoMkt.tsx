import React, { useState } from "react";
import "../styles.css";
import { HeaderDash } from "./components/header-dash";
import { ListDashboard } from "./components/list-dashboard";

export const NovoMkt = () => {
  const [totalMarketings, setTotalMarketings] = useState(0);
  const [totalRealizados, setTotalRealizados] = useState(0); 

  return (
    <div className="bg-dash">
      <div className="itens-dash">
        <HeaderDash totalMarketings={totalMarketings} totalRealizados={totalRealizados} />
        <ListDashboard setTotalMarketings={setTotalMarketings} setTotalRealizados={setTotalRealizados} /> 
      </div>
    </div>
  );
};
