import React, { useEffect, useState } from "react";
import ListaDeParcelas from "./ListaDeParcelas";

interface Form {
  valorPago: string;
  acordo: string;
  rePagamento: string;
  dataPagamento: string;
  encaminharCliente: string;
  operadorSelecionado: { value: string; label: string } | null;
  comprovante: string;
  parcelasDetalhadas?: ParcelaDetalhada[];
}

interface ParcelaDetalhada {
  valor: string;
  dataVencimento: string;
  valorPago?: string;
  dataPagamento?: string;
  link?: string;
  pagamento?: string;
}

interface FinanceiroFormProps {
  form: Form | null;
  onSubmit: (data: Form) => void;
}

export const ComprovantesForm: React.FC<FinanceiroFormProps> = ({
  form: initialForm,
  onSubmit,
}) => {
  const [parcelas, setParcelas] = useState<ParcelaDetalhada[]>([]);
  const [form, setForm] = useState<Form>({
    parcelasDetalhadas: [],
    valorPago: "",
    acordo: "",
    rePagamento: "",
    dataPagamento: "",
    encaminharCliente: "",
    operadorSelecionado: null,
    comprovante: "",
  });
  const handleParcelaChange = (
    index: number,
    field: "valorPago" | "dataPagamento" | "link" | "pagamento",
    value: string
  ) => {
    const updatedParcelas = parcelas.map((parcela, i) =>
      i === index ? { ...parcela, [field]: value } : parcela
    );
    setParcelas(updatedParcelas);
    setForm((prevForm) => ({
      ...prevForm,
      parcelasDetalhadas: updatedParcelas,
    }));
  };

  const sairFicha = () => {
    window.history.back();
  };

 useEffect(() => {
  if (initialForm) {
    setForm(initialForm);

    if (initialForm.parcelasDetalhadas?.length) {
      setParcelas(initialForm.parcelasDetalhadas);
    }
  }
}, [initialForm]);


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  useEffect(() => {
  const totalPago = parcelas.reduce((acc, parcela) => {
    const valor = parcela.valorPago ? parseInt(parcela.valorPago, 10) : 0;
    return acc + (isNaN(valor) ? 0 : valor);
  }, 0);

  setForm(prevForm => ({
    ...prevForm,
    valorPago: totalPago.toString(),
  }));
}, [parcelas]);

const formatarValorMonetario = (valor: string) => {
    if (!valor) return "0,00";
    const number = parseInt(valor, 10) / 100;
    return number.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="row d-flex gap-3">
      <div className="card card-cob p-4" style={{ flex: "1" }}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="valorInput" className="form-label">
            Valor Pago:
          </label>
          <input
            type="text"
            name="valorPago"
            id="valorInput"
            className="form-control mb-3"
            value={formatarValorMonetario(form.valorPago || "")}
            onChange={handleInputChange}
          />

          <label htmlFor="rePagamento" className="form-label">
            O cliente realizou o pagamento?
          </label>
          <select
            className="form-select mb-3"
            id="rePagamento"
            name="rePagamento"
            value={form.rePagamento}
            onChange={handleInputChange}
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
            value={form.dataPagamento || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="comprovante" className="form-label">
            Comprovante do Pagamento:
          </label>
          <input
            type="text"
            name="comprovante"
            id="comprovante"
            className="form-control mb-3"
            value={form.comprovante || ""}
            onChange={handleInputChange}
          />
          <div className="d-flex gap-3 mx-auto">
            <button
              type="button"
              className="btn btn-danger mt-4"
              onClick={sairFicha}
            >
              Sair
            </button>
            <button type="submit" className="btn btn-primary mt-4">
              Salvar
            </button>
          </div>
        </form>
      </div>
      <div className="col-12 col-lg-6">
        <ListaDeParcelas
          parcelas={parcelas}
          handleParcelaChange={handleParcelaChange}
        />
      </div>
    </div>
  );
};
