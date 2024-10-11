import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebaseConfig";

type Option = "criacao" | "anuncio" | "cartaoDigital" | "logotipo";

export const Bonus: React.FC = () => {

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


  const [selectedOptions, setSelectedOptions] = useState({
    criacao: false,
    anuncio: false,
    cartaoDigital: true,
    logotipo: true,
  });

  const toggleOption = (option: Option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  return (
    clientData && (
    <div className="bonus card text-center mt-4">
      <h5 className="text-white py-2">BÔNUS</h5>
      <div className="d-flex justify-content-center my-3">
        <div className="mx-2" onClick={() => toggleOption("criacao")}>
          <strong
            style={{
              textDecoration: selectedOptions.criacao ? "none" : "line-through",
              color: selectedOptions.criacao ? "black" : "red",
            }}
          >
            Criação
          </strong>
        </div>
        <div className="mx-2" onClick={() => toggleOption("anuncio")}>
          <strong
            style={{
              textDecoration: selectedOptions.anuncio ? "none" : "line-through",
              color: selectedOptions.anuncio ? "black" : "red",
            }}
          >
            Anúncio
          </strong>
        </div>
        <div className="mx-2" onClick={() => toggleOption("cartaoDigital")}>
          <strong
            style={{
              textDecoration: selectedOptions.cartaoDigital
                ? "none"
                : "line-through",
              color: selectedOptions.cartaoDigital ? "black" : "red",
            }}
          >
            Cartão Digital
          </strong>
        </div>
        <div className="mx-2" onClick={() => toggleOption("logotipo")}>
          <strong
            style={{
              textDecoration: selectedOptions.logotipo
                ? "none"
                : "line-through",
              color: selectedOptions.logotipo ? "black" : "red",
            }}
          >
            Logotipo
          </strong>
        </div>
      </div>

      <div className="form-group">
        <p>
          <strong>
            Como acordado, segue o plano no valor de <u>R$ {clientData.valorVenda}</u>, a ser pago em <u>{clientData.parcelas} parcela(s)</u>, via <u>{clientData.formaPagamento}</u>, com o vencimento para o dia <u>08/10/2024</u>.
          </strong>
        </p>
      </div>

      <p className="mt-4">
        O PAGAMENTO PODE SER FEITO ATRAVÉS DO BOLETO BANCÁRIO OU PIX QR-CODE
        DISPONÍVEL NO BOLETO, ENVIADO ATRAVÉS DO E-MAIL E WHATSAPP DO
        CONTRATANTE.
        <br />
        ACEITE REALIZADO DE FORMA VERBAL; PARA VERIFICAR SUA ADESÃO.
        <br />
        APONTE A CÂMERA DO CELULAR PARA O QRCODE ABAIXO:
      </p>
      <div className="my-3">
        <img
          src="https://via.placeholder.com/150"
          alt="QR Code"
          style={{ width: "150px", height: "150px" }}
        />
      </div>

      <h5 className="mt-4">CENTRAL DE ATENDIMENTO</h5>
      <p>(11) 4200-6110 / 0800 050 0069</p>
      <p>
        <a href="mailto:MARKETING@GRUPOMAPSEMPRESAS.com.br">
          MARKETING@GRUPOMAPSEMPRESAS.com.br
        </a>
        <br />
        <a href="mailto:CONTATO@GRUPOMAPSEMPRESAS.com.br">
          CONTATO@GRUPOMAPSEMPRESAS.com.br
        </a>
      </p>
      <p>PARA ATENDIMENTO VIA WHATSAPP BASTA CLICAR NO ÍCONE ABAIXO:</p>
      <a
        href="https://wa.me/5511988888888"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="http://localhost:3000/img/img-wpp-contrato.webp"
          alt="WhatsApp"
          style={{ width: "200px" }}
        />
      </a>
    </div>
    )
  );
};
