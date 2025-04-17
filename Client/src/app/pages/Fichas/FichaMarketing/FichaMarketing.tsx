import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MarketingForm } from "./Components/MarketingForm";
import "./Styles/FichaMarketing.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import axios from "axios";
import { jsPDF } from "jspdf";

export const FichaMarketing: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [clientData, setClientData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        if (id) {
          const docRef = doc(db, "marketings", id);
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

  const handleMarketingSubmit = async (data: any) => {
    try {
      if (id) {
        const docRef = doc(db, "marketings", id);
        await updateDoc(docRef, data);
        setClientData(data);
        console.log("Dados atualizados com sucesso!");

        if (data.servicosConcluidos === true) {
          const posVendasRef = doc(db, "posVendas", id);
          const posVendasSnap = await getDoc(posVendasRef);

          if (!posVendasSnap.exists()) {
            // Se não existir, adiciona com o ID original
            await setDoc(posVendasRef, {
              ...data,
              dataAdicionado: new Date().toISOString(),
            });
            console.log("Cliente adicionado à coleção posVendas!");
          } else {
            // Se já existir, exibe confirmação e duplica com novo ID
            const confirmDuplicate = window.confirm(
              "Este cliente já está na coleção pós-vendas. Deseja criar uma cópia com novo ID?"
            );

            if (confirmDuplicate) {
              // Busca todas as cópias com prefixo id_copia
              const querySnapshot = await getDocs(
                query(
                  collection(db, "posVendas"),
                  where("__name__", ">=", `${id}_copia`),
                  where("__name__", "<", `${id}_copia~`)
                )
              );

              const copiaCount = querySnapshot.size;
              const newId = `${id}_copia${copiaCount + 1}`;

              await setDoc(doc(db, "posVendas", newId), {
                ...data,
                dataAdicionado: new Date().toISOString(),
                idOriginal: id,
              });

              console.log(`Cópia criada com ID: ${newId}`);
            } else {
              console.log("Nenhuma ação tomada.");
            }
          }
        }

        navigate("/marketing");
      }
    } catch (error) {
      console.error("Erro ao atualizar os dados de marketing: ", error);
    }
  };

  const sairFicha = () => {
    window.history.back();
  };

  const formatValor = (value: string | number | undefined): string => {
    if (!value) return "0,00"; // Retorna um valor padrão caso seja undefined ou null
    const num =
      typeof value === "number" ? value.toFixed(2) : value.replace(/\D/g, "");
    return num.replace(/(\d)(\d{2})$/, "$1,$2");
  };

  const formatDateToBrazilian = (dateString: string) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 3); // Ajuste para o horário de Brasília
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // meses começam do zero
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

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
            <div className="col-md-3">
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
              </div>
            </div>
            <div className="col-md-9">
              <MarketingForm
                form={clientData}
                onSubmit={handleMarketingSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};
