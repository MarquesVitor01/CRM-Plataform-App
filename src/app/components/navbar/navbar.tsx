import { faBars, faHome, faChartLine, faTachometerAlt, faBullhorn, faUsers, faMoneyBillWave, faHandHoldingUsd, faTimes } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button
                className={`btn btn-primary sidebar-toggle ${isOpen ? 'open' : ''}`}
                onClick={toggleSidebar}
            >
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
            </button>

            {/* Navbar Lateral */}
            <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-sticky">
                    <div className='nav-perfil'>
                        <img src="../Images/pessoa.avif" alt="" />
                        <p>Guilherme Silva</p>
                    </div>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link active" href="#">
                                <FontAwesomeIcon icon={faHome} /> Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <FontAwesomeIcon icon={faChartLine} /> Vendas
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <FontAwesomeIcon icon={faTachometerAlt} /> Monitoria
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <FontAwesomeIcon icon={faBullhorn} /> Marketing
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <FontAwesomeIcon icon={faUsers} /> Gestão
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <FontAwesomeIcon icon={faMoneyBillWave} /> Financeiro
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <FontAwesomeIcon icon={faHandHoldingUsd} /> Cobrança
                            </a>
                        </li>
                    </ul>
                    <div className='nav-contato'>
                        <button>Contato</button>
                    </div>
                </div>
            </nav>
        </div>
    );
};
