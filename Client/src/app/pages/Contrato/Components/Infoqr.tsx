import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase/firebaseConfig";
import { QRCodeSVG } from "qrcode.react";

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

  // Função para formatar a data no formato brasileiro
  const formatDateToBrazilian = (dateString: string) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 3); // Ajuste para o horário de Brasília, se necessário
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // meses começam do zero
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatValor = (value: string): string => {
    return value.replace(/\D/g, "").replace(/(\d)(\d{2})$/, "$1,$2");
  };
  return (
    clientData && (
      <div className="bonus card text-center gravacao p-4">
        <h5 className="text-white ">CONDIÇÕES DE PAGAMENTO</h5>
        <div className="form-group-info">
          <p className="text-uppercase">
            {clientData.parcelas <= 1 &&
              (clientData.contrato === "Base" ||
                clientData.contrato === "Renovacao") && (
                <strong>
                  O plano escolhido foi o{" "}
                  <u className="">{clientData.validade}</u>, no valor de{" "}
                  <u>
                    R${" "}
                    {clientData.valorVenda
                      ? formatValor(clientData.valorVenda)
                      : ""}
                  </u>{" "}
                  , com o vencimento para o dia{" "}
                  {formatDateToBrazilian(clientData.dataVencimento)}.
                  <br />
                  Sua renovação prevista para ocorrer em{" "}
                  {clientData.dataVigencia}
                  . <br /> salvo manifestação contrária por parte do contratante
                  dentro do prazo legal de 30 dias antecedentes.
                </strong>
              )}
            {clientData.parcelas > 1 &&
              clientData.contrato === "Recorencia" && (
                <strong>
                  O plano escolhido foi o{" "}
                  <u className="">{clientData.validade}</u>, no valor de{" "}
                  <u>
                    R${" "}
                    {clientData.valorVenda
                      ? formatValor(clientData.valorVenda)
                      : ""}
                  </u>{" "}
                  , com o vencimento para o dia{" "}
                  {formatDateToBrazilian(clientData.dataVencimento)}. E suas
                  parcelas recorrentes no valor de{" "}
                  <u>
                    R${" "}
                    {clientData.parcelaRecorrente
                      ? formatValor(clientData.parcelaRecorrente)
                      : ""}
                  </u>{" "} com vencimento para o dia {clientData.diaData} dos
                  meses subsequentes.
                  <br />
                  Sua renovação prevista para ocorrer em{" "}
                  {clientData.dataVigencia}
                  . <br /> salvo manifestação contrária por parte do contratante
                  dentro do prazo legal de 30 dias antecedentes.
                </strong>
              )}
            {clientData.parcelas > 1 &&
              (clientData.contrato === "Base" ||
                clientData.contrato === "Renovacao") && (
                <strong>
                  O plano escolhido foi o{" "}
                  <u className="">{clientData.validade}</u>, no valor de{" "}
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
                  <br />
                  Sua renovação prevista para ocorrer em{" "}
                  {clientData.dataVigencia}
                  . <br /> salvo manifestação contrária por parte do contratante
                  dentro do prazo legal de 30 dias antecedentes.
                </strong>
              )}
          </p>
        </div>
        <div className="boleto-container">
          <div className="boleto-logo">
            <img src={require("../../../Assets/logo-efi.png")} alt="EFI Pay" />
          </div>
          <div className="boleto-header">
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
        <h5 className="text-white">GRAVAÇÃO</h5>
        <div className="form-group-info">
          <p>
            <strong>
              ACEITE REALIZADO DE FORMA VERBAL;
              <br />
              PARA VERIFICAR SUA ADESÃO CLIQUE NO BOTÃO A BAIXO OU ESCANEIE O
              QRCODE DA GRAVAÇÃO
            </strong>
          </p>
        </div>
        <div className="qrcode-container">
          <a
            href={clientData.linkGravacao}
            target="_blank"
            rel="noopener noreferrer"
            className="qrcode-link"
          >
            <img
              src={require("../../../Assets/play.png")}
              alt="WhatsApp"
              style={{ width: "80px" }}
            />
            {clientData.linkGravacao && (
              <div className="qrcode">
                <QRCodeSVG value={clientData.linkGravacao} size={90} />
              </div>
            )}
          </a>
        </div>
        <div className="linha-assinatura mt-5"></div>

        <h5 className="mt-2">CENTRAL DE ATENDIMENTO</h5>
        <div className="text-center">
          <p>
            0800 580 2766
            <br />
            <a href="mailto:MARKETING@GRUPOMAPSEMPRESAS.com.br">
              MARKETING@GRUPOMAPSEMPRESAS.com.br
            </a>
            <br />
            <a href="mailto:CONTATO@GRUPOMAPSEMPRESAS.com.br">
              CONTATO@GRUPOMAPSEMPRESAS.com.br
            </a>
          </p>
        </div>
      </div>
    )
  );
};
