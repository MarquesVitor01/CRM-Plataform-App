import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../global/Config/firebase/firebaseConfig";
import axios from "axios";
import {
  formatarCentavosParaReais,
  formatarDataParaBR,
  formatarNomeOperador,
} from "../../../../global/utils/formatters";
import { Boleto } from "./Boleto";
import SendEmailBrevo from "./sendEmailBrevo";

interface InfoConfirmacao {
  monitoriaConcluidaYes: boolean;
  monitoriaConcluidaNo: boolean;
  observacaoYes: boolean;
  nomeMonitor: string;
  // qrcodeText: string;
  linkGravacao: string;
  imagemUrl?: string;
}

interface InfoConfirmacaoProps {
  form: InfoConfirmacao | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const questions = [
  {
    label: "Confirma que realizou a auditoria?",
    yesId: "monitoriaConcluidaYes",
    noId: "monitoriaConcluidaNo",
    yesChecked: (form: InfoConfirmacao) => form.monitoriaConcluidaYes,
    noChecked: (form: InfoConfirmacao) => form.monitoriaConcluidaNo,
  },
  // {
  //   label: "A venda precisa ser refeita ou tem muitos problemas?",
  //   yesId: "observacaoYes",
  //   noId: "observacaoNo",
  //   yesChecked: (form: InfoConfirmacao) => form.observacaoYes,
  // },
];

export const FichaMonitoriaConfirmacao: React.FC<InfoConfirmacaoProps> = ({
  form,
  handleInputChange,
  handleImageUpload,
}) => {
  const { id } = useParams<{ id: string }>();
  const [clientData, setClientData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [sentStatus, setSentStatus] = useState({
    apresentacao: false,
    solicitacao: false,
    qr: false,
  });

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        if (id) {
          const docRef = doc(db, "vendas", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setClientData(docSnap.data());
          } else {
            console.log("Cliente não encontrado");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados do cliente: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [id]);

  const enviarMensagem = async (tipo: "apresentacao", message: string) => {
    try {
      const celularComCodigo = `55${clientData.celular.replace(/^55/, "")}`;

      const response = await axios.post(
        "https://crm-plataform-app-6t3u.vercel.app/api/enviar-texto",
        {
          phone: celularComCodigo,
          message,
        }
      );

      if (response.data.success) {
        alert("Mensagem enviada com sucesso!");
        setSentStatus((prev) => ({ ...prev, [tipo]: true }));
      } else {
        alert("Falha ao enviar a mensagem.");
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      alert("Ocorreu um erro ao enviar a mensagem.");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!form) return null;

  return (
    <div className="col-md-6 auditoria-bg">
      <h3 className="text-center">Auditoria</h3>
      <div className="row monitoria">
        {questions.map(({ label, yesId, noId, yesChecked, noChecked }) => (
          <div className="col-md-6 box-quest" key={yesId}>
            <label>{label}</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={yesId}
                checked={yesChecked(form)}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor={yesId}>
                Sim
              </label>
            </div>
          </div>
        ))}
        <div className="col-md-6 box-quest">
          <label>Informe seu nome:</label>
          <input
            className="form-control"
            id="nomeMonitor"
            name="nomeMonitor"
            value={form.nomeMonitor}
            onChange={handleInputChange}
            placeholder="Digite seu nome aqui"
          />
        </div>
        <div className="col-md-6 box-quest">
          <label>Informe o Link da Gravação:</label>
          <input
            className="form-control"
            id="linkGravacao"
            name="linkGravacao"
            value={form.linkGravacao}
            onChange={handleInputChange}
            placeholder="Insira o link da gravação"
          />
        </div>
        <div className="col-md-6">
          <button
            className="btn btn-primary mt-3 d-flex justify-content-between align-items-center"
            onClick={() =>
              enviarMensagem(
                "apresentacao",
                `Olá *${
                  clientData?.responsavel || "[NOME DO RESPONSÁVEL]"
                }*, eu me chamo *${
                  formatarNomeOperador(clientData?.operador) ||
                  "[NOME OPERADOR]"
                }* e será um prazer ajudar a melhorar a sua página no Google Maps! 🚀
                
                Conforme conversamos, o plano escolhido foi o *${
                  clientData?.validade || "[TIPO DE PLANO]"
                }*, no valor de *R$ ${
                  formatarCentavosParaReais(clientData?.valorVenda) ||
                  "[VALOR DA VENDA]"
                }* com vencimento para o dia *${
                  formatarDataParaBR(clientData?.dataVencimento) ||
                  "[DATA DE VENCIMENTO]"
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
                📞 Central de atendimento: 0800 580 2766^\n\n`
              )
            }
          >
            Enviar Apresentação
            <span className="ms-2">
              {sentStatus.apresentacao ? "✅" : "❌"}
            </span>
          </button>
          <Boleto />
          <div className="col-md-6">
            <SendEmailBrevo to={clientData.email1} clientData={clientData} />
          </div>
        </div>
      </div>
    </div>
  );
};
