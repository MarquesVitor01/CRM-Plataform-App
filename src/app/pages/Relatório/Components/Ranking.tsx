import React from "react";
import images from '../Operador/Operadores'

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
    },pessoa4: {
      nome: "Guilherme",
      venda: 4,
    },
  };

  return (
    <div>
      <table className="table">
        <tbody>
          {Object.keys(operadores).map((key) => (
            <tr key={key}>
              <td className="img-table">
                <img 
                  src={images[key]} 
                  alt={operadores[key].nome} 
                />
              </td>
              <td className="table-nome">{operadores[key].nome}</td>
              <td className="table-vendas">{operadores[key].venda}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};