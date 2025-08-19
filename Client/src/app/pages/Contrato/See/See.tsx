import React, { FC } from "react";
import "./Components/styles/Contrato.css";
import { Header } from "./Components/Header";
import { DadosEmpresa } from "./Components/DadosEmpresa";
import { Condicoes } from "./Components/Condicoes";
import { Infoqr } from "./Components/Infoqr";
import { InfoqrMkt } from "../../Estatico/MsgMkt/Components/InfoqrMkt";
import CampoLinkContrato from "./Components/LinkContrato";
import { ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useClientData } from "../../../global/hooks/useClientData"; 
import { usePdfGenerator } from "./Components/hooks/usePdfGenerator";
import { useMensagem } from "./Components/hooks/useMensagem";
import {
  formatarCentavosParaReais,
  formatarDataParaBR,
  formatarNomeOperador,
} from "../../../global/utils/formatters";

export const See: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { clientData, loading } = useClientData(id);
  const { gerarPDF, gerarPDFAssinatura } = usePdfGenerator();
  const { enviarMensagem } = useMensagem();

  if (loading) return <p>Carregando...</p>;

  const equipeMsg = clientData?.equipeMsg || "";
  const celularComCodigo = `55${clientData?.celular.replace(/^55/, "") || ""}`;

  const mensagens = [
    `Olá *${clientData?.responsavel || "[NOME DO RESPONSÁVEL]"}*, eu me chamo *${formatarNomeOperador(
      clientData?.operador
    )}*, será um prazer em ajudar sua página do Google Maps! Plano: *${
      clientData?.validade
    }* Valor: *R$ ${formatarCentavosParaReais(clientData?.valorVenda)}* Venc.: *${formatarDataParaBR(
      clientData?.dataVencimento
    )}* Autorização: ${clientData?.linkParaAssinatura || "[LINK]"}`,
    `Perfeito, *${clientData?.responsavel || "[NOME DO RESPONSÁVEL]"}*! ✅ Recebemos sua autorização.`,
    `Agora vou enviar o seu QR-CODE. Quanto mais avaliações ⭐⭐⭐⭐⭐, mais destaque.`,
    `Pronto, segue seu QR-CODE! Aproveite e baixe ou compartilhe.`
  ];

  return (
    <div className="bg-contrato row align-items-start">
      <div className="col-md-5 d-flex flex-column align-items-center justify-content-center">
        <div className="bg-infos-contrato" id="contrato">
          <Header />
          <DadosEmpresa />
          <Infoqr />
          <div className="page-break"></div>
          <Condicoes />
        </div>
        <button
          className="btn btn-danger mt-4"
          onClick={() => gerarPDF(`${clientData?.razaoSocial || "contrato"}.pdf`, "contrato")}
        >
          <FontAwesomeIcon icon={faFilePdf} /> Baixar PDF
        </button>
      </div>

      <div className="col-md-7">
        <div className="row gx-3 gy-4">
          {mensagens.map((texto, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div className="card-mensagem-custom p-3 h-100 d-flex flex-column justify-content-between">
                <div>
                  <h5 className="bg-primary text-white text-center py-2">{`MENSAGEM ${index + 1}`}</h5>
                  <p>{texto}</p>
                </div>
                <button
                  className="btn btn-primary w-100 mt-3"
                  onClick={() => enviarMensagem(texto, celularComCodigo, equipeMsg)}
                >
                  ENVIAR MENSAGEM
                </button>
              </div>
            </div>
          ))}
        </div>

        <CampoLinkContrato idVenda={id} />

        <div className="col-md-12">
          <div className="bg-mktservice">
            <div className="bg-infos-mktservice" id="assinatura">
              <div className="box-avaliacoes">
                <p className="text-uppercase text-center">
                  Certificamos que o comércio:{" "}
                  <span>{clientData?.nomeFantasia || "Nome Fantasia"}</span>
                  <br />
                  Está em dia com a atualização da página e conta com suporte da G MAPS até {clientData?.dataVigencia}.
                </p>
              </div>
              <InfoqrMkt />
            </div>
            <div className="btns-sections my-3" id="btn-baixar-pdf">
              <button
                className="btn btn-danger"
                onClick={() => gerarPDFAssinatura("assinatura", `${clientData?.razaoSocial}.pdf`, "btn-baixar-pdf")}
              >
                <FontAwesomeIcon icon={faFilePdf} /> <span className="ms-1">Baixar PDF</span>
              </button>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};
