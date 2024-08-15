import React, { useState } from 'react';
import '../setores/components/Setores.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faClose } from '@fortawesome/free-solid-svg-icons';

export const Setores = () => {
    const [mostrarDetalhesVendas, setMostrarDetalhesVendas] = useState(false);

    const handleVendasClick = () => {
        setMostrarDetalhesVendas(!mostrarDetalhesVendas);
    };

    return (
        <div className="sector-selection container-fluid">
            <h1 className="title text-center">Escolha um Setor</h1>
            <div className="sector-container row justify-content-center">
                <div className="sector col-12 col-md-4 col-lg-3">
                    <h2>Vendas</h2>
                    <p>Clique aqui para acessar a área de vendas.</p>
                    <button onClick={handleVendasClick} className="btn-sector btn btn-primary">
                        Acessar Vendas
                    </button>

                    {mostrarDetalhesVendas && (
                        <div className="overlay">
                            <div className="vendas-detalhes">
                                <button 
                                    onClick={handleVendasClick}
                                    className="btn-closed"
                                >
                                    <FontAwesomeIcon icon={faClose}/>
                                </button>
                                <Link to="/vendasSites" className="btn-sector btn btn-primary">
                                    Acessar Vendas de Sites
                                </Link>
                                <Link to="/divulgacao" className="btn-sector btn btn-primary">
                                    Acessar Divulgação
                                </Link>
                            </div>
                        </div>
            
                    )}
                </div>
                <div className="sector col-12 col-md-4 col-lg-3">
                    <h2>Monitoria</h2>
                    <p>Clique aqui para verificar a monitoria.</p>
                    <Link to="/monitoria" className="btn-sector btn btn-primary">Verificar Monitoria</Link>
                </div>
                <div className="sector col-12 col-md-4 col-lg-3">
                    <h2>Marketing</h2>
                    <p>Clique aqui para ter uma visão do marketing.</p>
                    <Link to="/marketing" className="btn-sector btn btn-primary">Visão do Marketing</Link>
                </div>
                <div className="sector col-12 col-md-4 col-lg-3">
                    <h2>Gestão</h2>
                    <p>Clique aqui para se certificar da gestão.</p>
                    <Link to="/gestao" className="btn-sector btn btn-primary">Certificar Gestão</Link>
                </div>
                <div className="sector col-12 col-md-4 col-lg-3">
                    <h2>Financeiro</h2>
                    <p>Clique aqui para ver a situação financeira.</p>
                    <Link to="/financeiro" className="btn-sector btn btn-primary">Ver Situação Financeira</Link>
                </div>
                <div className="sector col-12 col-md-4 col-lg-3">
                    <h2>Cobrança</h2>
                    <p>Clique aqui para monitorar a cobrança.</p>
                    <Link to="/cobranca" className="btn-sector btn btn-primary">Monitorar Cobrança</Link>
                </div>
            </div>
        </div>
    );
};
