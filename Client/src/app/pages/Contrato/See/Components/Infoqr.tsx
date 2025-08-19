import React from "react";
import { useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useClientData } from "../../../../global/hooks/useClientData";
import { formatDateToBrazilian, formatValor } from "../../../../global/utils/formatters";

export const Infoqr: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { clientData } = useClientData(id);

  return (
    clientData && (
      <div className="bonus  text-center gravacao">
        <h5 className="text-center text-uppercase">
          Visualize sua página no Google
        </h5>
        <div className="img-google">
          <img
            src={require("../../../../assets/logo-google.png")}
            alt="WhatsApp"
            style={{ width: "50px" }}
          />
        </div>
        <div className="qrcode-google">
          {clientData.linkGoogle && (
            <div className="d-flex flex-column align-items-center ">
              <p className="">
                Escanei o QrCOde Para Verificar e conferir a página ou clique no
                link:
              </p>
              <QRCodeSVG
                value={clientData.linkGoogle}
                size={70}
                className=" mb-1 qr-image"
              />
              <p className="">
                Link da Página:{" "}
                <a href={`${clientData.linkGoogle}`}>{clientData.linkGoogle}</a>
              </p>
            </div>
          )}
        </div>
        <h5 className="text-white cond-pagamento">CONDIÇÕES DE PAGAMENTO</h5>
        <div className="d-flex align-items-center check-termos">
          <p className="mb-0 ms-1 ">
            <FontAwesomeIcon icon={faCheckCircle} color="#007bff" size="lg" />
            {"  "}
            DECLARO TER RECEBIDO ATRAVÉS DA LIGAÇÃO TODAS INFORMAÇÕES REFERENTE
            AO PLANO CONTRATADO.
          </p>
        </div>
        <div className="form-group-info">
          <p className="text-uppercase text-pagamento">
            {clientData.parcelas <= 1 &&
              (clientData.contrato === "Base" ||
                clientData.contrato === "Renovacao") && (
                <strong>
                  O plano escolhido é o{" "}
                  <u className="">{clientData.validade}</u>, com vigencia até{" "}
                  {clientData.dataVigencia}
                  <br />o valor do plano é de{" "}
                  <u>
                    R${" "}
                    {clientData.valorVenda
                      ? formatValor(clientData.valorVenda)
                      : ""}
                  </u>{" "}
                  , cujo vencimento ficou para o dia{" "}
                  {formatDateToBrazilian(clientData.dataVencimento)}.
                  {clientData.renovacaoAutomatica === "sim" && (
                    <>
                      <br />
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        color="#007bff"
                        size="lg"
                      />
                      {"  "}
                      RENOVAÇÃO AUTOMATICA.{" "}
                    </>
                  )}
                  <br /> AUTORIZO QUE A EMPRESA CONTRATADA REALIZE TODA
                  ASSESSORIA PARA OTIMIZAÇÃO DO PERFIL EM MINHA PAGINA DO GOOGLE
                  MAPS, E ESTOU CIENTE DE TODAS INFORMAÇÕES PRESENTES NESTE
                  DOCUMENTO.
                </strong>
              )}
            {clientData.parcelas > 1 &&
              clientData.contrato === "Recorencia" && (
                <strong>
                  O plano escolhido é o{" "}
                  <u className="">{clientData.validade}</u>, com vigencia até{" "}
                  {clientData.dataVigencia} <br />o valor do plano é de{" "}
                  <u>
                    R${" "}
                    {clientData.valorVenda
                      ? formatValor(clientData.valorVenda)
                      : ""}
                  </u>{" "}
                  , cujo vencimento ficou para o dia{" "}
                  {formatDateToBrazilian(clientData.dataVencimento)}. E suas
                  parcelas recorrentes no valor de{" "}
                  <u>
                    R${" "}
                    {clientData.parcelaRecorrente
                      ? formatValor(clientData.parcelaRecorrente)
                      : ""}
                  </u>{" "}
                  com vencimento para o dia {clientData.diaData} dos meses
                  subsequentes.
                  {clientData.renovacaoAutomatica === "sim" && (
                    <>
                      <br />
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        color="#007bff"
                        size="lg"
                      />
                      {"  "}
                      RENOVAÇÃO AUTOMATICA.{" "}
                    </>
                  )}
                  <br /> AUTORIZO QUE A EMPRESA CONTRATADA REALIZE TODA
                  ASSESSORIA PARA OTIMIZAÇÃO DO PERFIL EM MINHA PAGINA DO GOOGLE
                  MAPS, E ESTOU CIENTE DE TODAS INFORMAÇÕES PRESENTES NESTE
                  DOCUMENTO.
                </strong>
              )}
            {clientData.parcelas > 1 &&
              (clientData.contrato === "Base" ||
                clientData.contrato === "Renovacao") && (
                <strong>
                  O plano escolhido é o{" "}
                  <u className="">{clientData.validade}</u>, com vigencia até{" "}
                  {clientData.dataVigencia} <br />o valor do plano é de{" "}
                  <u>
                    R${" "}
                    {clientData.valorVenda
                      ? formatValor(clientData.valorVenda)
                      : ""}
                  </u>{" "}
                  , parcelado em {clientData.parcelas} parcela(s) de{" "}
                  <u>
                    R${" "}
                    {clientData.valorParcelado
                      ? formatValor(clientData.valorParcelado)
                      : ""}
                  </u>{" "}
                  com primeiro vencimento para o dia{" "}
                  {formatDateToBrazilian(clientData.dataVencimento)}. E suas
                  parcelas com vencimento para o dia {clientData.diaData} dos
                  meses subsequentes.
                  {clientData.renovacaoAutomatica === "sim" && (
                    <>
                      <br />
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        color="#007bff"
                        size="lg"
                      />
                      {"  "}
                      RENOVAÇÃO AUTOMATICA.{" "}
                    </>
                  )}
                  <br /> AUTORIZO QUE A EMPRESA CONTRATADA REALIZE TODA
                  ASSESSORIA PARA OTIMIZAÇÃO DO PERFIL EM MINHA PAGINA DO GOOGLE
                  MAPS, E ESTOU CIENTE DE TODAS INFORMAÇÕES PRESENTES NESTE
                  DOCUMENTO.
                </strong>
              )}
          </p>
        </div>
        <div className="assinatura-section justify-content-center d-flex flex-column">
          <div className="assinatura-section justify-content-center d-flex flex-column">
            <div className="linha-assinatura mt-5"></div>
          </div>
        </div>
      </div>
    )
  );
};
