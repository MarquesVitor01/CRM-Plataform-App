import React, { FC, useEffect, useState } from "react";
import "./Styles/Contrato.css";
import { Header } from "./Components/Header";
import { DadosEmpresa } from "./Components/DadosEmpresa";
import { Condicoes } from "./Components/Condicoes";
import { Bonus } from "./Components/Bonus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import html2pdf from "html2pdf.js";
import { Infoqr } from "./Components/Infoqr";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useParams } from "react-router-dom";
import axios from "axios";
import CampoLinkContrato from "./Components/LinkContrato";

export const Contrato: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [clientData, setClientData] = useState<any>(null);
  const [equipeMsg, setEquipeMsg] = useState<string>("");

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        if (id) {
          const docRef = doc(db, "vendas", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const vendaData = docSnap.data();
            setClientData(vendaData);

            const equipe = vendaData.equipeMsg || "";
            setEquipeMsg(equipe);
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
    // const condicoesElement = document.querySelector(
    //   ".condicoes p"
    // ) as HTMLElement;
    const bgInfosContrato = document.querySelector(
      ".bg-infos-contrato"
    ) as HTMLElement;

    if (contratoElement && bgInfosContrato) {
      // const originalCondicoesWidth = condicoesElement.style.width;
      const originalPadding = bgInfosContrato.style.padding;

      // condicoesElement.style.width = "700px";
      // bgInfosContrato.style.padding = "0";

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
          // condicoesElement.style.width = originalCondicoesWidth;
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
  const formatarCentavosParaReais = (
    valor: string | number | undefined
  ): string => {
    if (!valor) return "0,00";

    const valorString = typeof valor === "number" ? valor.toString() : valor;
    const somenteNumeros = valorString.replace(/\D/g, ""); // remove tudo que não for número

    if (somenteNumeros.length < 3) {
      return (parseInt(somenteNumeros || "0", 10) / 100)
        .toFixed(2)
        .replace(".", ",");
    }

    const reais = somenteNumeros.slice(0, -2);
    const centavos = somenteNumeros.slice(-2);
    return `${reais},${centavos}`;
  };

  const formatarDataParaBR = (data: string | undefined): string => {
    if (!data) return "";

    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  function formatarNomeOperador(nome: string | undefined): string {
    if (!nome) return "[NOME OPERADOR]";
    return nome
      .split(".")
      .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1))
      .join(" ");
  }

  const mensagens = [
    {
      titulo: "MENSAGEM 1",
      texto: `Olá *${
        clientData?.responsavel || "[NOME DO RESPONSÁVEL]"
      }*, eu me chamo *${
        formatarNomeOperador(clientData?.operador) || "[NOME OPERADOR]"
      }*, será um prazer em ajudar a melhorar sua página do Google Maps! \n\nConforme falamos, o seu plano escolhido foi o *${
        clientData?.validade || "[TIPO DE PLANO]"
      }* no valor de *R$ ${
        formatarCentavosParaReais(clientData?.valorVenda) || "[VALOR DA VENDA]"
      }* com vencimento para o dia *${
        formatarDataParaBR(clientData?.dataVencimento) || "[DATA DE VENCIMENTO]"
      }*.\n\nPara que possamos dar início à otimização da sua página e à divulgação das fotos e vídeos da sua empresa em nossas campanhas no Google, precisamos da sua autorização.\n\nSegue abaixo o termo da autorização:\n ${
        clientData?.linkParaAssinatura || "[LINK PARA ASSINATURA]"
      }\n\n`,
    },
    {
      titulo: "MENSAGEM 2",
      texto: `Perfeito, *${
        clientData?.responsavel || "[NOME DO RESPONSÁVEL]"
      }*! ✅ \n\nRecebemos sua autorização para o uso das imagens e vídeos da sua empresa e prestação dos nossos serviços.\n\nJá vamos dar início 🚀`,
    },
    {
      titulo: "MENSAGEM 3",
      texto: `Agora vou enviar o seu QR-CODE. Você pode:\n- Imprimir e colar no balcão da loja\n- Usar no cartão digital\n- Mandar por WhatsApp para clientes após o atendimento\n\nQuanto mais avaliações ⭐⭐⭐⭐⭐ e positivas, mais destaque sua empresa ganha no Google!`,
    },
    {
      titulo: "MENSAGEM 4",
      texto: `Pronto, segue seu QR-CODE!\n\nAproveite e baixe ele agora ou encaminhe para seus amigos, clientes e parentes.\n\nQuanto mais avaliações ⭐⭐⭐⭐⭐, mais destaque sua empresa ganha no Google!\n\n[inserir o link do Qr-code]`,
    },
  ];

  const celularComCodigo = `55${clientData?.celular.replace(/^55/, "") || ""}`;

  const handleEnviarMensagem = async (index: number) => {
    const mensagemSelecionada = mensagens[index];

    try {
      const response = await axios.post(
        "http://crm-plataform-app-6t3u.vercel.app/api/enviar-texto",
        {
          phone: celularComCodigo,
          message: mensagemSelecionada.texto,
          equipeMsg: equipeMsg,
        }
      );

      if (response.data.success) {
        alert("Mensagem enviada com sucesso!");
      } else {
        alert("Falha ao enviar a mensagem.");
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      alert("Ocorreu um erro ao enviar a mensagem.");
    }
  };

  return (
    <div className="bg-contrato row align-items-start">
      <div className="col-md-5 d-flex flex-column align-items-center justify-content-center">
        <div className="bg-infos-contrato" id="contrato">
          <Header />
          <DadosEmpresa />
          <Infoqr />
          {/* <Bonus /> */}
          <div className="page-break"></div>
          <Condicoes />
        </div>
        <button className="btn btn-danger mt-4" onClick={downloadPDF}>
          <FontAwesomeIcon icon={faFilePdf} /> Baixar PDF
        </button>
      </div>

      <div className="col-md-7">
        <div className="row gx-3 gy-4">
          {mensagens.map((mensagem, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div className="card-mensagem-custom p-3 h-100 d-flex flex-column justify-content-between">
                <div>
                  <h5 className="bg-primary text-white text-center py-2">
                    {mensagem.titulo}
                  </h5>
                  <p>{mensagem.texto}</p>
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => handleEnviarMensagem(index)}
                    className="btn btn-primary w-100"
                  >
                    ENVIAR MENSAGEM
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <CampoLinkContrato idVenda={id} />
      </div>
    </div>
  );
};
