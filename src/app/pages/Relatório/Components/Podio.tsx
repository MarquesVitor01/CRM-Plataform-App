import React from "react";
import operadores from "../Operador/Operadores";
import { Ranking } from "./Ranking"; // Certifique-se de que o caminho esteja correto

const Podio: React.FC = () => {
  return (
    <section>
      <div>
        <div className="row">
          <div className="col-md-6 col-sm-6">
            <div className="podio">
              <div className="podio-primeiro">
                <img src={operadores.pessoa1} alt="Operador 1" />
                <h4>Operador 1</h4>
              </div>
              <div className="podio-segundo">
                <img src={operadores.pessoa2} alt="Operador 2" />
                <h4>Operador 2</h4>
              </div>
              <div className="podio-terceiro">
                <img src={operadores.pessoa3} alt="Operador 3" />
                <h4>Operador 3</h4>
              </div>
            </div>
            {/* Adicionando o Ranking abaixo do primeiro pódio */}
            <Ranking />
          </div>

          <div className="col-md-6 col-sm-6">
            <div className="podio">
              <div className="podio-primeiro">
                <img src={operadores.pessoa1} alt="Operador 1" />
                <h4>Operador 1</h4>
              </div>
              <div className="podio-segundo">
                <img src={operadores.pessoa2} alt="Operador 2" />
                <h4>Operador 2</h4>
              </div>
              <div className="podio-terceiro">
                <img src={operadores.pessoa3} alt="Operador 3" />
                <h4>Operador 3</h4>
              </div>
            </div>
            {/* Adicionando o Ranking abaixo do segundo pódio */}
            <Ranking />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Podio;
