import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import "./Relatorio.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";

interface Venda {
  operador: string;
  data: string;
  modelo: string;
  contrato: string;
}

interface Usuario {
  avatar: string;
  nome: string;
}

export const Relatorio: React.FC = () => {
  const [vendasDiarias, setVendasDiarias] = useState<
    (Venda & { avatar?: string })[]
  >([]);
  const [usuariosMap, setUsuariosMap] = useState<Record<string, Usuario>>({});
  const [usuariosPorNome, setUsuariosPorNome] = useState<
    Record<string, string>
  >({});
  const [totalBase, setTotalBase] = useState(0);
  const [totalRenovacao, setTotalRenovacao] = useState(0);
  const [totalRecorencia, setTotalRecorencia] = useState(0);
  const [currentPageBase, setCurrentPageBase] = useState(1);
  const [currentPageRenovacao, setCurrentPageRenovacao] = useState(1);
  const [currentPageRecorencia, setCurrentPageRecorencia] = useState(1);
  const itemsPerPage = 4;

  const db = getFirestore();

  useEffect(() => {
    const fetchUsuarios = async () => {
      const usuariosCollection = collection(db, "usuarios");
      const usuariosSnapshot = await getDocs(usuariosCollection);
      const usuarios: Record<string, Usuario> = {};
      const nomeParaID: Record<string, string> = {};

      usuariosSnapshot.forEach((doc) => {
        const usuario = doc.data() as Usuario;
        // Mantendo o nome como está no banco, sem alteração
        usuarios[doc.id] = usuario;
        nomeParaID[usuario.nome.trim()] = doc.id; // Apenas removendo espaços extras
      });

      setUsuariosMap(usuarios);
      setUsuariosPorNome(nomeParaID);
    };

    fetchUsuarios();
  }, [db]);

  useEffect(() => {
    const fetchVendasDiarias = () => {
      const vendasCollection = collection(db, "vendas");

      const unsubscribe = onSnapshot(vendasCollection, (querySnapshot) => {
        const vendasHoje: (Venda & { avatar?: string })[] = [];
        const today = new Date().toISOString().split("T")[0];

        const vendasMapeadas = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as (Venda & { id: string })[];

        // Reset totals
        let baseCount = 0;
        let renovacaoCount = 0;
        let recorenciaCount = 0;

        for (const venda of vendasMapeadas) {
          if (venda.data === today) {
            // Verificando o operador
            const usuarioID = usuariosPorNome[venda.operador] || venda.operador;

            const usuario = usuariosMap[usuarioID];
            if (usuario) {
              const vendaComAvatar = { ...venda, avatar: usuario.avatar };
              vendasHoje.push(vendaComAvatar);
            } else {
              console.warn(
                `Usuário não encontrado para o operador: ${venda.operador}`
              );
            }

            // Contabilizando o total por tipo de contrato
            if (venda.contrato === "Base") {
              baseCount += 1;
            } else if (venda.contrato === "Renovacao") {
              renovacaoCount += 1;
            } else if (venda.contrato === "Recorencia") {
              recorenciaCount += 1;
            }
          }
        }

        setTotalBase(baseCount);
        setTotalRenovacao(renovacaoCount);
        setTotalRecorencia(recorenciaCount);
        setVendasDiarias(vendasHoje);
      });

      return () => unsubscribe();
    };

    if (Object.keys(usuariosMap).length > 0) {
      fetchVendasDiarias();
    }
  }, [db, usuariosMap, usuariosPorNome]);

  const vendasPorOperador = vendasDiarias.reduce<
    Record<string, { base: number; renovacao: number; recorencia: number }>
  >((acc, venda) => {
    const { operador, contrato } = venda;
    if (!acc[operador]) {
      acc[operador] = { base: 0, renovacao: 0, recorencia: 0 };
    }
    if (contrato === "Base") {
      acc[operador].base += 1;
    } else if (contrato === "Renovacao") {
      acc[operador].renovacao += 1;
    } else if (contrato === "Recorencia") {
      acc[operador].recorencia += 1;
    }
    return acc;
  }, {});

  const getAllOperators = () => {
    return Object.keys(vendasPorOperador)
      .filter(
        (operador) =>
          vendasPorOperador[operador].base > 0 ||
          vendasPorOperador[operador].recorencia > 0 ||
          vendasPorOperador[operador].renovacao > 0
      )
      .sort((a, b) => {
        const totalA =
          vendasPorOperador[a].base + vendasPorOperador[a].renovacao + vendasPorOperador[a].recorencia;
        const totalB =
          vendasPorOperador[b].base + vendasPorOperador[b].renovacao + vendasPorOperador[b].recorencia;
        return totalB - totalA; // Ordenar do maior para o menor
      });
  };

  const getTopThree = (tipo: "Base" | "Renovacao" | "Recorencia") => {
    const filtrados = Object.keys(vendasPorOperador).filter((operador) => {
      if (tipo === "Base") {
        return vendasPorOperador[operador].base > 0;
      } else if (tipo === "Renovacao") {
        return vendasPorOperador[operador].renovacao > 0;
      } else if (tipo === "Recorencia") {
        return vendasPorOperador[operador].recorencia > 0;
      }
      return false;
    });

    return filtrados
      .sort((a, b) => {
        const totalA =
          vendasPorOperador[a].base +
          vendasPorOperador[a].renovacao +
          vendasPorOperador[a].recorencia;
        const totalB =
          vendasPorOperador[b].base +
          vendasPorOperador[b].renovacao +
          vendasPorOperador[b].recorencia;
        return totalB - totalA; // Ordenar do maior para o menor
      })
      .slice(0, 3);
  };

  const topRenovacao = getTopThree("Renovacao");
  const topBase = getTopThree("Base");
  const topRecorencia = getTopThree("Recorencia");
  const allOperators = getAllOperators();

  // Cálculo da paginação para Base
  const indexOfLastBaseOperator = currentPageBase * itemsPerPage;
  const indexOfFirstBaseOperator = indexOfLastBaseOperator - itemsPerPage;

  const currentBaseOperators = allOperators
    .filter((operador) => vendasPorOperador[operador].base > 0)
    .slice(indexOfFirstBaseOperator, indexOfLastBaseOperator);
  const totalBasePages = Math.ceil(
    Object.keys(vendasPorOperador).filter(
      (operador) => vendasPorOperador[operador].base > 0
    ).length / itemsPerPage
  );

  // Cálculo da paginação para Renovação
  const indexOfLastRenovacaoOperator = currentPageRenovacao * itemsPerPage;
  const indexOfFirstRenovacaoOperator =
    indexOfLastRenovacaoOperator - itemsPerPage;

  const currentRenovacaoOperators = allOperators
    .filter((operador) => vendasPorOperador[operador].renovacao > 0)
    .slice(indexOfFirstRenovacaoOperator, indexOfLastRenovacaoOperator);
  const totalRenovacaoPages = Math.ceil(
    Object.keys(vendasPorOperador).filter(
      (operador) => vendasPorOperador[operador].renovacao > 0
    ).length / itemsPerPage
  );

  const indexOfLastRecorenciaOperator = currentPageRecorencia * itemsPerPage;
  const indexOfFirstRecorenciaOperator =
    indexOfLastRecorenciaOperator - itemsPerPage;

  const currentRecorenciaOperators = allOperators
    .filter((operador) => vendasPorOperador[operador].recorencia > 0)
    .slice(indexOfFirstRecorenciaOperator, indexOfLastRecorenciaOperator);

  const totalRecorenciaPages = Math.ceil(
    Object.keys(vendasPorOperador).filter(
      (operador) => vendasPorOperador[operador].recorencia > 0
    ).length / itemsPerPage
  );

  console.log(currentRecorenciaOperators);

  return (
    <section className="dashboard">
      <div className="bg-relatorio">
        <div className="ranking renovacao">
          <h4 className="total-contrato">Total Renovação: {totalRenovacao}</h4>
          <div className="podio">
            {topRenovacao.map((operador, index) => {
              const avatar = usuariosMap[usuariosPorNome[operador]]?.avatar;
              return (
                <div key={operador} className={`colocacao${index + 1}`}>
                  <img
                    src={avatar}
                    alt={`${operador} Avatar`}
                    className="img-podio"
                  />
                  <span className="operador-podio">
                    {operador.replace(/\./g, " ")}
                  </span>
                  <span className="vendas-podio">
                    {vendasPorOperador[operador].renovacao}
                  </span>
                </div>
              );
            })}
          </div>
          <ul className="tabela-ranking text-center">
            {currentRenovacaoOperators.map((operador) => {
              const avatar = usuariosMap[usuariosPorNome[operador]]?.avatar;
              return (
                <li
                  key={operador}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img
                    src={avatar}
                    alt={`${operador} Avatar`}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                    className="foto-ranking"
                  />
                  <span className="nome-operador">
                    {operador.replace(/\./g, " ")}
                  </span>
                  <h2 className="vendas-operador">
                    {vendasPorOperador[operador].renovacao}
                  </h2>
                </li>
              );
            })}
          </ul>
          <div className="paginacao">
            <button
              onClick={() =>
                setCurrentPageRenovacao((prev) => Math.max(prev - 1, 1))
              }
              disabled={currentPageRenovacao === 1}
            >
              <FontAwesomeIcon icon={faLeftLong} />
            </button>
            <span>
              {currentPageRenovacao} / {totalRenovacaoPages}
            </span>
            <button
              onClick={() =>
                setCurrentPageRenovacao((prev) =>
                  Math.min(prev + 1, totalRenovacaoPages)
                )
              }
              disabled={currentPageRenovacao === totalRenovacaoPages}
            >
              <FontAwesomeIcon icon={faRightLong} />
            </button>
          </div>
        </div>
        <div className="ranking base">
          <h4 className="total-contrato">Total Base: {totalBase}</h4>
          <div className="podio">
            {topBase.map((operador, index) => {
              const avatar = usuariosMap[usuariosPorNome[operador]]?.avatar;
              return (
                <div key={operador} className={`colocacao${index + 1}`}>
                  <img
                    src={avatar}
                    alt={`${operador} Avatar`}
                    className="img-podio"
                  />
                  <span className="operador-podio">
                    {operador.replace(/\./g, " ")}
                  </span>
                  <span className="vendas-podio">
                    {vendasPorOperador[operador].base}
                  </span>
                </div>
              );
            })}
          </div>
          <ul className="tabela-ranking text-center">
            {currentBaseOperators.map((operador) => {
              const avatar = usuariosMap[usuariosPorNome[operador]]?.avatar;
              return (
                <li
                  key={operador}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img
                    src={avatar}
                    alt={`${operador} Avatar`}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                    className="foto-ranking"
                  />
                  <span className="nome-operador">
                    {operador.replace(/\./g, " ")}
                  </span>
                  <h2 className="vendas-operador">
                    {vendasPorOperador[operador].base}
                  </h2>
                </li>
              );
            })}
          </ul>
          <div className="paginacao">
            <button
              onClick={() =>
                setCurrentPageBase((prev) => Math.max(prev - 1, 1))
              }
              disabled={currentPageBase === 1}
            >
              <FontAwesomeIcon icon={faLeftLong} />
            </button>
            <span>
              {currentPageBase} / {totalBasePages}
            </span>
            <button
              onClick={() =>
                setCurrentPageBase((prev) => Math.min(prev + 1, totalBasePages))
              }
              disabled={currentPageBase === totalBasePages}
            >
              <FontAwesomeIcon icon={faRightLong} />
            </button>
          </div>
        </div>
        <div className="ranking base">
          <h4 className="total-contrato">
            Total Recorrência: {totalRecorencia}
          </h4>
          <div className="podio">
            {topRecorencia.map((operador, index) => {
              const avatar = usuariosMap[usuariosPorNome[operador]]?.avatar;
              return (
                <div key={operador} className={`colocacao${index + 1}`}>
                  <img
                    src={avatar}
                    alt={`${operador} Avatar`}
                    className="img-podio"
                  />
                  <span className="operador-podio">
                    {operador.replace(/\./g, " ")}
                  </span>
                  <span className="vendas-podio">
                    {vendasPorOperador[operador].recorencia}
                  </span>
                </div>
              );
            })}
          </div>
          <ul className="tabela-ranking text-center">
            {currentRecorenciaOperators.map((operador) => {
              const avatar = usuariosMap[usuariosPorNome[operador]]?.avatar;
              return (
                <li
                  key={operador}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img
                    src={avatar}
                    alt={`${operador} Avatar`}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                    className="foto-ranking"
                  />
                  <span className="nome-operador">
                    {operador.replace(/\./g, " ")}
                  </span>
                  <h2 className="vendas-operador">
                    {vendasPorOperador[operador].recorencia}
                  </h2>
                </li>
              );
            })}
          </ul>
          <div className="paginacao">
            <button
              onClick={() =>
                setCurrentPageRecorencia((prev) => Math.max(prev - 1, 1))
              }
              disabled={currentPageRecorencia === 1}
            >
              <FontAwesomeIcon icon={faLeftLong} />
            </button>
            <span>
              {currentPageRecorencia} / {totalRecorenciaPages}
            </span>
            <button
              onClick={() =>
                setCurrentPageRecorencia((prev) =>
                  Math.min(prev + 1, totalRecorenciaPages)
                )
              }
              disabled={currentPageRecorencia === totalRecorenciaPages}
            >
              <FontAwesomeIcon icon={faRightLong} />
            </button>
          </div>
        </div>
        <div className="total-vendas">
          <h4>
            Total de vendas: {totalBase + totalRenovacao + totalRecorencia}
          </h4>
        </div>
      </div>
    </section>
  );
};
