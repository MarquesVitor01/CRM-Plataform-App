import React from 'react';

export const Header: React.FC = () => {
  // Informações do cabeçalho armazenadas em um objeto
  const infosHeader = {
    contrato: '52767',
    data: '07/10/2024',
    operador: 'Kaio Ferreira',
    equipe: 'G MARKETING DIGITAL',
    valido: '3 Meses',
  };

  return (
    <div className="header text-center">
      <img 
        src="http://localhost:3000/img/logo_contrato_maps.jpg" 
        alt="Logo" 
        className="img-fluid mb-3" 
      />
      <div className="row mb-3">
        <div className="col-md-4">
          <p><strong>CONTRATO Nº:</strong> {infosHeader.contrato}</p>
        </div>
        <div className="col-md-4">
          <p><strong>DATA:</strong> {infosHeader.data}</p>
        </div>
        <div className="col-md-4">
          <p><strong>OPERADOR:</strong> {infosHeader.operador}</p>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <strong>EQUIPE:</strong> {infosHeader.equipe}
        </div>
        <div className="col">
          <strong>Válido Por:</strong> {infosHeader.valido}
        </div>
      </div>
    </div>
  );
};
