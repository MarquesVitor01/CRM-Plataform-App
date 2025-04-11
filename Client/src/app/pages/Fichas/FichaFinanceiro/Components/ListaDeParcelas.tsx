import React from "react";

interface Parcela {
  valor: string;
  dataVencimento: string;
  valorPago?: string;
  dataPagamento?: string;
}

interface ListaDeParcelasProps {
  parcelas: Parcela[];
  handleParcelaChange: (
    index: number,
    field: "valorPago" | "dataPagamento",
    value: string
  ) => void;
}
const ListaDeParcelas: React.FC<ListaDeParcelasProps> = ({
  parcelas,
  handleParcelaChange,
}) => {
  if (!parcelas || parcelas.length === 0) return null;

  return (
    <div className="scroll-container">
      <div className="row gy-2">
        {parcelas.map((parcela, index) => (
          <div key={index} className="card shadow-sm p-3 rounded-2">
            <h3 className="text-center">Parcelas do Contrato</h3>
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h6 className="card-title mb-2">
                  <strong>Parcela {index + 1}</strong>
                </h6>
                <p className="mb-3">
                <strong>Valor:</strong> R$ {(Number(parcela.valor) / 100).toFixed(2).replace(".", ",")}
                <br />
                  <strong>Vencimento:</strong> {parcela.dataVencimento}
                </p>

                <div className="mb-3">
                  <label className="form-label">Valor Pago:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={parcela.valorPago}
                    onChange={(e) =>
                      handleParcelaChange(index, "valorPago", e.target.value)
                    }
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Data do Pagamento:</label>
                  <input
                    type="date"
                    className="form-control"
                    value={parcela.dataPagamento}
                    onChange={(e) =>
                      handleParcelaChange(
                        index,
                        "dataPagamento",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaDeParcelas;
