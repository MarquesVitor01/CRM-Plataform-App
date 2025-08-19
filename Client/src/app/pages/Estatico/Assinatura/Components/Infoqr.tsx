import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../../global/Config/firebase/firebaseConfig";
import { QRCodeSVG } from "qrcode.react";

export const Infoqr: React.FC = () => {
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
      <div className="bonus text-center">
        <div className="qrcode-container">
          {clientData.linkGoogle && (
            <div className="qrcode-assinatura">
              <QRCodeSVG value={clientData.linkGoogle} size={90} />
              <p>
                LINK DA PÁGINA:{" "}
                <a
                  href={clientData.linkGoogle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {clientData.linkGoogle}
                </a>
              </p>{" "}
            </div>
          )}
        </div>
      </div>
    )
  );
};
