import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../../global/Config/firebase/firebaseConfig";

export const Bonus: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [clientData, setClientData] = useState<any>(null);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        if (id) {
          const docRef = doc(db, "vendas", id);
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
      <div className="bonus card text-center p-4">
        <h5 className="text-white ">DECLARAÇÃO DE CIÊNCIA E AUTORIZAÇÃO</h5>
        <div className="form-group">
          <p className="text-uppercase">
            <strong>
              Declaro, para os devidos fins, que recebi por ligação telefônica
              todas as informações referentes ao plano contratado, incluindo
              condições, valores e forma de execução do serviço.
              <br /> Autorizo a empresa G.MAPS CONTACT CENTER LTDA a realizar toda a assessoria e otimização do perfil da minha empresa no Google Maps, conforme as condições descritas neste documento.
            </strong>
          </p>
        </div>

        <div className="assinatura-section pt-5">
          <div className="linha-assinatura"></div>
        </div>
      </div>
    )
  );
};
