import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Select from 'react-select';

interface ModalExcelProps {
  onClose: () => void;
}

const salesPeopleOptions = [
  { value: 'marcio', label: 'Marcio' },
  { value: 'ricardo', label: 'Ricardo' },
  { value: 'kaio', label: 'Kaio' },
  { value: 'giovanna', label: 'Giovanna' },
  { value: 'evelly', label: 'Evelly' },
  { value: 'igor', label: 'Igor' },
];

const tipoVendaOptions = [
  { value: 'base', label: 'Base' },
  { value: 'renovacao', label: 'Renovação' }
];

const sortingOptions = [
  { value: 'alfabetica', label: 'Ordem Alfabética' },
  { value: 'maisRecente', label: 'Mais Recente' },
  { value: 'maisAntigo', label: 'Mais Antigo' },
];

export const ModalExcel: React.FC<ModalExcelProps> = ({ onClose }) => {
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
              <input type="date" id="startDate" className="form-control" aria-label="Data de início" />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="endDate" className="form-label">Fim</label>
              <input type="date" id="endDate" className="form-control" aria-label="Data de fim" />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="dueDate" className="form-label">Data de Vencimento</label>
            <input type="date" id="dueDate" className="form-control" aria-label="Data de vencimento" />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="saleType" className="form-label">Tipo de Venda</label>
              <Select
                options={tipoVendaOptions}
                placeholder="Selecione"
                aria-label="Tipo de venda"
                isClearable
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="salesPerson" className="form-label">Vendedor</label>
              <Select
                options={salesPeopleOptions}
                placeholder="Selecione"
                aria-label="Selecione o vendedor"
                isClearable
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3 mx-auto">
              <label htmlFor="sorting" className="form-label">Ordenação</label>
              <Select
                options={sortingOptions}
                placeholder="Selecione"
                aria-label="Selecione o critério de ordenação"
                isClearable
              />
            </div>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-primary">Aplicar Filtros</button>
          </div>
        </div>
      </div>
    </div>
  );
};
