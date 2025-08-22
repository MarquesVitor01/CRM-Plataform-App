import React, { FC, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../global/Config/firebase/firebaseConfig";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatarCentavosParaReais, formatarDataParaBR, formatarNomeOperador } from "../../utils/formatters";

export const Mensagens: FC = () => {
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


  const mensagens = [
    {
      titulo: "MENSAGEM 1",

      texto: `Olá *${
        clientData?.responsavel || "[NOME DO RESPONSÁVEL]"
      }*, eu me chamo *${
        formatarNomeOperador(clientData?.operador) || "[NOME OPERADOR]"
      }* e será um prazer ajudar a melhorar a sua página no Google Maps! 🚀

Conforme conversamos, o plano escolhido foi o *${
        clientData?.validade || "[TIPO DE PLANO]"
      }*, no valor de *R$ ${
        formatarCentavosParaReais(clientData?.valorVenda) || "[VALOR DA VENDA]"
      }* com vencimento para o dia *${
        formatarDataParaBR(clientData?.dataVencimento) || "[DATA DE VENCIMENTO]"
      }*.

📌 Serviços inclusos em seu plano:

Atualização ou criação dos dados comerciais no Google Maps

Otimização de palavras-chave

Inclusão de até 5 bairros para ampliar a divulgação do estabelecimento

QR Code direcionador para receber avaliações no Google

Atualização de fotos e vídeos (mediante envio da contratante)

Inclusão de redes sociais (mediante envio da contratante)

Criação de artes personalizadas para postagens (mediante solicitação da contratante)

Criação de logotipo (mediante solicitação da contratante)

Criação de cartão digital interativo (mediante solicitação da contratante)

⚠️ Importante: Como se trata de prestação de serviços executados mediante aceite verbal, todos os serviços serão realizados antes da conclusão do pagamento. Ressaltamos que não é possível cancelar o serviço após sua execução, visto que os benefícios já terão sido entregues à empresa.

📑 Protocolo do atendimento: 2025150717
📞 Central de atendimento: 0800 580 2766^\n\n`,
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
    <div className="card-msg row align-items-start">
        <div className="row gx-3 gy-4">
          {mensagens.map((mensagem, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div className="card-mensagem-custom p-3 h-100 d-flex flex-column justify-content-between">
                <div>
                  <h5 className="bg-primary text-white text-center py-2">
                    {mensagem.titulo}
                  </h5>
                  <p>
                    {index === 3 ? (
                      <>
                        {mensagem.texto}
                        {clientData?.linkGoogle && (
                          <a
                            href={clientData.linkGoogle}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ wordBreak: "break-all" }}
                          >
                            {clientData.linkGoogle}
                          </a>
                        )}
                      </>
                    ) : (
                      mensagem.texto
                    )}
                  </p>
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
    </div>
  );
};
