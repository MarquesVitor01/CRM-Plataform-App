import React, { useState } from "react";
import Select from "react-select";

export const FinanceiroForm = () => {
  const [valor, setValor] = useState("");
  const [acordo, setAcordo] = useState("");
  const [rePagamento, setRePagamento] = useState("");
  const [operadorSelecionado, setOperadorSelecionado] = useState<any>(null); // Mudado para any para aceitar o tipo do react-select

  const handleValorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValor(event.target.value);
  };

  const handleAcordoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAcordo(event.target.value);
  };

  const handleRePagamentoChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRePagamento(event.target.value);
  };

  const handleOperadorChange = (selectedOption: any) => {
    setOperadorSelecionado(selectedOption);
  };

  const cobranca = [
    { value: "miguel", label: "Miguel" },
    { value: "isa", label: "Isa" },
  ];

  const sairFicha = () => {
    window.history.back()
  }

  return (
    <div className="row">
      <div className="card d-flex justify-content-center p-4">
        <label htmlFor="valorInput" className="form-label">
          Valor:
        </label>
        <input
          type="text"
          name="valor"
          id="valorInput"
          className="form-control mb-3"
          value={valor}
          onChange={handleValorChange}
        />

        <label htmlFor="acordoCobrança" className="form-label">
          Possui acordo com a cobrança?
        </label>
        <select
          className="form-select mb-3"
          id="acordoCobrança"
          name="acordoCobrança"
          value={acordo}
          onChange={handleAcordoChange}
        >
          <option value="">Selecione uma opção</option>
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </select>

        <label htmlFor="rePagamento" className="form-label">
          O cliente realizou o pagamento?
        </label>
        <select
          className="form-select mb-3"
          id="rePagamento"
          name="rePagamento"
          value={rePagamento}
          onChange={handleRePagamentoChange}
        >
          <option value="">Selecione uma opção</option>
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
          <option value="cancelado">Cancelado</option>
        </select>

        <label htmlFor="dataPagamento" className="form-label">
          Data do Pagamento:
        </label>
        <input
          type="date"
          name="dataPagamento"
          id="dataPagamento"
          className="form-control mb-3"
        />
        <hr className="w-50 mx-auto"/>
        <div className="encaminheCob">
          <label htmlFor="">Deseja encaminhar para a cobrança?</label>
          <select name="" id="" className="form-select">
            <option value="">Selecione uma opção</option>
            <option value="">Sim</option>
            <option value="">Não</option>
          </select>

          <label className="form-label">Selecione ou digite um operador:</label>
          <Select
            options={cobranca}
            value={operadorSelecionado}
            onChange={handleOperadorChange}
            isClearable
            isSearchable
          />
        </div>
        <div className="d-flex gap-3 mx-auto">
        <button className="btn btn-danger mt-4" onClick={sairFicha}>Sair</button>
        <button className="btn btn-primary mt-4">Salvar</button>
        </div>
      </div>
    </div>
  );
};
