import React, { useState } from "react";
import Select from "react-select"; // Biblioteca para select com busca
import "./Styles/FichaCobranca.css";

const cobradores = [
  { value: "isa", label: "Isa" },
  { value: "miguel", label: "Miguel" },
];

export const FichaCobranca: React.FC = () => {
  const [cobradorSelecionado, setCobradorSelecionado] = useState<any>(null);
  const [dataCobranca, setDataCobranca] = useState("");
  const [dataEncaminhamento, setDataEncaminhamento] = useState("");
  const [dataVencimento, setDataVencimento] = useState("");

  const handleCobradorChange = (selectedOption: any) => {
    setCobradorSelecionado(selectedOption);
  };

  const sairFicha = () => {
    window.history.back()
  }

  return (
    <div className="cobranca">
      <h2 className="text-white text-center">Ficha da Cobrança</h2>
      <div className="container">
        <div className="row align-items-center">
          <div className="card card-cob p-4">
            <label className="form-label">Selecione um cobrador:</label>
            <Select
              options={cobradores}
              value={cobradorSelecionado}
              onChange={handleCobradorChange}
              isClearable
              isSearchable
              placeholder={"Selecione um cobrador"}
            />

            <label htmlFor="dataCobranca" className="form-label mt-3">
              Data da Cobrança:
            </label>
            <input
              type="date"
              id="dataCobranca"
              className="form-control mb-3"
              value={dataCobranca}
              onChange={(e) => setDataCobranca(e.target.value)}
            />

            <label htmlFor="dataEncaminhamento" className="form-label">
              Data de Encaminhamento:
            </label>
            <input
              type="date"
              id="dataEncaminhamento"
              className="form-control mb-3"
              value={dataEncaminhamento}
              onChange={(e) => setDataEncaminhamento(e.target.value)}
            />

            <label htmlFor="dataVencimento" className="form-label">
              Data do Vencimento:
            </label>
            <input
              type="date"
              id="dataVencimento"
              className="form-control mb-3"
              value={dataVencimento}
              onChange={(e) => setDataVencimento(e.target.value)}
            />
            <label htmlFor="" className="form-label">
              Link do Comprovante:
            </label>
            <input
              placeholder="Insira o link do comprovante"
              type="text"
              name=""
              id=""
              className="form-control"
            />

            <div className="d-flex gap-4 mx-auto mt-4">
              <button className="btn btn-danger" onClick={sairFicha}>Sair</button>
              <button className="btn btn-primary">Salvar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
