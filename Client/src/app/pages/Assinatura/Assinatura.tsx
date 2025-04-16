import React, { FC, useEffect, useState } from "react";
import "./Styles/assinatura.css";
import { Header } from "./Components/Header";
import { DadosEmpresa } from "./Components/DadosEmpresa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import html2pdf from "html2pdf.js";
import { Infoqr } from "./Components/Infoqr";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useParams } from "react-router-dom";

export const Assinatura: FC = () => {
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

  const downloadPDF = () => {
    const contratoElement = document.getElementById("assinatura");


    if (contratoElement ) {
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
      <div className="bg-infos-contrato" id="assinatura">
        <Header />
        <DadosEmpresa />
        <Infoqr />   
      </div>
      <button className="btn btn-danger mt-4" onClick={downloadPDF}>
        <FontAwesomeIcon icon={faFilePdf} /> Baixar PDF
      </button>
    </div>
  );
};
