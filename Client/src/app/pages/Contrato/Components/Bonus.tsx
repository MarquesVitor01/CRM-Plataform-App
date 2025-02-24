import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase/firebaseConfig";
import { QRCodeSVG } from "qrcode.react";

export const Bonus: React.FC = () => {
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

  const formatDateToBrazilian = (dateString: string) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 3);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatValor = (value: string): string => {
    return value.replace(/\D/g, "").replace(/(\d)(\d{2})$/, "$1,$2");
  };

  return (
    clientData && (
      <div className="bonus card text-center p-4">
        <h5 className="text-white ">CONDIÇÕES DE PAGAMENTO</h5>
        <div className="d-flex justify-content-center my-1">
          {clientData.criacao === "sim" && (
            <div className="mx-2">
              <strong
                style={{
                  color: "red",
                }}
              >
                Criação
              </strong>
            </div>
          )}
          {clientData.anuncio === "sim" && (
            <div className="mx-2">
              <strong
                style={{
                  color: "red",
                }}
              >
                Anúncio
              </strong>
            </div>
          )}
          {clientData.ctdigital === "sim" && (
            <div className="mx-2">
              <strong
                style={{
                  color: "red",
                }}
              >
                Cartão Digital
              </strong>
            </div>
          )}
          {clientData.logotipo === "sim" && (
            <div className="mx-2">
              <strong
                style={{
                  color: "red",
                }}
              >
                Logotipo
              </strong>
            </div>
          )}
        </div>

        <div className="form-group">
          {clientData.contrato === "Recorencia" ? (
            <p>
              <strong>
                COMO ACORDADO SEGUE PLANO{" "}
                <u className="">{clientData.validade} </u>
                SENDO 1º PAGAMENTO NO VALOR DE{" "}
                <u>
                  R${" "}
                  {clientData.valorVenda
                    ? formatValor(clientData.valorVenda)
                    : ""}
                </u>{" "}
                ({clientData.valorExtenso}) + 11 PARCELAS
                DE
                <u>
                  R${" "}
                  19,90
                </u>{" "}
                (Dezenove Reais e Noventa Centavos) COM VENCIMENTO PARA O DIA
                <u> {formatDateToBrazilian(clientData.dataVencimento)} </u>E SUAS PARCELAS PARA TODO DIA
                <u> {clientData.diaData} </u>DE CADA MÊS.
              </strong>
            </p>
          ) : (
            <p>
              <strong>
                Como acordado, segue o plano no valor de{" "}
                <u>
                  R${" "}
                  {clientData.valorVenda
                    ? formatValor(clientData.valorVenda)
                    : ""}
                </u>
                , a ser pago em{" "}
                <u>
                  {clientData.parcelas} parcela(s)
                  {clientData.parcelas > 1 &&
                    ` de R$ ${
                      clientData.valorParcelado
                        ? formatValor(clientData.valorParcelado)
                        : ""
                    }`}
                </u>
                , via <u>{clientData.formaPagamento}</u>, com o vencimento para
                o dia <u>{formatDateToBrazilian(clientData.dataVencimento)}</u>.
              </strong>
            </p>
          )}
        </div>

        <p className="">
          O PAGAMENTO PODE SER FEITO ATRAVÉS DO BOLETO BANCÁRIO OU PIX QR-CODE
          DISPONÍVEL NO BOLETO, ENVIADO ATRAVÉS DO E-MAIL E WHATSAPP DO
          CONTRATANTE.
        </p>

        <div className="boleto-container">
          <div className="boleto-logo">
            <img src={require("../../../Assets/logo-efi.png")} alt="EFI Pay" />
          </div>
          <div className="boleto-header mt-3">
            <div className="boleto-info">
              <div className="header-boleto">
                <p className="mt-3">
                  Código do boleto: <br />
                  {clientData.boleto?.[0]?.barcode}
                </p>
                <p className="mt-3">
                  Link do boleto: <br />
                  <a href={clientData.boleto?.[0]?.billetLink}>
                    {clientData.boleto?.[0]?.billetLink}
                  </a>
                </p>
              </div>
              <div className="code-boleto">
                <p className="mt-3">
                  QrCode para pagamento:
                  {clientData.boleto?.[0]?.pix && (
                    <div className="mt-1">
                      <QRCodeSVG
                        value={clientData.boleto?.[0]?.pix}
                        size={85}
                      />
                    </div>
                  )}
                </p>
              </div>
              <p className="mt-3">
                  <a href={clientData.boleto?.[0]?.link}>
                    {clientData.boleto?.[0]?.link}
                  </a>
                </p>
              <p className="mt-3">
                Data de vencimento:{" "}
                {formatDateToBrazilian(clientData.dataVencimento)}
              </p>

            </div>
          </div>
        </div>
        {/* <p>PARA ATENDIMENTO VIA WHATSAPP BASTA CLICAR NO ÍCONE ABAIXO:</p>
        <a
          href="https://wa.link/ulgll4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/img/img-wpp-contrato.webp"
            alt="WhatsApp"
            style={{ width: "170px" }}
          />
        </a> */}
      </div>
    )
  );
};
