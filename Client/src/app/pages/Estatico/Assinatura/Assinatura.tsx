import React, { FC, useEffect, useState } from "react";
import "../styles.css";
import { Header } from "./Components/Header";
import { DadosEmpresa } from "./Components/DadosEmpresa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import html2pdf from "html2pdf.js";
import { Infoqr } from "./Components/Infoqr";
import { doc, getDoc, } from "firebase/firestore";
import { db } from "../../../global/Config/firebase/firebaseConfig";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { formatValor } from "../../../global/utils/formatters";

export const Assinatura: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [clientData, setClientData] = useState<any>(null);
  const [, setDesconto] = useState<string>("");

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        if (id) {
          const docRef = doc(db, "vendas", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setClientData(docSnap.data());
            setDesconto(docSnap.data().desconto || "");
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

  const downloadPDF = () => {
    const contratoElement = document.getElementById("assinatura");
    const btn = document.getElementById("btn-baixar-pdf");

    if (btn) {
      btn.style.display = "none";
    }

    if (contratoElement) {
      const opt = {
        margin: 0.5,
        filename: `${clientData.razaoSocial}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: true,
        },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };

      html2pdf()
        .set(opt)
        .from(contratoElement)
        .save()
        .then(() => {
          if (btn) {
            btn.style.display = "flex";
          }
        })
        .catch((error: unknown) => {
          console.error("Erro ao gerar PDF:", error);
          alert("Houve um erro ao gerar o PDF. Tente novamente.");

          if (btn) {
            btn.style.display = "flex";
          }
        });
    } else {
      alert("Erro: Um ou mais elementos não foram encontrados.");
    }
  };

  return (
    clientData && (
      <div className="bg-assinatura">
        <div className="bg-infos-contrato" id="assinatura">
          <Header />
          <DadosEmpresa />
          <Infoqr />

          <div>
            <p className="text-uppercase text-center">
              <FontAwesomeIcon icon={faCheck} /> DECLARO TER RECEBIDO ATRAVÉS DA
              LIGAÇÃO TODAS INFORMÇÕES REFERENTE AO MEU PLANO CONTRATADO
              CONFORME GRAVAÇÃO DO ATENDIMENTO. MEU PLANO ESCOLHIDO É O{" "}
              {clientData.validade} COM VIGÊNCIA ATÉ {clientData.dataVigencia},{" "}
              {clientData.parcelas <= 1
                ? `O VALOR DO SERVIÇO CONTRATADO É DE
               R$ ${formatValor(clientData.valorVenda)} CUJO VENCIMENTO
              FICOU PARA O DIA
              
                ${new Date(
                  clientData.dataVencimento + "T00:00:00"
                ).toLocaleDateString("pt-BR")}
              
              .`
                : `O VALOR DO SERVIÇO CONTRATADO É DE
               R$ ${formatValor(clientData.valorVenda)} DIVIDIDO EM ${
                    clientData.parcelas
                  } PARCELAS DE R$ ${formatValor(clientData.valorParcelado)}, CUJO PRIMEIRO VENCIMENTO
              FICOU PARA O DIA
              
                ${new Date(
                  clientData.dataVencimento + "T00:00:00"
                ).toLocaleDateString("pt-BR")}
              
              E OS OUTROS VENCIMENTOS PARA O DIA ${
                clientData.diaData
              } SUBSEQUENTE DOS PRÓXIMOS MESES.`}
            </p>

          
            <p className="text-center">
              AUTORIZO QUE A EMPRESA CONTRATADA REALIZE TODA ASSESSORIA PARA
              OTIMIZAÇÃO DO PERIL EM MINHA PÁGINA DO GOOGLE MAPS, CIENTE DE
              TODAS INFORMAÇÕES PRESENTES NESTE DOCUMENTO.
            </p>

            <div className="assinatura-section pt-3">
              <p className="text-center">
                <strong>Assinatura:</strong>
              </p>
              <div className="linha-assinatura"></div>
            </div>
          </div>
          <div className="btns-sections my-3" id="btn-baixar-pdf">
            <button className="btn btn-danger" onClick={downloadPDF}>
              <FontAwesomeIcon icon={faFilePdf} />
              <span className="ms-1">Baixar PDF</span>
            </button>
          </div>
        </div>

        <ToastContainer />
      </div>
    )
  );
};
