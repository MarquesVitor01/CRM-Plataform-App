import React, { useEffect, useState } from "react";

import { EditOperador } from "./Components/EditOperador";
import "../Add/Components/Styles/add.css";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { EditEmpresa } from "./Components/EditEmpresa";
import { EditInfoAdicionais } from "./Components/EditInfoAdicionais";

interface ClientData {
  numeroContrato: string;
  valorVenda: string;
  validade: string;
  formaPagamento: string;
  data: string;
  operador: string;
  equipe: string;
  contrato: string;
  razaoSocial: string,
  cpf: string,
  cnpj: string,
  nomeFantasia: string,
  enderecoComercial: string,
  bairro: string,
  cep: string,
  estado: string,
  cidade: string,
  observacoes: string,
  fixo: string,
  celular: string,
  whatsapp: string,
  email1: string,
  email2: string,
  horarioFuncionamento: string,
  responsavel: string,
  cargo: string,
  parcelas: string,
}

export const EditContrato = () => {
  const { id } = useParams<{ id: string }>();
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        if (id) {
          const docRef = doc(db, "clientes", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setClientData(docSnap.data() as ClientData);
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setClientData((prevData) => {
      if (prevData) {
        const updatedData: ClientData = { ...prevData, [name]: value };
        console.log("Dados do cliente atualizados: ", updatedData);
        return updatedData;
      }
      return prevData;
    });
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const sairFicha = () => {
    window.history.back();
  };

  const updateClientData = async () => {
    if (id && clientData) {
      try {
        const docRef = doc(db, "clientes", id);
        await setDoc(docRef, clientData, { merge: true });
        console.log("Dados do cliente atualizados com sucesso!");
        navigate('/dashboard');
      } catch (error) {
        console.error("Erro ao atualizar os dados do cliente: ", error);
      }
    } else {
      console.log("ID ou clientData não disponível.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateClientData();
  };

  return (
    <div>
      <div className="contrato text-center">
        <div className="container">
          <h2 className="title-contrato">Editar Informações do Cliente</h2>
          <form onSubmit={handleSubmit}>
            {step === 0 && (
              <EditOperador
                form={clientData}
                handleInputChange={handleInputChange}
              />
            )}
            {step === 1 && (
              <EditEmpresa
                form={clientData}
                handleInputChange={handleInputChange} />
            )}
            {step === 2 && (
              <EditInfoAdicionais
                form={clientData}
                handleInputChange={handleInputChange}
              />
            )}
            <div className="mt-4 d-flex gap-4 justify-content-center">
              {step === 0 && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={sairFicha}
                >
                  Sair
                </button>
              )}
              {step > 0 && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleBack}
                >
                  Voltar
                </button>
              )}
              {step < 2 && (
                <button
                type="button"
                className="btn btn-primary"
                onClick={handleNext}
              >
                Próximo
              </button>
              )}
              {step < 3 && (
                <button
                type="submit"
                className="btn btn-success btn-salvar"
                onClick={updateClientData}
              >
                Salvar
              </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
