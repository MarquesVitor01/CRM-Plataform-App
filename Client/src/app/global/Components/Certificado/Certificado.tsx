import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InfoqrMkt } from "../../../pages/Estatico/MsgMkt/Components/InfoqrMkt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Config/firebase/firebaseConfig";
import html2pdf from "html2pdf.js";

export const Certificado: FC = () => {
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

    const downloadPDFAssinatura = () => {
      const contratoElement = document.getElementById("assinatura");
      const btn = document.getElementById("btn-baixar-pdf");
  
      if (btn) {
        btn.style.display = "none";
      }
  
      if (contratoElement) {
        contratoElement.classList.add("modo-pdf");
  
        const rect = contratoElement.getBoundingClientRect();
        const widthInInches = rect.width / 96;
        const heightInInches = rect.height / 96;
  
        const opt: any = {
          margin: 0,
          filename: `${clientData.razaoSocial}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false,
          },
          jsPDF: {
            unit: "in",
            format: [widthInInches, heightInInches],
            orientation:
              widthInInches > heightInInches ? "landscape" : "portrait",
          },
        };
  
        html2pdf()
          .set(opt)
          .from(contratoElement)
          .save()
          .then(() => {
            contratoElement.classList.remove("modo-pdf");
            if (btn) btn.style.display = "flex";
          })
          .catch((error: unknown) => {
            contratoElement.classList.remove("modo-pdf");
            console.error("Erro ao gerar PDF:", error);
            alert("Houve um erro ao gerar o PDF. Tente novamente.");
            if (btn) btn.style.display = "flex";
          });
      } else {
        alert("Erro: Um ou mais elementos não foram encontrados.");
      }
    };
  return (
    <div className="bg-aaa">
      <div className="bg-mktservice">
        <div className="bg-infos-mktservices" id="assinatura">
          <div className="box-avaliacao">
            <p className="text-uppercase text-center ">
              Certificamos que o comércio:
              <span>{clientData?.nomeFantasia || "Nome Fantasia"}</span> <br />
              Está em dia com a atualização da sua página no Google Maps e conta
              com suporte da G MAPS CONTACT CENTER LTDA até{" "}
              {clientData?.dataVigencia} .
            </p>
          </div>
          <InfoqrMkt />
        </div>
        <div className="btns-sections my-3" id="btn-baixar-pdf">
          <button className="btn btn-danger" onClick={downloadPDFAssinatura}>
            <FontAwesomeIcon icon={faFilePdf} />
            <span className="ms-1">Baixar PDF</span>
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};
