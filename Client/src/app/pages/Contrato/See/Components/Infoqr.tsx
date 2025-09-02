import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../../global/Config/firebase/firebaseConfig";
import { QRCodeSVG } from "qrcode.react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import {
  formatDateToBrazilian,
  formatValor,
} from "../../../../global/utils/formatters";

export const Infoqr: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [clientData, setClientData] = useState<any>(null);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        if (id) {
          const docRef = doc(db, "vendas", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setClientData(docSnap.data());
          } else {
            console.log("Não encontrado");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar os dados do cliente: ", error);
      }
    };

    fetchClientData();
  }, [id]);

  return (
    clientData && (
      <div className="bonus  text-center gravacao">
        {/* <h5 className="text-center text-uppercase">
          Visualize sua página no Google
        </h5>
        <div className="img-google">
          <img
            src={require("../../../../Assets/logo-google.png")}
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
        </div> */}
        <h5 className="text-white cond-pagamento">CONDIÇÕES DE PAGAMENTO</h5>
        <div className="d-flex align-items-center check-termos">
          <p className="mb-0 ms-1 ">
            <FontAwesomeIcon icon={faCheckCircle} color="#007bff" size="lg" />
            {"  "}
            DECLARO TER RECEBIDO ATRAVÉS DA LIGAÇÃO TODAS INFORMAÇÕES REFERENTE
            AO PLANO CONTRATADO
            {clientData.renovacaoAutomatica === "nao" &&
              ", SEM RENOVAÇÃO AUTOMÁTICA"}
            .
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
        <div className="boleto-container">
          <div className="boleto-logo">
            <img src={require("../../../../Assets/logo-efi.png")} alt="EFI Pay" />
          </div>
          <div className="boleto-header">
            <div className="boleto-info">
              <div className="header-boleto">
                <p className="">
                  Código do boleto: <br />
                  {clientData.boleto?.[0]?.barcode}
                </p>
                <p className="">
                  Link do boleto: <br />
                  <a href={clientData.boleto?.[0]?.billetLink}>
                    {clientData.boleto?.[0]?.billetLink}
                  </a>
                </p>
              </div>
              <div className="code-boleto">
                <p className="">
                  QrCode para pagamento:
                  {clientData.boleto?.[0]?.pix && (
                    <div className="">
                      <QRCodeSVG
                        value={clientData.boleto?.[0]?.pix}
                        size={70}
                      />
                    </div>
                  )}
                </p>
              </div>
              <p className="">
                <a href={clientData.boleto?.[0]?.link}>
                  {clientData.boleto?.[0]?.link}
                </a>
              </p>
              <p className="">
                Data de vencimento:{" "}
                {formatDateToBrazilian(clientData.dataVencimento)}
              </p>
            </div>
          </div>
        </div>

      </div>
    )
  );
};
