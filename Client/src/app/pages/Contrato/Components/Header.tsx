import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../firebaseConfig';

export const Header: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [clientData, setClientData] = useState<any>(null);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        if (id) {
          const docRef = doc(db, "clientes", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setClientData(docSnap.data());
          } else {
            console.log("Não encontrado");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar os dados do cliente: ", error);
      }
    };

    fetchClientData();
  }, [id]);

  return (
    clientData && (
      <div className="header text-center">
        <img
          src="http://localhost:3000/img/logo_contrato_maps.jpg"
          alt="Logo"
          className="mb-1"
        />

        <div className="row">
          <div className="col-md-4">
            <p><strong>CONTRATO Nº:</strong> {clientData.contrato}</p>
          </div>
          <div className="col-md-4">
            <p><strong>DATA:</strong> {clientData.data}</p>
          </div>
          <div className="col-md-4">
            <p><strong>OPERADOR:</strong> {clientData.operador}</p>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <strong>EQUIPE:</strong> {clientData.equipe}
          </div>
          <div className="col">
            <strong>Válido Por:</strong> {clientData.valido}
          </div>
        </div>
      </div>
    )
  );
};
