import React, { useState } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from 'react-select';

interface ModalExcelProps {
  onClose: () => void;
  onApplyFilters: (filters: {
    startDate?: string;
    endDate?: string;
    dueDate?: string;
    saleType?: string;
    salesPerson?: string;
    sorting?: string;
  }) => void;
}

const salesPeopleOptions = [
  { value: 'marcio', label: 'Marcio' },
  { value: 'ricardo', label: 'Ricardo' },
  { value: 'kaio', label: 'Kaio' },
  { value: 'giovanna', label: 'Giovanna' },
  { value: 'evelly', label: 'Evelly' },
  { value: 'igor', label: 'Igor' },
  { value: 'test', label: 'test' },
];

const tipoVendaOptions = [
  { value: 'Base', label: 'Base' },
  { value: 'Renovacao', label: 'Renovação' }
];

const sortingOptions = [
  { value: 'alfabetica', label: 'Ordem Alfabética' },
  { value: 'maisRecente', label: 'Mais Recente' },
  { value: 'maisAntigo', label: 'Mais Antigo' },
];

export const ModalExcel: React.FC<ModalExcelProps> = ({ onClose, onApplyFilters }) => {
  const [startDate, setStartDate] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();
  const [dueDate, setDueDate] = useState<string | undefined>();
  const [saleType, setSaleType] = useState<string | undefined>();
  const [salesPerson, setSalesPerson] = useState<string | undefined>();
  const [sorting, setSorting] = useState<string | undefined>();

  const handleApplyFilters = () => {
    onApplyFilters({ startDate, endDate, dueDate, saleType, salesPerson, sorting });
    onClose();
  };

  return (
    <div className="modal-excel">
      <div className="box-modal-excel p-4">
        <h2 className="text-center">Filtros de Data</h2>
        <button className="btn btn-danger btn-fechar-excel" onClick={onClose}>
          <FontAwesomeIcon icon={faClose} />
        </button>

        <div className="datas mt-3">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="startDate" className="form-label">Início</label>
              <input
                type="date"
                id="startDate"
                className="form-control"
                value={startDate || ""}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="endDate" className="form-label">Fim</label>
              <input
                type="date"
                id="endDate"
                className="form-control"
                value={endDate || ""}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="dueDate" className="form-label">Data de Vencimento</label>
            <input
              type="date"
              id="dueDate"
              className="form-control"
              value={dueDate || ""}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="saleType" className="form-label">Tipo de Venda</label>
              <Select
                options={tipoVendaOptions}
                placeholder="Selecione"
                isClearable
                onChange={(option) => setSaleType(option?.value)}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="salesPerson" className="form-label">Vendedor</label>
              <Select
                options={salesPeopleOptions}
                placeholder="Selecione"
                isClearable
                onChange={(option) => setSalesPerson(option?.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3 mx-auto">
              <label htmlFor="sorting" className="form-label">Ordenação</label>
              <Select
                options={sortingOptions}
                placeholder="Selecione"
                isClearable
                onChange={(option) => setSorting(option?.value)}
              />
            </div>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-primary" onClick={handleApplyFilters}>Aplicar Filtros</button>
          </div>
        </div>
      </div>
    </div>
  );
};
