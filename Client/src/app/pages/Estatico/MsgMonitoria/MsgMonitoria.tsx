import React, { useEffect, useState } from "react";
import "../styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../global/Config/firebase/firebaseConfig";
import axios from "axios";
import { useUserData } from "../../../global/hooks/useUserData";
import {
  gerarMsgParcela,
  gerarMsgRecorrencia,
  gerarMsgValorCheio,
} from "./msgMonitoriaApi";

export const MsgMonitoria: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [clientData, setClientData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { userData } = useUserData();

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
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [id]);

  const sairFicha = () => {
    window.history.back();
  };

  const MsgParcela = async () => {
    try {
      const celularComCodigo = `55${clientData.celular.replace(/^55/, "")}`;

      const response = await axios.post(
        "https://crm-plataform-app-6t3u.vercel.app/api/enviar-texto",
        {
          phone: celularComCodigo,
          message: gerarMsgParcela(clientData),
          equipeMsg: userData.equipe_msg,
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

  const MsgValorCheio = async () => {
    try {
      const celularComCodigo = `55${clientData.celular.replace(/^55/, "")}`;

      const response = await axios.post(
        "https://crm-plataform-app-6t3u.vercel.app/api/enviar-texto",
        {
          phone: celularComCodigo,
          message: gerarMsgValorCheio(clientData),
          equipeMsg: userData.equipe_msg,
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

  const MsgRecorrencia = async () => {
    try {
      const celularComCodigo = `55${clientData.celular.replace(/^55/, "")}`;

      const response = await axios.post(
        "https://crm-plataform-app-6t3u.vercel.app/api/enviar-texto",
        {
          phone: celularComCodigo,
          message: gerarMsgRecorrencia(clientData),
          equipeMsg: userData.equipe_msg,
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

  // const MsgLink = async () => {
  //   try {
  //     const celularComCodigo = `55${clientData.celular.replace(/^55/, "")}`;

  //     const response = await axios.post(
  //       "https://crm-plataform-app-6t3u.vercel.app/api/enviar-texto",
  //       {
  //         phone: celularComCodigo,
  //         message: `https://youtube.com/shorts/_EgS6OVUgEA`,
  //       }
  //     );

  //     if (response.data.success) {
  //       alert("Mensagem enviada com sucesso!");
  //     } else {
  //       alert("Falha ao enviar a mensagem.");
  //     }
  //   } catch (error) {
  //     console.error("Erro ao enviar mensagem:", error);
  //     alert("Ocorreu um erro ao enviar a mensagem.");
  //   }
  // };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    clientData && (
      <div className="fichaMarketing">
        <div className="container">
          <button
            className="btn btn-danger btn-sair-marketing"
            onClick={sairFicha}
          >
            <FontAwesomeIcon icon={faLeftLong} />
          </button>
          <div className="row">
            <div className="col-md-12">
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
                {clientData.parcelas >= 2 && (
                  <div className="mt-3 d-flex gap-2">
                    <button className="btn btn-primary" onClick={MsgParcela}>
                      Enviar Mensagem De Apresentação de Vendas Parceladas
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          gerarMsgParcela(clientData)
                        )
                      }
                    >
                      Copiar Mensagem
                    </button>
                  </div>
                )}
                {clientData.contrato !== "Recorencia" &&
                  clientData.parcelas <= 1 && (
                    <div className="mt-3 d-flex gap-2">
                      <button
                        className="btn btn-primary"
                        onClick={MsgValorCheio}
                      >
                        Enviar Mensagem De Apresentação de Vendas Sem Parcelas
                      </button>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          navigator.clipboard.writeText(
                            gerarMsgValorCheio(clientData)
                          )
                        }
                      >
                        Copiar Mensagem
                      </button>
                    </div>
                  )}
                {clientData.contrato === "Recorencia" &&
                  clientData.parcelas <= 1 && (
                    <>
                      <button
                        className="btn btn-primary mt-3"
                        onClick={MsgRecorrencia}
                      >
                        Enviar Mensagem Recorrência
                      </button>
                      <button
                        className="btn btn-outline-secondary mt-3 ms-2"
                        onClick={() =>
                          navigator.clipboard.writeText(
                            gerarMsgRecorrencia(clientData)
                          )
                        }
                      >
                        Copiar Mensagem
                      </button>
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
