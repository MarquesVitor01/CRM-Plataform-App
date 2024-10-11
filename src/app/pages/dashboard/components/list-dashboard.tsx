import React, { useState, useEffect } from "react";
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
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ModalExcel } from "./modalExcel";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../../../context/AuthContext";

interface Cliente {
  id: string;
  cnpj: string;
  cpf: string;
  responsavel: string;
  email: string;
  operador: string;
}

interface ListDashboardProps {
  setTotalClientes: (total: number) => void;
}

export const ListDashboard: React.FC<ListDashboardProps> = ({ setTotalClientes }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [modalExcel, setModalExcel] = useState(false);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { cargo } = useAuth(); 
  
  useEffect(() => {
    const fetchClientes = async () => {
      setLoading(true);
      try {
        const clientesCollection = collection(db, "clientes");
        const clientesSnapshot = await getDocs(clientesCollection);
        const clientesList = clientesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Cliente[];

        setClientes(clientesList);
        setTotalClientes(clientesList.length); 
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, [setTotalClientes]);

  const handleCheckboxChange = (id: string) => {
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

  const handleRemoveSelected = async () => {
    if (selectedItems.size === 0) return;

    const deletePromises = Array.from(selectedItems).map(async (id) => {
      const clienteDoc = doc(db, "clientes", id);
      await deleteDoc(clienteDoc);
    });

    await Promise.all(deletePromises);

    setClientes((prevClientes) => {
      return prevClientes.filter((cliente) => !selectedItems.has(cliente.id));
    });
    setSelectedItems(new Set());
  };

  const filteredClients = clientes.filter((cliente) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    return (
      (cliente.cnpj && cliente.cnpj.toLowerCase().includes(lowerCaseTerm)) ||
      (cliente.responsavel && cliente.responsavel.toLowerCase().includes(lowerCaseTerm)) ||
      (cliente.email && cliente.email.toLowerCase().includes(lowerCaseTerm)) ||
      (cliente.operador && cliente.operador.toLowerCase().includes(lowerCaseTerm))
    );
  });

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const currentClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const openModalExcel = () => setModalExcel(true);
  const closeModalExcel = () => setModalExcel(false);

  
  return (
    <div className="list-dashboard">
      {modalExcel && <ModalExcel onClose={closeModalExcel} />}

      <div className="header-list">
        <div className="header-content">
          <h2>{cargo}</h2>
          <div className="search-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Pesquisar..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="selects-container">
            <Link to='/add' onClick={handleRemoveSelected} className="create-btn">
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

      {loading ? (
        <div className="loading">Carregando...</div>
      ) : filteredClients.length === 0 ? (
        <div className="no-clients">Não existem clientes a exibir.</div>
      ) : (
        <>
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
                  <td className={selectedItems.has(cliente.id) ? "selected" : ""}>
                    <input
                      type="checkbox"
                      checked={selectedItems.has(cliente.id)}
                      onChange={() => handleCheckboxChange(cliente.id)}
                      className="checkbox-table"
                    />
                  </td>
                  <td className={selectedItems.has(cliente.id) ? "selected" : ""}>
                    {cliente.cnpj || cliente.cpf}
                  </td>
                  <td className={selectedItems.has(cliente.id) ? "selected" : ""}>
                    {cliente.responsavel}
                  </td>
                  <td className={selectedItems.has(cliente.id) ? "selected" : ""}>
                    {cliente.email}
                  </td>
                  <td className={selectedItems.has(cliente.id) ? "selected" : ""}>
                    {cliente.operador}
                  </td>
                  <td className="icon-container">
                    <Link to={`/contrato/${cliente.id}`}>
                      <FontAwesomeIcon icon={faEye} className="icon-spacing text-dark" />
                    </Link>
                    <Link to={`/editcontrato/${cliente.id}`}>
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
        </>
      )}

      <div className="chat-conversa">
        <Link
          to={'https://chat-node-js-onvs.onrender.com'}
          className="btn btn-info"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faComment} color="#fff" />
        </Link>

      </div>
    </div>
  );
};
