import React from "react";
import { useParams } from "react-router-dom";
import { useClientData } from "../../../../global/hooks/useClientData";
import { formatCNPJ, formatCPF, formatCelular, formatFixo } from "../../../../global/utils/formatters";

export const DadosEmpresa: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { clientData } = useClientData(id);

  return (
    clientData && (
      <div className="dados-empresa  upper">
        <h5 className="text-center font-weight-bold">DADOS DA EMPRESA</h5>
        <div className="row">
          <div className="col-md-6 mb-1">
            <div className="p-2 bg-light rounded">
              <p><strong>RAZÃO SOCIAL:</strong> {clientData.razaoSocial}</p>
              <p><strong>NOME FANTASIA:</strong> {clientData?.nomeFantasia}</p>
              <p><strong>ENDEREÇO COMERCIAL:</strong> {clientData.enderecoComercial}, {clientData.numeroResidencial}</p>
              <p><strong>BAIRRO:</strong> {clientData.bairro}</p>
              <p><strong>CIDADE:</strong> {clientData.cidade}</p>
              <p><strong>ESTADO:</strong> {clientData.estado}</p>
              <p><strong>CEP:</strong> {clientData.cep}</p>
            </div>
          </div>
          <div className="col-md-6 mb-1">
            <div className="p-2 bg-light rounded">
              <p><strong>CNPJ/CPF:</strong> {clientData.cnpj ? formatCNPJ(clientData.cnpj) : clientData.cpf ? formatCPF(clientData.cpf) : ""}</p>
              <p><strong>TELEFONE:</strong> {clientData.fixo ? formatFixo(clientData.fixo) : ""}</p>
              <p><strong>CELULAR:</strong> {clientData.celular ? formatCelular(clientData.celular) : ""}</p>
              <p><strong>WHATSAPP:</strong> {clientData.whatsapp ? formatCelular(clientData.whatsapp) : ""}</p>
              <p><strong>1º E-MAIL:</strong> {clientData.email1}</p>
              <p><strong>HORÁRIO DE FUNCIONAMENTO:</strong> {clientData.horarioFuncionamento}</p>
            </div>
          </div>
        </div>
        <div className="col-12 p-2">
          <div className="bg-light rounded">
            <div className="row">
              <div className="col-6"><p><strong>NOME DO RESPONSÁVEL:</strong> {clientData.responsavel}</p></div>
              <div className="col-6"><p><strong>CARGO:</strong> {clientData.cargo}</p></div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
