import React, { FC, useEffect, useState } from "react";
import "./Components/styles/Contrato.css";
import { Header } from "./Components/Header";
import { DadosEmpresa } from "./Components/DadosEmpresa";
import { Condicoes } from "./Components/Condicoes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import html2pdf from "html2pdf.js";
import { Infoqr } from "./Components/Infoqr";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../global/Config/firebase/firebaseConfig";
import { useParams } from "react-router-dom";
import CampoLinkContrato from "./Components/LinkContrato";
import { Certificado } from "../../../global/Components/Certificado/Certificado";
import { Mensagens } from "../../../global/Components/Mensagens/Mensagens";

export const See: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [clientData, setClientData] = useState<any>(null);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        if (id) {
          const docRef = doc(db, "vendas", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const vendaData = docSnap.data();
            setClientData(vendaData);
          } else {
            console.log("Venda não encontrada");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      }
    };

    fetchClientData();
  }, [id]);

  const downloadPDF = () => {
    const contratoElement = document.getElementById("contrato");
    const bgInfosContrato = document.querySelector(
      ".bg-infos-contrato-principal"
    ) as HTMLElement;

    if (contratoElement && bgInfosContrato) {
      const originalPadding = bgInfosContrato.style.padding;

      const opt = {
        margin: 0.5,
        filename: `${clientData?.razaoSocial || "contrato"}.pdf`,
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
          bgInfosContrato.style.padding = originalPadding;
        })
        .catch((error: unknown) => {
          console.error("Erro ao gerar PDF:", error);
          alert("Houve um erro ao gerar o PDF. Tente novamente.");
        });
    } else {
      alert("Erro: Um ou mais elementos não foram encontrados.");
    }
  };

  return (
    <div className="bg-contrato">
      <div className="row">
        <div className=" d-flex flex-column align-items-center justify-content-center">
          <div className="bg-infos-contrato-principal" id="contrato">
            <Header />
            <DadosEmpresa />
            <Infoqr />
            <div className="page-break"></div>
            <Condicoes />
          </div>
          <button className="btn btn-danger mt-4" onClick={downloadPDF}>
            <FontAwesomeIcon icon={faFilePdf} /> Baixar PDF
          </button>
        </div>
        {/* <div className="col-md-7">
          <Mensagens />
          <CampoLinkContrato idVenda={id} />
          <Certificado />
        </div> */}
      </div>
    </div>
  );
};
