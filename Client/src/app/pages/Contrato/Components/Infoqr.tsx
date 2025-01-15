import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase/firebaseConfig";
import { QRCodeSVG } from "qrcode.react";

export const Infoqr: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [clientData, setClientData] = useState<any>(null);

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
      }
    };

    fetchClientData();
  }, [id]);

  // Função para formatar a data no formato brasileiro
  const formatDateToBrazilian = (dateString: string) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 3); // Ajuste para o horário de Brasília, se necessário
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // meses começam do zero
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatValor = (value: string): string => {
    return value.replace(/\D/g, "").replace(/(\d)(\d{2})$/, "$1,$2");
  };
  return (
    clientData && (
      <div className="bonus card text-center mt-5">
        <h5 className="text-white ">GRAVAÇÃO</h5>
        <div className="form-group">
          <h6>
            <strong>
              ACEITE REALIZADO DE FORMA VERBAL; 
              <br />PARA VERIFICAR SUA ADESÃO CLIQUE
              NO BOTÃO A BAIXO OU ESCANEIE O QRCODE DA GRAVAÇÃO
            </strong>
          </h6>
        </div>
        <a
          href={clientData.linkGravacao}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="">
            <img
              src={require("../../../Assets/play.png")}
              alt="WhatsApp"
              style={{ width: "100px" }}
            />
          </div>
        </a>

        <div className="mb-2">
          {clientData.linkGravacao && (
            <div className="">
              <QRCodeSVG value={clientData.linkGravacao} size={90} />
            </div>
          )}
        </div>
      </div>
    )
  );
};
