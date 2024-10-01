import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faArrowRight,
    faSearch,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

export const ListDashboard = () => {
    const [clientes, setClientes] = useState([
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

    const [selectedItems, setSelectedItems] = useState(new Set());
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleCheckboxChange = (id) => {
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

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="list-dashboard">
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
                        <select className="form-select">
                            <option value="">Marcio</option>
                            <option value="">Ricardo</option>
                            <option value="">Kaio</option>
                            <option value="">Giovanna</option>
                            <option value="">Evelly</option>
                        </select>
                        <select className="form-select">
                            <option value="">Selecione</option>
                            <option value="">Ordem Alfabética</option>
                            <option value="">Mais Recente</option>
                            <option value="">Mais Antigo</option>
                        </select>
                        <button onClick={handleRemoveSelected} className="remove-btn">
                            <FontAwesomeIcon icon={faTrashAlt} />
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
