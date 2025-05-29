import { faCheckCircle, faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";
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
    if (!value) return "0,00";
    const num =
      typeof value === "number" ? value.toFixed(2) : value.replace(/\D/g, "");
    return num.replace(/(\d)(\d{2})$/, "$1,$2");
  };
  return (
    clientData && (
      <div className="condicoes card p-4 text-uppercase d-flex flex-column justify-content-between">

        <h5 className="text-center">Visualize sua página no Google</h5>
        <img
          src={require("../../../Assets/logo-google.png")}
          alt="WhatsApp"
          style={{ width: "100px" }}
        />
        <div className="qrcode-google">
          {clientData.linkGoogle && (
            <div className="d-flex flex-column align-items-center mt-1">
              <p className="">
                Escanei o QrCOde Para Verificar e conferir a página ou clique no
                link:
              </p>
              <QRCodeSVG
                value={clientData.linkGoogle}
                size={80}
                className=" mb-2"
              />
              <p className="">
                Link da Página:{" "}
                <a href={`${clientData.linkGoogle}`}>{clientData.linkGoogle}</a>
              </p>
            </div>
          )}
        </div>
        <div className="">
          <p className="">
            <a href="https://drive.google.com/file/d/10Q5zFIqR1l9YunhdawO2nhbSfALK_iih/view?usp=sharing">Termos de Serviço</a> e{" "}
            <a href="https://drive.google.com/file/d/1xTe9gL84D79-0OaayMUQPhiy3GFidxYO/view?usp=sharing">Política de Privacidade</a>
          </p>
        </div>
        <div className="assinatura-section justify-content-center d-flex flex-column">
          <div className="assinatura-section justify-content-center d-flex flex-column">
            <div className="d-flex align-items-center">
              <p className="mb-0 ms-1">
              <FontAwesomeIcon icon={faCheckCircle} color="#007bff" size="lg" />{"  "}
                Eu concordo com os termos de serviço e política de privacidade
              </p>
            </div>
            <div className="linha-assinatura mt-5"></div>
          </div>
        </div>
        <h5 className="mt-2 text-center">CENTRAL DE ATENDIMENTO</h5>
        <div className="text-center">
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
