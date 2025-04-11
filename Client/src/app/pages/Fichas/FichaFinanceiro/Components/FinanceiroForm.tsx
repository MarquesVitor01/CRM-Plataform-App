import React, { useEffect, useState } from "react";
import Select from "react-select";
import ListaDeParcelas from "./ListaDeParcelas";

// Estende a interface original para incluir parcelas, se existirem
interface ParcelaDetalhada {
  valor: string;
  dataVencimento: string;
  valorPago?: string;
  dataPagamento?: string;
}

interface Form {
  valorPago: string;
  acordo: string;
  rePagamento: string;
  dataPagamento: string;
  encaminharCliente: string;
  operadorSelecionado: { value: string; label: string } | null;
  comprovante: string;
  // Opcionalmente, as parcelas detalhadas podem vir do objeto
  parcelasDetalhadas?: ParcelaDetalhada[];
}

interface FinanceiroFormProps {
  form: Form | null;
  onSubmit: (data: Form) => void;
}

export const FinanceiroForm: React.FC<FinanceiroFormProps> = ({ form: initialForm, onSubmit }) => {
  const [form, setForm] = useState<Form>({
    valorPago: "",
    acordo: "",
    rePagamento: "",
    dataPagamento: "",
    encaminharCliente: "",
    operadorSelecionado: null,
    comprovante: "",
    parcelasDetalhadas: [] // inicia como array vazio, se não informado
  });

  // Estado para controlar cada parcela com seus respectivos campos de pagamento
  const [parcelas, setParcelas] = useState<ParcelaDetalhada[]>([]);

  const cobranca = [
    { value: "miguel", label: "Miguel" },
    { value: "isa", label: "Isa" },
  ];

  const sairFicha = () => {
    window.history.back();
  };

  // Inicializa o formulário e as parcelas, se houver dados iniciais
  useEffect(() => {
    if (initialForm) {
      setForm(initialForm);
      if (initialForm.parcelasDetalhadas) {
        // Preenche cada parcela garantindo que os campos de pagamento existam
        const parcelasIniciais = initialForm.parcelasDetalhadas.map((p) => ({
          ...p,
          valorPago: p.valorPago || "",
          dataPagamento: p.dataPagamento || "",
        }));
        setParcelas(parcelasIniciais);
      }
    }
  }, [initialForm]);

  // Atualiza o final "valorPago" sempre que os pagamentos das parcelas mudarem.
  useEffect(() => {
    const total = parcelas.reduce((acc, parcela) => {
      // Converte para número e soma (se o valor não for numérico, considera zero)
      const valor = parseFloat(parcela.valorPago || "0");
      return acc + (isNaN(valor) ? 0 : valor);
    }, 0);
    setForm((prevForm) => ({
      ...prevForm,
      valorPago: (Number(total) / 100).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    }));
    
  }, [parcelas]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (selectedOption: { value: string; label: string } | null) => {
    setForm((prevForm) => ({
      ...prevForm,
      operadorSelecionado: selectedOption,
    }));
  };

  // Trata as alterações nos campos de cada parcela
  const handleParcelaChange = (
    index: number,
    field: "valorPago" | "dataPagamento",
    value: string
  ) => {
    const updatedParcelas = parcelas.map((parcela, i) =>
      i === index ? { ...parcela, [field]: value } : parcela
    );
    setParcelas(updatedParcelas);
    // Se desejar também refletir esta mudança no objeto form, pode atualizar a propriedade parcelasDetalhadas
    setForm((prevForm) => ({
      ...prevForm,
      parcelasDetalhadas: updatedParcelas,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ao submeter, o "valorPago" do formulário já é a soma dos pagamentos das parcelas.
    onSubmit(form);
  };

  return (
    <div className="row gx-4 gy-4">
  {/* Coluna do formulário */}
  <div className="col-12 col-lg-6">
    <div className="card p-4 h-100 shadow-sm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="valorInput" className="form-label">
          Valor Pago (Total das Parcelas):
        </label>
        <input
          type="text"
          name="valorPago"
          id="valorInput"
          className="form-control mb-3"
          value={form.valorPago}
          readOnly
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
          Data do Pagamento (Geral):
        </label>
        <input
          type="date"
          name="dataPagamento"
          id="dataPagamento"
          className="form-control mb-3"
          value={form.dataPagamento}
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
          value={form.comprovante}
          onChange={handleInputChange}
        />

        <hr className="w-50 mx-auto" />

        <div className="encaminheCob">
          <label htmlFor="encaminharCliente">
            Deseja encaminhar para a cobrança?
          </label>
          <select
            className="form-select mb-3"
            id="encaminharCliente"
            name="encaminharCliente"
            value={form.encaminharCliente}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione uma opção</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
        </div>

        <div className="d-flex gap-3 justify-content-center">
          <button type="button" className="btn btn-danger mt-4" onClick={sairFicha}>
            Sair
          </button>
          <button type="submit" className="btn btn-primary mt-4">
            Salvar
          </button>
        </div>
      </form>
    </div>
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
