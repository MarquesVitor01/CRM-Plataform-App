import { faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase/firebaseConfig";
import { QRCodeSVG } from "qrcode.react";

export const Condicoes: React.FC = () => {
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
  const formatValor = (value: string | number | undefined): string => {
    if (!value) return "0,00"; // Retorna um valor padrão caso seja undefined ou null
    const num =
      typeof value === "number" ? value.toFixed(2) : value.replace(/\D/g, "");
    return num.replace(/(\d)(\d{2})$/, "$1,$2");
  };
  return (
    clientData && (
      <div className="condicoes card p-4 text-uppercase">
        <h5 className="text-center">Visualize sua página no Google</h5>
        <img
          src={require("../../../Assets/logo-google.png")}
          alt="WhatsApp"
          style={{ width: "150px" }}
        />
        <div className="qrcode-container">
          {clientData.linkGoogle && (
            <div className="d-flex flex-column align-items-center mt-1">
              <h6 className="mt-2">
                Escanei o QrCOde Para Verificar e conferir a página ou clique no
                link:
              </h6>
              <QRCodeSVG value={clientData.linkGoogle} size={100} />
              <h6 className="mt-2">
                Link da Página:{" "}
                <a href={`${clientData.linkGoogle}`}>{clientData.linkGoogle}</a>
              </h6>
            </div>
          )}
        </div>
        <div className="">
          <h6 className="mt-2">
            <a href="">Termos de Serviço e Política de Privacidade</a>
          </h6>
        </div>
        <div className="assinatura-section justify-content-center d-flex flex-column ">
          <h6 className="">
            Eu concordo com os termos de serviço e política de privacidade
          </h6>
          <div className="linha-assinatura mt-5"></div>
        </div>
        <div className="mx-auto w-100 text-center">
          <h5 className="mt-2">CENTRAL DE ATENDIMENTO</h5>
          <p>
            0800 580 2766
            <br />
            <a href="mailto:MARKETING@GRUPOMAPSEMPRESAS.com.br">
              MARKETING@GRUPOMAPSEMPRESAS.com.br
            </a>
            <br />
            <a href="mailto:CONTATO@GRUPOMAPSEMPRESAS.com.br">
              CONTATO@GRUPOMAPSEMPRESAS.com.br
            </a>
          </p>
        </div>
      </div>
    )
  );
};
