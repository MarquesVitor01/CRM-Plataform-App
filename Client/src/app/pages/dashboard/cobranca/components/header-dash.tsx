import React from 'react';
import { useAuth } from '../../../../context/AuthContext';

interface HeaderDashProps {
  totalFinanceiros: number; 
}

export const HeaderDash: React.FC<HeaderDashProps> = ({ totalFinanceiros }) => {
  const { nome } = useAuth(); 
  return (
    <>
      <section>
        <div className="">
          <div className="header-dash">
            <div className="row">
              <div className="col-md-6 bemvindo-text">
                <h3>Olá, {nome}</h3>
              </div>

              <div className="header-info">
                <div className="col-md-6 info-item">
                  <h3>Total de Clientes</h3>
                  <p>{totalFinanceiros}</p> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
