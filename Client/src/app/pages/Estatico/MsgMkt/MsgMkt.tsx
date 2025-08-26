import React, { useEffect, useState } from "react";
import "../styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faLeftLong,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import axios from "axios";
import { db } from "../../../global/Config/firebase/firebaseConfig";
import { Certificado } from "../../../global/Components/Certificado/Certificado";
import {
  gerarMsgApresentacao,
  gerarMsgQr,
  gerarMsgSolicitacao,
} from "./msgMktApi";

export const MsgMkt: React.FC = () => {
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

  const sairFicha = () => window.history.back();

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

          <div className="col-md-4">
            <div className="card mb-4 p-4">
              <h2 className="text-center">Informações do Cliente</h2>
              <p>
                <strong>CNPJ:</strong> {clientData.cnpj}
              </p>
              <p>
                <strong>Razão Social:</strong> {clientData.razaoSocial}
              </p>
              <p>
                <strong>Nome Fantasia:</strong> {clientData.nomeFantasia}
              </p>
              <p>
                <strong>Operador:</strong> {clientData.operador}
              </p>
              <p>
                <strong>Telefone:</strong>{" "}
                {clientData.telefone || clientData.celular}
              </p>
              <p>
                <strong>Whatsapp:</strong> {clientData.whatsapp}
              </p>
              <p>
                <strong>Valor da Venda:</strong> {clientData.valorVenda}
              </p>
              <p>
                <strong>Vencimento:</strong> {clientData.dataVencimento}
              </p>
              <p>
                <strong>Observações:</strong> {clientData.observacoes}
              </p>

              <div className="btn-group mt-3">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    enviarMensagem(
                      "apresentacao",
                      gerarMsgApresentacao(clientData)
                    )
                  }
                >
                  <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                  Enviar Apresentação
                  <span className="ms-2">
                    {sentStatus.apresentacao ? "✅" : "❌"}
                  </span>
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      gerarMsgApresentacao(clientData)
                    )
                  }
                >
                  <FontAwesomeIcon icon={faCopy} className="me-2" />
                  Copiar
                </button>
              </div>

              {/* Solicitação */}
              <div className="btn-group mt-3">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    enviarMensagem(
                      "solicitacao",
                      gerarMsgSolicitacao(clientData)
                    )
                  }
                >
                  <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                  Enviar Solicitação
                  <span className="ms-2">
                    {sentStatus.solicitacao ? "✅" : "❌"}
                  </span>
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      gerarMsgSolicitacao(clientData)
                    )
                  }
                >
                  <FontAwesomeIcon icon={faCopy} className="me-2" />
                  Copiar
                </button>
              </div>

              {/* QR Code */}
              <div className="btn-group mt-3">
                <button
                  className="btn btn-primary"
                  onClick={() => enviarMensagem("qr", gerarMsgQr())}
                >
                  <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                  Enviar QR Code
                  <span className="ms-2">{sentStatus.qr ? "✅" : "❌"}</span>
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigator.clipboard.writeText(gerarMsgQr())}
                >
                  <FontAwesomeIcon icon={faCopy} className="me-2" />
                  Copiar
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-7">
            <Certificado />
          </div>
        </div>
      </div>
    )
  );
};
