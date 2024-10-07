import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faEdit,
  faEye,
  faSearch,
  faTrashAlt,
  faFilter,
  faDownload,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ModalExcel } from "./modalExcel";

interface Cliente {
  id: number;
  cnpj: string;
  nome: string;
  email: string;
  operador: string;
}

export const ListDashboard: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([
    {
      id: 1,
      cnpj: "12.345.678/0001-99",
      nome: "Empresa XYZ",
      email: "contato@xyz.com",
      operador: "João Silva",
    },
    {
      id: 2,
      cnpj: "98.765.432/0001-11",
      nome: "Empresa ABC",
      email: "contato@abc.com",
      operador: "Maria Oliveira",
    },
    {
      id: 3,
      cnpj: "56.789.012/0001-22",
      nome: "Empresa DEF",
      email: "contato@def.com",
      operador: "Carlos Santos",
    },
    {
      id: 4,
      cnpj: "12.345.678/0001-99",
      nome: "Empresa XYZ",
      email: "contato@xyz.com",
      operador: "João Silva",
    },
    {
      id: 5,
      cnpj: "98.765.432/0001-11",
      nome: "Empresa ABC",
      email: "contato@abc.com",
      operador: "Maria Oliveira",
    },
    {
      id: 6,
      cnpj: "56.789.012/0001-22",
      nome: "Empresa DEF",
      email: "contato@def.com",
      operador: "Carlos Santos",
    },
    {
      id: 7,
      cnpj: "12.345.678/0001-99",
      nome: "Empresa XYZ",
      email: "contato@xyz.com",
      operador: "João Silva",
    },
    {
      id: 8,
      cnpj: "98.765.432/0001-11",
      nome: "Empresa ABC",
      email: "contato@abc.com",
      operador: "Maria Oliveira",
    },
  ]);

  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [modalExcel, setModalExcel] = useState(false);
  const itemsPerPage = 5;

  const handleCheckboxChange = (id: number) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = new Set(prevSelectedItems);
      if (newSelectedItems.has(id)) {
        newSelectedItems.delete(id);
      } else {
        newSelectedItems.add(id);
      }
      return newSelectedItems;
    });
  };

  const handleRemoveSelected = () => {
    setClientes((prevClientes) => {
      return prevClientes.filter((cliente) => !selectedItems.has(cliente.id));
    });
    setSelectedItems(new Set());
  };

  const totalPages = Math.ceil(clientes.length / itemsPerPage);
  const currentClients = clientes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const openModalExcel = () => setModalExcel(true)
  const closeModalExcel = () => setModalExcel(false)


  return (
    <div className="list-dashboard">

    {modalExcel && (
      <ModalExcel onClose={closeModalExcel} />
    )}

      <div className="header-list">
        <div className="header-content">
          <h2>Lista de Clientes</h2>
          <div className="search-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Pesquisar..."
              className="search-input"
            />
          </div>
          <div className="selects-container">
            
          <Link to='/contrato' onClick={handleRemoveSelected} className="create-btn">
              <FontAwesomeIcon icon={faPlus} />
            </Link>
            <button onClick={handleRemoveSelected} className="remove-btn">
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            <button className="filtros-btn" onClick={openModalExcel}>
              <FontAwesomeIcon icon={faFilter} color="#fff" />
            </button>
            <button className="planilha-btn">
              <FontAwesomeIcon icon={faDownload} color="#fff" />
            </button>
          </div>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>CNPJ</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Operador</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentClients.map((cliente) => (
            <tr key={cliente.id}>
              <td
                key={cliente.id}
                className={selectedItems.has(cliente.id) ? "selected" : ""}
              >
                <input
                  type="checkbox"
                  checked={selectedItems.has(cliente.id)}
                  onChange={() => handleCheckboxChange(cliente.id)}
                  className="checkbox-table"
                />
              </td>
              <td
                key={cliente.id}
                className={selectedItems.has(cliente.id) ? "selected" : ""}
              >
                {cliente.cnpj}
              </td>
              <td
                key={cliente.id}
                className={selectedItems.has(cliente.id) ? "selected" : ""}
              >
                {cliente.nome}
              </td>
              <td
                key={cliente.id}
                className={selectedItems.has(cliente.id) ? "selected" : ""}
              >
                {cliente.email}
              </td>
              <td
                key={cliente.id}
                className={selectedItems.has(cliente.id) ? "selected" : ""}
              >
                {cliente.operador}
              </td>
              <td className="icon-container">
                <Link to="/">
                  <FontAwesomeIcon icon={faEye} className="icon-spacing text-dark" />
                </Link>
                <Link to="/editcontrato">
                  <FontAwesomeIcon icon={faEdit} className="icon-spacing text-dark" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};
