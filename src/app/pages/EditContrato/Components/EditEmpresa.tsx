import { faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

interface ClientData {
  razaoSocial: string;
  cpf: string;
  cnpj: string;
  nomeFantasia: string;
  enderecoComercial: string;
  bairro: string;
  cep: string;
  estado: string;
  cidade: string;
  observacoes: string;
  fixo: string;
  celular: string;
  whatsapp: string;
  email1: string;
  email2: string;
  horarioFuncionamento: string;
  responsavel: string;
  cargo: string;
}
interface EditEmpresaFormProps {
  form: ClientData | null; 
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export const EditEmpresa: React.FC<EditEmpresaFormProps> = ({ form, handleInputChange }) => {
  const [tipoDocumento, setTipoDocumento] = useState<"CPF" | "CNPJ">("CPF");
  const [isRotated, setIsRotated] = useState(false);

  const handleToggleDocumento = () => {
    setTipoDocumento((prev) => (prev === 'CPF' ? 'CNPJ' : 'CPF'));
    setIsRotated(!isRotated);
  };

  
  if (!form) return null;
  return (
    <div className="row d-flex justify-content-center">
      <h4 className="text-white">Dados da Empresa</h4>
      <div className="form-group mb-3 col-md-4">
        <label htmlFor="razaoSocial">Razão Social</label>
        <input
          type="text"
          className="form-control"
          id="razaoSocial"
          name="razaoSocial"
          value={form.razaoSocial}
          onChange={handleInputChange}
          placeholder="Insira a razão social"
        />
      </div>
      <div className="form-group mb-3 col-md-4">
        <label htmlFor="documento">{tipoDocumento}</label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="documento"
            name={tipoDocumento === "CPF" ? "cpf" : "cnpj"}
            value={form[tipoDocumento === "CPF" ? "cpf" : "cnpj"]}
            onChange={handleInputChange}
            placeholder={`Insira o ${tipoDocumento}`}
          />
          <button
            type="button"
            className="btn btn-outline-secondary bg-white"
            onClick={handleToggleDocumento}
          >
            <FontAwesomeIcon
              icon={faSync}
              className={`icon-troca ${isRotated ? 'rotated' : ''} text-dark`}
            />
          </button>
        </div>
      </div>
      <div className="form-group mb-3 col-md-4">
        <label htmlFor="nomeFantasia">Nome Fantasia</label>
        <input
          type="text"
          className="form-control"
          id="nomeFantasia"
          name="nomeFantasia"
          value={form.nomeFantasia}
          onChange={handleInputChange}
          placeholder="Insira o nome fantasia"
        />
      </div>
      <div className="form-group mb-3 col-md-4">
        <label htmlFor="enderecoComercial">Endereço Comercial</label>
        <input
          type="text"
          className="form-control"
          id="enderecoComercial"
          name="enderecoComercial"
          value={form.enderecoComercial}
          onChange={handleInputChange}
          placeholder="Insira o endereço comercial"
        />
      </div>
      <div className="form-group mb-3 col-md-4">
        <label htmlFor="bairro">Bairro</label>
        <input
          type="text"
          className="form-control"
          id="bairro"
          name="bairro"
          value={form.bairro}
          onChange={handleInputChange}
          placeholder="Insira o bairro"
        />
      </div>
      <div className="form-group mb-3 col-md-4">
        <label htmlFor="cep">CEP</label>
        <input
          type="text"
          className="form-control"
          id="cep"
          name="cep"
          value={form.cep}
          onChange={handleInputChange}
          placeholder="Insira o CEP"
        />
      </div>
      <div className="form-group mb-3 col-md-4">
        <label htmlFor="estado">Estado</label>
        <input
          type="text"
          className="form-control"
          id="estado"
          name="estado"
          value={form.estado}
          onChange={handleInputChange}
          placeholder="Insira o estado"
        />
      </div>
      <div className="form-group mb-3 col-md-4">
        <label htmlFor="cidade">Cidade</label>
        <input
          type="text"
          className="form-control"
          id="cidade"
          name="cidade"
          value={form.cidade}
          onChange={handleInputChange}
          placeholder="Insira a cidade"
        />
      </div>
      <div className="form-group mb-3 col-md-4">
        <label htmlFor="fixo">Telefone Fixo</label>
        <input
          type="text"
          className="form-control"
          id="fixo"
          name="fixo"
          value={form.fixo}
          onChange={handleInputChange}
          placeholder="Insira o telefone fixo"
        />
      </div>
      <div className="form-group mb-3 col-md-4">
        <label htmlFor="celular">Celular</label>
        <input
          type="text"
          className="form-control"
          id="celular"
          name="celular"
          value={form.celular}
          onChange={handleInputChange}
          placeholder="Insira o celular"
        />
      </div>
      <div className="form-group mb-3 col-md-4">
        <label htmlFor="whatsapp">Whatsapp Comercial</label>
        <input
          type="text"
          className="form-control"
          id="whatsapp"
          name="whatsapp"
          value={form.whatsapp}
          onChange={handleInputChange}
          placeholder="Insira o whatsapp comercial"
        />
      </div>
      <div className="form-group mb-3 col-md-4">
        <label htmlFor="email1">1º E-mail</label>
        <input
          type="text"
          className="form-control"
          id="email1"
          name="email1"
          value={form.email1}
          onChange={handleInputChange}
          placeholder="Insira o primeiro e-mail"
        />
      </div>
      <div className="form-group mb-3 col-md-4">
        <label htmlFor="email2">2º E-mail</label>
        <input
          type="text"
          className="form-control"
          id="email2"
          name="email2"
          value={form.email2}
          onChange={handleInputChange}
          placeholder="Insira o segundo e-mail"
        />
      </div>
      <div className="form-group mb-3 col-md-4">
        <label htmlFor="horarioFuncionamento">Horário de Funcionamento</label>
        <input
          type="text"
          className="form-control"
          id="horarioFuncionamento"
          name="horarioFuncionamento"
          value={form.horarioFuncionamento}
          onChange={handleInputChange}
          placeholder="Insira o horário de funcionamento"
        />
      </div>
      <div className="form-group mb-3 col-md-4">
        <label htmlFor="responsavel">Nome do Responsável</label>
        <input
          type="text"
          className="form-control"
          id="responsavel"
          name="responsavel"
          value={form.responsavel}
          onChange={handleInputChange}
          placeholder="Insira o nome do responsável"
        />
      </div>
      <div className="form-group mb-3 col-md-4">
        <label htmlFor="cargo">Cargo</label>
        <input
          type="text"
          className="form-control"
          id="cargo"
          name="cargo"
          value={form.cargo}
          onChange={handleInputChange}
          placeholder="Insira o cargo"
        />
      </div>
    </div>
  );
};
