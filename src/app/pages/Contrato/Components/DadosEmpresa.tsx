import React from "react";

export const DadosEmpresa: React.FC = () => {
  // Objeto com as informações da empresa
  const empresaInfo = {
    razaoSocial: "Churrascaria e Restaurante Vitorio - LTDA",
    nomeFantasia: "Churrascaria e Restaurante Vitorio",
    bairro: "Loteamento Prodoeste",
    estado: "MT",
    cnpj: "52.767.015/0001-83",
    enderecoComercial: "Rodovia Br 364, 117,5",
    cep: "78795-000",
    cidade: "PEDRA PRETA",
    telefone: "",
    celular: "67984817459",
    whatsapp: "67984817459",
    horario: "10:30 18:00",
    email1: "weslwyvitorio@gmail.com",
    email2: "",
    link: "www.google.com",
    obs: "Teste aqui",
    responsavel: "WESLEY DOS SANTOS VITORIO",
    cargo: "Proprietário",
  };

  return (
    <div className="dados-empresa card p-4 my-3 shadow-sm">
      <h5 className="text-center font-weight-bold">DADOS DA EMPRESA</h5>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="p-3 bg-light rounded">
            <p>
              <strong>RAZÃO SOCIAL:</strong> {empresaInfo.razaoSocial}
            </p>
            <p>
              <strong>NOME FANTASIA:</strong> {empresaInfo.nomeFantasia}
            </p>
            <p>
              <strong>BAIRRO:</strong> {empresaInfo.bairro}
            </p>
            <p>
              <strong>ESTADO:</strong> {empresaInfo.estado}
            </p>
            <p>
              <strong>CNPJ/CPF:</strong> {empresaInfo.cnpj}
            </p>
            <p>
              <strong>ENDEREÇO COMERCIAL:</strong> {empresaInfo.enderecoComercial}
            </p>
            <p>
              <strong>CEP:</strong> {empresaInfo.cep}
            </p>
            <p>
              <strong>CIDADE:</strong> {empresaInfo.cidade}
            </p>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="p-3 bg-light rounded">
            <p>
              <strong>TELEFONE:</strong> {empresaInfo.telefone || "N/A"}
            </p>
            <p>
              <strong>CELULAR:</strong> {empresaInfo.celular}
            </p>
            <p>
              <strong>WHATSAPP:</strong> {empresaInfo.whatsapp}
            </p>
            <p>
              <strong>HORÁRIO DE FUNCIONAMENTO:</strong> {empresaInfo.horario}
            </p>
            <p>
              <strong>1º E-MAIL:</strong> {empresaInfo.email1}
            </p>
            <p>
              <strong>2º E-MAIL:</strong> {empresaInfo.email2 || "N/A"}
            </p>
            <p>
              <strong>LINK DA PÁGINA GOOGLE:</strong>{" "}
              <a
                href={`https://${empresaInfo.link}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {empresaInfo.link}
              </a>
            </p>
            <p>
              <strong>OBSERVAÇÕES:</strong> {empresaInfo.obs}
            </p>
          </div>
        </div>
      </div>
      <div className="col-12 p-2">
  <div className="bg-light rounded">
    <div className="row">
      <div className="col-6">
        <p>
          <strong>NOME DO RESPONSÁVEL:</strong> {empresaInfo.responsavel}
        </p>
      </div>
      <div className="col-6">
        <p>
          <strong>CARGO:</strong> {empresaInfo.cargo}
        </p>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};
