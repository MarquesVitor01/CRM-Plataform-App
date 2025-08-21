import React, { useEffect, useState } from "react";
import "../styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import axios from "axios";
import { db } from "../../../global/Config/firebase/firebaseConfig";
import { Certificado } from "../../../global/Components/Certificado/Certificado";

export const MsgMkt: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [clientData, setClientData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // status de mensagens enviadas
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

  const sairFicha = () => window.history.back();

  // função genérica para envio de mensagem
  const enviarMensagem = async (
    tipo: "apresentacao" | "solicitacao" | "qr",
    message: string
  ) => {
    try {
      const celularComCodigo = `55${clientData.celular.replace(/^55/, "")}`;

      const response = await axios.post(
        "https://crm-plataform-app-6t3u.vercel.app/api/enviar-texto-mkt",
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

  return (
    clientData && (
      <div className="fichaMarketing">
        <div className="container container-mtkservice">
          <button
            className="btn btn-danger btn-sair-marketing"
            onClick={sairFicha}
          >
            <FontAwesomeIcon icon={faLeftLong} />
          </button>

          {/* Info Cliente */}
          <div className="col-md-4">
            <div className="card mb-4 p-4">
              <h2 className="text-center">Informações do Cliente</h2>
              <p><strong>CNPJ:</strong> {clientData.cnpj}</p>
              <p><strong>Razão Social:</strong> {clientData.razaoSocial}</p>
              <p><strong>Nome Fantasia:</strong> {clientData.nomeFantasia}</p>
              <p><strong>Operador:</strong> {clientData.operador}</p>
              <p><strong>Telefone:</strong> {clientData.telefone || clientData.celular}</p>
              <p><strong>Whatsapp:</strong> {clientData.whatsapp}</p>
              <p><strong>Valor da Venda:</strong> {clientData.valorVenda}</p>
              <p><strong>Vencimento:</strong> {clientData.dataVencimento}</p>
              <p><strong>Observações:</strong> {clientData.observacoes}</p>

              {/* Botões */}
              <button
                className="btn btn-primary mt-3 d-flex justify-content-between align-items-center"
                onClick={() =>
                  enviarMensagem(
                    "apresentacao",
                    `Olá, ${clientData?.responsavel} EU me chamo (NOME DO ATENDENTE DO MARKETING)
Vou seguir com seu atendimento ok!`
                  )
                }
              >
                Enviar Apresentação
                <span className="ms-2">
                  {sentStatus.apresentacao ? "✅" : "❌"}
                </span>
              </button>

              <button
                className="btn btn-primary mt-3 d-flex justify-content-between align-items-center"
                onClick={() =>
                  enviarMensagem(
                    "solicitacao",
                    `Lembre-se: durante todo o seu plano ${clientData?.validade}, você pode solicitar as atualizações em sua página! 
Nos envie até 30 fotos e 5 vídeos (máx. 30s) por mês para adicionarmos ao seu perfil. Isso ajuda a aumentar seu desempenho e visibilidade no Google!`
                  )
                }
              >
                Enviar Solicitação
                <span className="ms-2">
                  {sentStatus.solicitacao ? "✅" : "❌"}
                </span>
              </button>

              <button
                className="btn btn-primary mt-3 d-flex justify-content-between align-items-center"
                onClick={() =>
                  enviarMensagem(
                    "qr",
                    `Agora vou enviar o seu QR-CODE. Você pode:
- Imprimir e colar no balcão da loja
- Usar no cartão digital
- Mandar por WhatsApp para clientes após o atendimento  

Quanto mais avaliações ⭐⭐⭐⭐⭐, mais destaque sua empresa ganha no Google!`
                  )
                }
              >
                Enviar QR Code
                <span className="ms-2">{sentStatus.qr ? "✅" : "❌"}</span>
              </button>
            </div>
          </div>

          {/* Certificado */}
          <div className="col-md-7">
            <Certificado />
          </div>
        </div>
      </div>
    )
  );
};
