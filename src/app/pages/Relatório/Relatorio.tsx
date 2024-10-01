import React from "react";
import Podio from "./Components/Podio";
import "./Components/Relatorio.css";
import { Ranking } from "./Components/Ranking";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

export const Relatorio = () => {
  const sair = () => {
    window.history.back();
  };

  return (
    <>
      <div className="relatorio">
        <button className="btn btn-warning btn-sair-ranking" onClick={sair}>
          <FontAwesomeIcon icon={faLeftLong} />
        </button>
        <Podio />
        <div className="total">
          <h2>Total de Vendas: 06</h2>
        </div>
      </div>
    </>
  );
};
