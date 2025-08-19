import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../../global/Config/firebase/firebaseConfig";
import { useParams } from "react-router-dom";
import { formatCelular, formatCNPJ, formatCPF } from "../../../../global/utils/formatters";

export const DadosEmpresa: React.FC = () => {
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

  return (
    clientData && (
      <div className="dados-empresa p-4 my-1 upper">
        <h6 className="text-center">
          AUTORIZAÇÃO PARA DIVULGAÇÃO DAS FOTOS E VIDEOS E ASSESSORIA <br /> EM
          MARKETING DIGITAL REALIZADA PELA EMPRESA <br /> G MAPS CONTACT CENTER
          LTDA - CNPJ: 40.407.753/0001-30
        </h6>
        <div className="info-assinatura pt-3">
          <span>
            <strong>DATA DA ADESÃO:</strong>{" "}
            {new Date(clientData.data + "T00:00:00").toLocaleDateString(
              "pt-BR"
            )}
          </span>
          <span>
            <strong>EU: </strong>
            <span>{clientData.responsavel}</span>
          </span>
          <span>
            <strong>RESPONSÁVEL PELA EMPRESA:</strong> {clientData.nomeFantasia}
          </span>
          <span>
            {clientData.cnpj ? (
              <>
                <strong>CNPJ: </strong>
                <span>{formatCNPJ(clientData.cnpj)}</span>
              </>
            ) : (
              <>
                <strong>CPF: </strong>
                <span>{formatCPF(clientData.cpf)}</span>
              </>
            )}
          </span>

          <span>
            <strong>TELEFONE:</strong> {formatCelular(clientData.celular)}
          </span>
          <span>
            <strong>CARGO:</strong> {clientData.cargo}
          </span>
          <span>
            <strong>E-MAIL:</strong> {clientData.email1}
          </span>
          <small>
            ESCANEIE O QRCODE PARA VERIFICAR E CONFERIR A PÁGINA OU CLIQUE NO
            LINK.
          </small>
        </div>
      </div>
    )
  );
};
