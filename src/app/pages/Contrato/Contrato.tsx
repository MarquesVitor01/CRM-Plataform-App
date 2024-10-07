import React from "react";
import "./Styles/Contrato.css";
import { Header } from "./Components/Header";
import { DadosEmpresa } from "./Components/DadosEmpresa";
import { Condicoes } from "./Components/Condicoes";
import { Bonus } from "./Components/Bonus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

const Contrato = () => {
  return (
    <div className="bg-contrato">
      <div className="bg-infos-contrato">
        <Header />
        <DadosEmpresa />
        <Condicoes />
        <Bonus />

      </div>
        <button className="btn btn-danger mt-4"><FontAwesomeIcon icon={faFilePdf} /> Baixar PDF</button>
    </div>
  );
};

export default Contrato;
