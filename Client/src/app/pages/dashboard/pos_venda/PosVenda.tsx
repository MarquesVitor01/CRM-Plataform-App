import React, { useState } from "react";
import "../styles.css";
import { HeaderDash } from "./components/header-dash";
import { ListDashboard } from "./components/list-dashboard";

export const PosVenda = () => {
  const [totalposvenda, setTotalPosVenda] = useState(0);
  const [totalRealizadosPosVenda, setTotalRealizadosPosVenda] = useState(0); 

  return (
    <div className="bg-dash">
      <div className="itens-dash">
        <HeaderDash totalposvenda={totalposvenda} totalRealizados={totalRealizadosPosVenda} />
        <ListDashboard setTotalPosVenda={setTotalPosVenda} setTotalRealizadosPosVenda={setTotalRealizadosPosVenda} /> 
      </div>
    </div>
  );
};
