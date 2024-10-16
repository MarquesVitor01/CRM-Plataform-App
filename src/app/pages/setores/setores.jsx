import React, { useState } from 'react';
import '../setores/components/Setores.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faChartLine, faLaptop, faBullhorn, faDollarSign, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';

export const Setores = () => {
    const [mostrarDetalhesVendas, setMostrarDetalhesVendas] = useState(false);

    const handleVendasClick = () => {
        setMostrarDetalhesVendas(!mostrarDetalhesVendas);
    };

    return (
        <div className="sector-selection container-fluid">
            <h1 className="title text-center">Escolha um Setor</h1>
            <div className="sector-container row justify-content-center">
                <div className="sector col-10 col-md-4 col-lg-3">
                    <div className="sector-content">
                        <FontAwesomeIcon icon={faChartLine} className="sector-icon" />
                        <h2>Vendas</h2>
                        <p>Clique aqui para acessar a área de vendas.</p>
                        <Link onClick={handleVendasClick} className="btn-sector btn btn-primary">
                            Acessar Vendas
                        </Link>

                        {mostrarDetalhesVendas && (
                            <div className="overlay">
                                <div className="vendas-detalhes">
                                    <button 
                                        onClick={handleVendasClick}
                                        className="btn-closed"
                                    >
                                        <FontAwesomeIcon icon={faClose} />
                                    </button>
                                    <Link to="/dashboard" className="btn-sector btn btn-primary">
                                        Acessar Divulgação
                                    </Link>
                                    <Link to="/dashboard" className="btn-sector btn btn-primary">
                                        Acessar Vendas de Sites
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="sector col-10 col-md-4 col-lg-3">
                    <div className="sector-content">
                        <FontAwesomeIcon icon={faLaptop} className="sector-icon" />
                        <h2>Monitoria</h2>
                        <p>Clique aqui para verificar a monitoria.</p>
                        <Link to="/fichamonitoria" className="btn-sector btn btn-primary">Verificar Monitoria</Link>
                    </div>
                </div>
                <div className="sector col-10 col-md-4 col-lg-3">
                    <div className="sector-content">
                        <FontAwesomeIcon icon={faBullhorn} className="sector-icon" />
                        <h2>Marketing</h2>
                        <p>Clique aqui para ter uma visão do marketing.</p>
                        <Link to="/fichamarketing" className="btn-sector btn btn-primary">Visão do Marketing</Link>
                    </div>
                </div>

                <div className="sector col-10 col-md-4 col-lg-3">
                    <div className="sector-content">
                        <FontAwesomeIcon icon={faDollarSign} className="sector-icon" />
                        <h2>Financeiro</h2>
                        <p>Clique aqui para ver a situação financeira.</p>
                        <Link to="/fichafinanceiro" className="btn-sector btn btn-primary">Ver Situação Financeira</Link>
                    </div>
                </div>
                <div className="sector col-10 col-md-4 col-lg-3">
                    <div className="sector-content">
                        <FontAwesomeIcon icon={faMoneyBillWave} className="sector-icon" />
                        <h2>Cobrança</h2>
                        <p>Clique aqui para monitorar a cobrança.</p>
                        <Link to="/fichacobranca" className="btn-sector btn btn-primary">Monitorar Cobrança</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
