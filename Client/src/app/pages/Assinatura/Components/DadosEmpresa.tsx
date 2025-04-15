import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebaseConfig";
import { useParams } from "react-router-dom";

export const DadosEmpresa: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [clientData, setClientData] = useState<any>(null);

  const formatCNPJ = (value: string): string => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
      .replace(/(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, "$1.$2.$3/$4-$5")
      .substring(0, 18);
  };

  const formatCPF = (value: string): string => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4")
      .substring(0, 14);
  };

  const formatCelular = (value: string): string => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{5})$/, "$1-$2")
      .substring(0, 15);
  };

  const formatFixo = (value: string): string => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/^(\(\d{2}\)) (\d{4})(\d)/, "$1 $2-$3")
      .substring(0, 14);
  };

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
        <h5 className="text-center font-weight-bold">
          AUTORIZAÇÃO PARA DIVULGAÇÃO DAS FOTOS E VIDEOS E ASSESSORIA <br /> EM
          MARKETING DIGITAL REALIZADA PELA EMPRESA <br /> G MAPS CONTACT CENTER LTDA -
          CNPJ: 40.407.753/0001-30
        </h5>
        <div className="info-assinatura">
          <div className="col-md-6 mb-1">
            <p>
              <strong>NOME FANTASIA:</strong> {clientData.nomeFantasia}
            </p>
            <p>
              <strong>CNPJ/CPF:</strong>{" "}
              {clientData.cnpj
                ? formatCNPJ(clientData.cnpj)
                : clientData.cpf
                ? formatCPF(clientData.cpf)
                : ""}
            </p>
            <p>
              <strong>CEP:</strong> {clientData.cep}
            </p>
            <div className="">
              <p>
                <strong>NOME DO RESPONSÁVEL:</strong> {clientData.responsavel}
              </p>
            </div>
            <div className="">
              <p>
                <strong>CARGO:</strong> {clientData.cargo}
              </p>
            </div>
            <p>
              <strong>TELEFONE:</strong>{" "}
              {clientData.fixo ? formatFixo(clientData.fixo) : ""}
            </p>
            <p>
              <strong>CELULAR:</strong>{" "}
              {clientData.celular ? formatCelular(clientData.celular) : ""}
            </p>
          </div>
        </div>
      </div>
    )
  );
};
