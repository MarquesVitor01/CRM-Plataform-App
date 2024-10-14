import React from "react";
import images from "../Operador/Operadores";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";

interface Operador {
  nome: string;
  venda: number;
}

interface Operadores {
  [key: string]: Operador;
}

export const Ranking: React.FC = () => {
  const operadores: Operadores = {
    pessoa1: {
      nome: "João",
      venda: 10,
    },
    pessoa2: {
      nome: "Maria",
      venda: 8,
    },
    pessoa3: {
      nome: "Carlos",
      venda: 6,
    },
    pessoa4: {
      nome: "Guilherme",
      venda: 4,
    },
  };

  return (
    <div>
      <ul className="list-ranking">
        {Object.keys(operadores).map((key) => (
          <li key={key} className="list-item-ranking">
            <div className="img-list">
              <img src={images[key]} alt={operadores[key].nome} />
            </div>
            <div className="list-nome">{operadores[key].nome}</div>
            <div className="list-vendas">{operadores[key].venda}</div>
          </li>
        ))}
      </ul>

      <div className="paginas-ranking">
        <button className="btn btn-primary">
          <FontAwesomeIcon icon={faLeftLong} />
        </button>
        <button className="btn btn-primary">
          <FontAwesomeIcon icon={faRightLong} />
        </button>
      </div>
    </div>
  );
};
