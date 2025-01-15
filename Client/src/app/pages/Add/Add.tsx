import React, { useState } from "react";
import { Operador } from "./Components/Operador";
import { DadosEmpresa } from "./Components/Empresa";
import { Navigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebaseConfig";
import {
  runTransaction,
  doc,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Components/Styles/add.css";
import { useAuth } from "../../context/AuthContext";
import { InfoAdicionais } from "./Components/InfoAdicionais";
import { Button, Modal } from "react-bootstrap";

export const Add = () => {
  const userId = auth.currentUser?.uid;
  const { nome, cargo } = useAuth();
  const [form, setForm] = useState({
    numeroContrato: "",
    data: "",
    dataVencimento: "",
    operador: nome,
    createdBy: userId,
    setor: cargo,
    equipe: "G MARKETING DIGITAL",
    account: "",
    razaoSocial: "",
    cpf: "",
    cnpj: "",
    nomeFantasia: "",
    enderecoComercial: "",
    bairro: "",
    cep: "",
    estado: "",
    cidade: "",
    validade: "",
    observacoes: "",
    fixo: "",
    celular: "",
    whatsapp: "",
    email1: "",
    email2: "",
    horarioFuncionamento: "",
    responsavel: "",
    cargo: "",
    valorVenda: "",
    parcelas: "1",
    valorParcelado: "",
    contrato: "",
    formaPagamento: "",
    qrcodeText: "",
    renovacaoAutomatica: "",
    linkGoogle: "",
    criacao: "",
    ctdigital: "",
    logotipo: "",
    anuncio: "",
    grupo: "",
  });

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tipoDocumento, setTipoDocumento] = useState("CPF");
  const [redirect, setRedirect] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [novoId, setNovoId] = useState<string | null>(null);

  const [senha, setSenha] = useState("");
  const [senhaCorreta, setSenhaCorreta] = useState("068543"); 
  const [erroSenha, setErroSenha] = useState("");

  const handleSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(e.target.value);
    setErroSenha(""); 
  };

  const handleSaveWithPassword = async () => {
    if (senha === senhaCorreta) {
      if (novoId) {
        const novoClienteRef = doc(db, "vendas", novoId);
        await setDoc(novoClienteRef, form);
        toast.success("Cliente salvo com um novo ID!");
        handleModalClose();
        setRedirect(true);
      }
    } else {
      setErroSenha("Senha incorreta. Entre em contato com seu supervisor");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const updatedForm = { ...prev, [name]: value };

      if (name === "valorVenda" || name === "parcelas") {
        const valorVenda = parseFloat(
          name === "valorVenda" ? value : prev.valorVenda || "0"
        );
        const parcelas = parseInt(
          name === "parcelas" ? value : prev.parcelas || "1"
        );

        if (!isNaN(valorVenda) && parcelas > 0) {
          if (parcelas === 1) {
            updatedForm.valorParcelado = Math.round(valorVenda).toString();
          } else {
            updatedForm.valorParcelado = Math.round(
              valorVenda / parcelas
            ).toString();
          }
        }
      }
      if (name === "email1" || name === "email2") {
        updatedForm[name] = value.replace(/\s+/g, "");
      }

      if (name === "celular" || name === "whatsapp") {
        updatedForm[name] = value.replace(/\D/g, "").slice(0, 13);
      }

      if (name === "fixo") {
        updatedForm[name] = value.replace(/\D/g, "").slice(0, 10);
      }

      if ((name === "cpf" || name === "cnpj") && value.length >= 6) {
        updatedForm.numeroContrato = value.slice(0, 6);
      }

      return updatedForm;
    });
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

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const clienteRef = doc(db, "vendas", form.numeroContrato);
      const docSnap = await getDoc(clienteRef);

      if (docSnap.exists()) {
        setNovoId(`${form.numeroContrato}_${Date.now()}`); 
        handleModalShow(); 
      } else {
        await setDoc(clienteRef, form);
        toast.success("Cliente salvo com sucesso!");
        setRedirect(true);
      }
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
      setError("Erro ao salvar cliente. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (redirect) {
    return <Navigate to={"/vendas"} />;
  }

  return (
    <div className="contrato text-center">
      {loading && <p>Aguarde, estamos processando...</p>}
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
            />
          )}
          {step === 2 && (
            <InfoAdicionais form={form} handleInputChange={handleInputChange} />
          )}

          <div className="mt-4">
            {step >= 0 && (
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

            {step < 2 && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNext}
              >
                Próximo
              </button>
            )}
            {step === 2 && (
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Salvando..." : "Salvar"}
              </button>
            )}
          </div>
        </form>
        <ToastContainer />
      </div>
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            O número de contrato <strong>{form.numeroContrato}</strong> já
            existe. Para salvar com um novo ID, confirme sua senha abaixo:
          </p>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={handleSenhaChange}
            className="form-control mt-3"
          />
          {erroSenha && <p className="text-danger mt-2">{erroSenha}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveWithPassword}>
            Confirmar e Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
