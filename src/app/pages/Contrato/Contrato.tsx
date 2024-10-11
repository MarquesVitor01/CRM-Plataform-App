import React from "react";
import "./Styles/Contrato.css";
import { Header } from "./Components/Header";
import { DadosEmpresa } from "./Components/DadosEmpresa";
import { Condicoes } from "./Components/Condicoes";
import { Bonus } from "./Components/Bonus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const Contrato = () => {
  const downloadPDF = () => {
    const input = document.getElementById("contrato");

    // Verifica se o input é válido
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "pt", "a4");

        // Define a largura e a altura da página do PDF
        const imgWidth = 580; // Ajuste conforme necessário
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        // Adiciona a imagem e cria novas páginas se necessário
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("contrato.pdf");
      });
    }
  };

  return (
    <div className="bg-contrato" >
      <div className="bg-infos-contrato " id="contrato">
        <Header />
        <DadosEmpresa />
        <Condicoes />
        <Bonus />
      </div>
      <button className="btn btn-danger mt-4" onClick={downloadPDF}>
        <FontAwesomeIcon icon={faFilePdf} /> Baixar PDF
      </button>
    </div>
  );
};

export default Contrato;
