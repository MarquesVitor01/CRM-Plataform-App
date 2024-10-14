import React, { useState } from 'react';
import { MarketingForm }from './Components/MarketingForm';
import './Styles/FichaMarketing.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';

export const FichaMarketing: React.FC = () => {
  const [marketingData, setMarketingData] = useState<any | null>(null);

  const clientInfo = {
    cnpj: '31.400.847/0001-97',
    razao: "vitor",
    nomeFantasia: "vitor's gay",
    operador: 'Guilherme',
    telefone: '(70) 7070-7070',
    whatsapp: '(70) 97070-7070',
    valor: '499,90',
    vencimento: '10/10/2024',
  }; 

  const handleMarketingSubmit = (data: any) => {
    setMarketingData(data);
  };

  const sairFicha = () => {
    window.history.back()
  }

  return (
    <div className="fichaMarketing">
    <div className="container">
      <button className="btn btn-danger btn-sair-marketing" onClick={sairFicha}>
        <FontAwesomeIcon icon={faLeftLong} />
      </button>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4 p-4">
            <h2 className='text-center'>Informações do Cliente</h2>
            <p><strong>CNPJ:</strong> {clientInfo.cnpj}</p>
            <p><strong>Razão:</strong> {clientInfo.razao}</p>
            <p><strong>Nome Fantasia:</strong> {clientInfo.nomeFantasia}</p>
            <p><strong>Operador:</strong> {clientInfo.operador}</p>
            <p><strong>Telefone:</strong> {clientInfo.telefone}</p>
            <p><strong>Whatsapp:</strong> {clientInfo.whatsapp}</p>
            <p><strong>Valor da Venda:</strong> {clientInfo.valor}</p>
            <p><strong>Vencimento:</strong> {clientInfo.vencimento}</p>
          </div>
        </div>
        <div className="col-md-6">
          <MarketingForm onSubmit={handleMarketingSubmit} />
        </div>
      </div>

      {marketingData && (
        <div className="card p-4 mt-4">
          <h2>Dados de Marketing Salvos</h2>
          <p><strong>Link da Arte:</strong> {marketingData.artLink}</p>
          <p><strong>Criação ou Atualização:</strong> {marketingData.creationOrUpdate}</p>
          <p><strong>Link do QrCode:</strong> {marketingData.qrCodeLink}</p>
          <p><strong>Responsável:</strong> {marketingData.responsible}</p>
          <p><strong>Data da Conclusão:</strong> {marketingData.completionDate}</p>
        </div>
      )}
    </div>
    </div>
  );
};

