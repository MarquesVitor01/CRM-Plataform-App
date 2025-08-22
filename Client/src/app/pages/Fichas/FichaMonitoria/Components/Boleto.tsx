import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../global/Config/firebase/firebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/fichamonitoria.css";

interface BoletoData {
  barcode: string;
  billetLink: string;
  expireAt: string;
  pdfLink: string;
  status: string;
  chargeId: string;
  pix: string;
  link: string;
}

export const Boleto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [clientData, setClientData] = useState<any>(null);
  const [, setBoletoDataList] = useState<BoletoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingBoleto, setGeneratingBoleto] = useState(false);
  const [boletoGerado, setBoletoGerado] = useState(false); // ✅ estado de validação

  const fetchClientData = useCallback(async () => {
    if (!id) return;

    try {
      const docRef = doc(db, "vendas", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setClientData(data);

        // ✅ Verifica se já tem boleto salvo
        if (Array.isArray(data.boleto) && data.boleto.length > 0) {
          setBoletoGerado(true);
          setBoletoDataList(data.boleto);
        } else {
          setBoletoGerado(false);
        }
      } else {
        console.error("Cliente não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar os dados do cliente:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchClientData();
  }, [fetchClientData]);

  const NomeRecorrente = clientData?.responsavel
    ? `R - ${clientData.responsavel}`
    : "Nome Padrão";

  const generateBoletos = async (url: string, isCpf: boolean) => {
    setGeneratingBoleto(true);

    try {
      if (!clientData || !clientData.parcelas) {
        throw new Error("Dados do cliente ou número de parcelas ausentes.");
      }

      const boletosGerados: BoletoData[] = [];

      let vencimentoBase;
      try {
        vencimentoBase = new Date(clientData.dataVencimento);
        if (isNaN(vencimentoBase.getTime())) {
          throw new Error("Data de vencimento inválida.");
        }
      } catch (error) {
        console.error("Erro ao processar data de vencimento:", error);
        throw new Error("Erro no formato da data de vencimento.");
      }

      const diaVencimento = vencimentoBase.getDate();

      for (let i = 0; i < clientData.parcelas; i++) {
        const vencimento = new Date(vencimentoBase);
        vencimento.setMonth(vencimento.getMonth() + i);
        vencimento.setDate(diaVencimento);

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer <ACCESS_TOKEN>`,
          },
          body: JSON.stringify({
            ...(isCpf
              ? {
                  name:
                    clientData.contrato === "Recorencia"
                      ? NomeRecorrente
                      : clientData.responsavel,
                  cpf: clientData.cpf,
                  birth: "1977-01-15",
                }
              : {
                  juridical_person: {
                    corporate_name: clientData.razaoSocial,
                    cnpj: clientData.cnpj,
                  },
                }),
            email: clientData.email1,
            phone_number: clientData.celular,
            address: {
              street: clientData.enderecoComercial,
              number: clientData.numeroResidencial,
              neighborhood: clientData.bairro,
              zipcode: clientData.cep,
              city: clientData.cidade,
              complement: "",
              state: clientData.estado,
            },
            items: [
              {
                name: clientData.validade,
                value: Number(
                  clientData.parcelas === 1
                    ? clientData.valorVenda
                    : clientData.valorParcelado
                ),
                amount: 1,
              },
            ],
            account: clientData.equipeMsg,
            dataVencimento: vencimento.toISOString().split("T")[0],
          }),
        });

        if (!response.ok) {
          const responseData = await response.json();
          throw new Error(
            `Erro na API: ${response.status} - ${JSON.stringify(responseData)}`
          );
        }

        const result = await response.json();
        const { data } = result;

        boletosGerados.push({
          barcode: data.barcode,
          pix: data.pix?.qrcode || "N/A",
          billetLink: data.billet_link,
          expireAt: vencimento.toISOString(),
          pdfLink: data.pdf.charge,
          status: data.status,
          chargeId: data.charge_id,
          link: data.link,
        });
      }

      // ✅ Salva no Firestore
      const docRef = doc(db, "vendas", id!);
      await updateDoc(docRef, { boleto: boletosGerados });

      setBoletoDataList(boletosGerados);
      setBoletoGerado(true); // ✅ Marca como gerado
      toast.success("Boletos gerados com sucesso!");
    } catch (error) {
      console.error("Erro ao gerar boletos:", error);
      toast.error(
        error instanceof Error ? error.message : "Erro desconhecido."
      );
    } finally {
      setGeneratingBoleto(false);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    clientData && (
      <div className="mt-5 text-center">
        {boletoGerado ? (
          <p className="text-black fw-bold">✅ Boleto já foi gerado!</p>
        ) : (
          <>
            {clientData?.cpf && (
              <button
                className="btn btn-primary m-2"
                onClick={() =>
                  generateBoletos(
                    "https://crm-plataform-app-6t3u.vercel.app/generate-boleto-cpf",
                    true
                  )
                }
                disabled={generatingBoleto || boletoGerado}
              >
                {generatingBoleto
                  ? "Gerando Boletos..."
                  : "Gerar Boletos com CPF"}
              </button>
            )}
            {clientData?.cnpj && (
              <button
                className="btn btn-primary m-2"
                onClick={() =>
                  generateBoletos(
                    "https://crm-plataform-app-6t3u.vercel.app/generate-boleto-cnpj",
                    false
                  )
                }
                disabled={generatingBoleto || boletoGerado}
              >
                {generatingBoleto
                  ? "Gerando Boletos..."
                  : "Gerar Boletos com CNPJ"}
              </button>
            )}
          </>
        )}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    )
  );
};
