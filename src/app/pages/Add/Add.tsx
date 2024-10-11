// Add.tsx
import React, { useState } from "react";
import { Operador } from "./Components/Operador";
import { DadosEmpresa } from "./Components/Empresa";
import { Navigate } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "./Components/Styles/add.css";
import { useAuth } from "../../context/AuthContext";

export const Add = () => {
  const { nome } = useAuth();
  const [form, setForm] = useState({
    numeroContrato: '',
    data: '',
    dataVencimento: '',
    operador: nome,
    equipe: 'G MARKETING DIGITAL',
    razaoSocial: '',
    cpf: '',
    cnpj: '',
    nomeFantasia: '',
    enderecoComercial: '',
    bairro: '',
    cep: '',
    estado: '',
    cidade: '',
    validade: '',
    observacoes: '',
    fixo: '',
    celular: '',
    whatsapp: '',
    email1: '',
    email2: '',
    horarioFuncionamento: '',
    responsavel: '',
    cargo: '',
    valorVenda: '',
    contrato: '', 
    parcelas: '',
    formaPagamento: '',
    opcao1: false,
    opcao2: false,
    opcao3: false,
    opcao4: false,
  });


  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tipoDocumento, setTipoDocumento] = useState('CPF');
  const [isRotated, setIsRotated] = useState(false);
  const [redirect, setRedirect] = useState(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleDocumento = () => {
    setTipoDocumento((prev) => (prev === 'CPF' ? 'CNPJ' : 'CPF'));
    setIsRotated((prev) => !prev);
  };


  const handleSelectChange = (selectedOption: any) => {
    setForm({ ...form, operador: selectedOption.value });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await addDoc(collection(db, "clientes"), form);
      alert("Cliente adicionado com sucesso!");
      setRedirect(true);
    } catch (error) {
      console.error("Erro ao adicionar cliente: ", error);
      setError("Ocorreu um erro ao adicionar o cliente.");
    } finally {
      setLoading(false);
    }
  };

  if(redirect){
    return <Navigate to={"/dashboard"} />
  }

  return (
    <div className="contrato text-center">
      <div className="container">
        <h2 className="title-contrato">Adicionar Informações do Cliente</h2>
        <form onSubmit={handleSubmit}>
        {step === 0 && (
        <Operador
          form={form}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          operadoresOpcoes={[]}
        />
      )}
      {step === 1 && (
        <DadosEmpresa
          form={form}
          handleInputChange={handleInputChange}
          tipoDocumento={tipoDocumento}
          handleToggleDocumento={handleToggleDocumento}
          isRotated={isRotated}
        />
      )}

          <div className="mt-4">
            {step === 0 && (
              <button
                type="button"
                className="btn btn-danger me-2"
                onClick={sairFicha}
              >
                Sair
              </button>
            )}
            {step > 0 && (
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={handleBack}
              >
                Voltar
              </button>
            )}

            {step < 2 ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNext}
              >
                Próximo
              </button>
            ) : (
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? "Salvando..." : "Salvar"}
              </button> 
            )}

            {error && <p className="text-danger mt-3">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};
