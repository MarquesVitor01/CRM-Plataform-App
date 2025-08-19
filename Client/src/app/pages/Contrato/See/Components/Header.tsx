import React from "react";
import { useParams } from "react-router-dom";
import { useClientData } from "../../../../global/hooks/useClientData";
import { formatDateToBrazilian } from "../../../../global/utils/formatters";

export const Header: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { clientData } = useClientData(id);

  return (
    clientData && (
      <div className="header text-center upper">
        <img src="/img/logo_contrato_maps.jpg" alt="Logo" className="mb-1" />
        <div className="row m">
          <div className="col-md-4">
            <p><strong>CONTRATO Nº:</strong> {clientData.numeroContrato}</p>
          </div>
          <div className="col-md-4">
            <p><strong>DATA DE ADESÃO:</strong> {formatDateToBrazilian(clientData.data)}</p>
          </div>
          <div className="col-md-4">
            <p><strong>OPERADOR:</strong> {clientData.operador}</p>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-4"><p><strong>EQUIPE:</strong> {clientData.equipe}</p></div>
          <div className="col-md-4"><p><strong>VÁLIDO POR UM ANO</strong></p></div>
          <div className="col-md-4"><p><strong>PLANO:</strong> {clientData.validade}</p></div>
        </div>
      </div>
    )
  );
};
