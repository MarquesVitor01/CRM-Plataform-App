// Operador.tsx
import React from "react";
import Select from "react-select";

interface OperadorProps {
  form: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const operadoresOpcoes = [
  { value: 'Operador 1', label: 'Operador 1' },
  { value: 'Operador 2', label: 'Operador 2' },
  { value: 'Operador 3', label: 'Operador 3' },
];

export const Operador: React.FC<OperadorProps> = ({ form, handleInputChange }) => {
  const handleSelectChange = (selectedOption: any) => {
    if (selectedOption) {
      handleInputChange({
        target: {
          name: "operador",
          value: selectedOption.value,
        } as HTMLInputElement 
      } as React.ChangeEvent<HTMLInputElement>); 
    } else {
      handleInputChange({
        target: {
          name: "operador",
          value: "",
        } as HTMLInputElement 
      } as React.ChangeEvent<HTMLInputElement>); 
    }
  };

  return (
    <div className="row d-flex justify-content-center">
      <h4 className="text-white">Informações do Contrato</h4>

      <div className="form-group mb-3 col-md-4">
        <label htmlFor="numeroContrato">Contrato Nº</label>
        <input
          type="text"
          className="form-control"
          id="numeroContrato"
          name="numeroContrato"
          value={form.numeroContrato}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group mb-3 col-md-4">
        <label htmlFor="valorVenda">Valor da Venda</label>
        <input
          type="text"
          className="form-control"
          id="valorVenda"
          name="valorVenda"
          value={form.numeroContrato}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group mb-3 col-md-4">
        <label htmlFor="validade">Parcelas</label>
        <select
          className="form-control"
          id="validade"
          name="validade"
          value={form.validade}
          onChange={handleInputChange}
        >
          <option value="">Selecione uma opção</option>
          <option value="Cancelamento">1</option>
          <option value="1 Mês">2</option>
          <option value="3 Meses">3</option>
          <option value="6 Meses">4</option>
          <option value="1 Ano">5</option>
          <option value="Cancelamento">6</option>
          <option value="1 Mês">7</option>
          <option value="3 Meses">8</option>
          <option value="6 Meses">9</option>
          <option value="1 Ano">10</option>
          <option value="6 Meses">11</option>
          <option value="1 Ano">12</option>
        </select>
      </div>

      <div className="form-group mb-3 col-md-4">
        <label htmlFor="data">Data (dd/mm/aaaa)</label>
        <input
          type="date"
          className="form-control"
          id="data"
          name="data"
          value={form.data}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group mb-3 col-md-4">
        <label htmlFor="data">Data do Vencimento (dd/mm/aaaa)</label>
        <input
          type="date"
          className="form-control"
          id="data"
          name="data"
          value={form.data}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group mb-3 col-md-4">
        <label htmlFor="operador">Operador</label>
        <Select
          id="operador"
          name="operador"
          options={operadoresOpcoes}
          onChange={handleSelectChange}
          isClearable 
          placeholder="Selecione um operador"
          classNamePrefix="react-select" 
        />
      </div>

      <div className="form-group mb-3 col-md-4">
        <label htmlFor="equipe">Equipe</label>
        <input
          type="text"
          className="form-control"
          id="equipe"
          name="equipe"
          value={form.equipe}
          readOnly
        />
      </div>

      <div className="form-group mb-3 col-md-4">
        <label htmlFor="validade">Válido por</label>
        <select
          className="form-control"
          id="validade"
          name="validade"
          value={form.validade}
          onChange={handleInputChange}
        >
          <option value="">Selecione uma opção</option>
          <option value="Cancelamento">Cancelamento</option>
          <option value="1 Mês">1 Mês</option>
          <option value="3 Meses">3 Meses</option>
          <option value="6 Meses">6 Meses</option>
          <option value="1 Ano">1 Ano</option>
        </select>
      </div>
      <div className="form-group mb-3 col-md-4">
        <label htmlFor="contrato">Tipo de Contrato</label>
        <select
          className="form-control"
          id="contrato"
          name="contrato"
          value={form.contrato}
          onChange={handleInputChange}
        >
          <option value="">Selecione uma opção</option>
          <option value="Cancelamento">Base</option>
          <option value="1 Mês">Renovação</option>
        </select>
      </div>
    </div>
  );
};
