import React, { useState } from "react";
import "./Styles/FichaFinanceiro.css";
import { FinanceiroForm } from "./Components/FinanceiroForm";

export const FichaFinanceiro: React.FC = () => {
  const clientInfo = {
    cnpj: "31.400.847/0001-97",
    telefone: "(70) 7070-7070",
    vencimento: "10/10/2024",
    cobrador: "Kaio",
  };

  const [cobrador] = useState(true);

  return (
    <>
      <div className="financeiro">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="card p-4">
                <h2 className="text-center">Informações Gerais</h2>
                <p>
                  <strong>CNPJ:</strong> {clientInfo.cnpj}
                </p>
                <p>
                  <strong>Telefone:</strong> {clientInfo.telefone}
                </p>
                <p>
                  <strong>Vencimento:</strong> {clientInfo.vencimento}
                </p>

                {cobrador && (
                  <div>
                    <p>
                      <strong>Cobrador: </strong> {clientInfo.cobrador}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <FinanceiroForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
