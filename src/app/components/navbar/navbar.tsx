import { faBars, faHome, faChartLine, faTachometerAlt, faBullhorn, faUsers, faMoneyBillWave, faHandHoldingUsd, faTimes } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import foto_perfil from '../../Assets/pessoa.avif'


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
                        <img src={foto_perfil} alt="" />
                        <p>Guilherme Silva</p>
                    </div>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link className="nav-link active" to={""}>
                                <FontAwesomeIcon icon={faHome} /> Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={""}>
                                <FontAwesomeIcon icon={faChartLine} /> Vendas
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={""}>
                                <FontAwesomeIcon icon={faTachometerAlt} /> Monitoria
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={""}>
                                <FontAwesomeIcon icon={faBullhorn} /> Marketing
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={""}>
                                <FontAwesomeIcon icon={faUsers} /> Gestão
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={""}>
                                <FontAwesomeIcon icon={faMoneyBillWave} /> Financeiro
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={""}>
                                <FontAwesomeIcon icon={faHandHoldingUsd} /> Cobrança
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='nav-contato'>
                    <button>Contato</button>
                </div>
            </nav>
        </div>
    );
};
