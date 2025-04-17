import React, { useEffect, useState } from "react";
import "./Styles/fichamonitoria.css";
import { FichaMonitoriaGrave } from "./Components/FichaMonitoriaGrave";
import { FichaMonitoriaAuditoria } from "./Components/FichaMonitoriaAuditoria";
import { FichaMonitoriaQualidade } from "./Components/fichaMonitoriaQualidade";
import { FichaMonitoriaConfirmacao } from "./Components/FichaMonitoriaConfirmacao";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "googleapis/build/src/apis/storage";
import { storage as firebaseStorage } from "../../../firebase/firebaseConfig";
interface ClientData {
  googleInfoYes: boolean;
  googleInfoNo: boolean;
  discountWithoutAuthorizationYes: boolean;
  discountWithoutAuthorizationNo: boolean;
  vencimentoYes: boolean;
  vencimentoNo: boolean;
  observation: string;
  nameInfoYes: boolean;
  nameInfoNo: boolean;
  mapsInfoYes: boolean;
  mapsInfoNo: boolean;
  infosYes: boolean;
  infosNo: boolean;
  optionsBuyYes: boolean;
  optionsBuyNo: boolean;
  confirmacaoYes: boolean;
  confirmacaoNo: boolean;
  nomeAutorizanteYes: boolean;
  nomeAutorizanteNo: boolean;
  nameClientYes: boolean;
  nameClientNo: boolean;
  valorDataYes: boolean;
  valorDataNo: boolean;
  monitoriaConcluidaYes: boolean;
  monitoriaConcluidaNo: boolean;
  nomeMonitor: string;
  linkGravacao: string;
  // qrcodeText: string;
}

export const FichaMonitoria: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        if (id) {
          const docRef = doc(db, "vendas", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setClientData(docSnap.data() as ClientData);
          } else {
            console.log("Cliente não encontrado.");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar os dados do cliente: ", error);
      }
    };

    fetchClientData();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, type, value } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setClientData((prevData) => {
      if (prevData) {
        const updatedData: ClientData = {
          ...prevData,
          [id]: type === "checkbox" ? checked : value,
        };
        console.log("Dados do cliente atualizados: ", updatedData);
        return updatedData;
      }
      return prevData;
    });
  };

  const updateClientData = async () => {
    if (id && clientData) {
      try {
        const updatedData = Object.fromEntries(
          Object.entries(clientData).filter(
            ([, value]) => value !== "" && value !== null && value !== undefined
          )
        );

        if (Object.keys(updatedData).length) {
          // Atualiza a ficha na coleção "vendas"
          const docRef = doc(db, "vendas", id);
          await setDoc(docRef, updatedData, { merge: true });

          // Verifica se deve adicionar em "marketings"
          if (clientData.monitoriaConcluidaYes) {
            await adicionarClienteMarketing();
          }

          navigate("/monitoria");
        } else {
          console.error("Nenhum campo válido para atualizar.");
        }
      } catch (error) {
        console.error("Erro ao atualizar os dados do cliente: ", error);
      }
    }
  };

  const adicionarClienteMarketing = async () => {
    if (!id || !clientData) return;

    try {
      const marketingRef = doc(db, "marketings", id);
      const marketingSnap = await getDoc(marketingRef);

      if (marketingSnap.exists()) {
        const confirmAdd = window.confirm(
          "Este cliente já existe na coleção 'marketings'. Deseja adicionar como uma nova cópia?"
        );

        if (confirmAdd) {
          // Encontra o próximo número de cópia disponível
          let copyNumber = 1;
          let newId = `${id}_copia${copyNumber}`;
          let newDocRef = doc(db, "marketings", newId);

          // Verifica se a cópia já existe
          while ((await getDoc(newDocRef)).exists()) {
            copyNumber++;
            newId = `${id}_copia${copyNumber}`;
            newDocRef = doc(db, "marketings", newId);
          }

          // Adiciona o documento com o novo ID
          await setDoc(newDocRef, {
            ...clientData,
            origem: "monitoria",
            dataAdicionado: new Date().toISOString(),
            originalId: id, // Mantém referência ao ID original
            isCopy: true,
            copyNumber: copyNumber,
          });

          console.log(`Cliente adicionado como cópia com ID: ${newId}`);
        }
      } else {
        // Se não existe, adiciona normalmente
        await setDoc(marketingRef, {
          ...clientData,
          origem: "monitoria",
          dataAdicionado: new Date().toISOString(),
        });
        console.log("Cliente adicionado à coleção 'marketings'");
      }
    } catch (error) {
      console.error("Erro ao adicionar cliente aos marketings: ", error);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateClientData();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && clientData) {
      const file = e.target.files[0];
      const storageRef = ref(firebaseStorage, `images/${id}/${file.name}`);

      try {
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);

        setClientData((prevData) => {
          if (prevData) {
            return { ...prevData, imagemUrl: url };
          }
          return prevData;
        });

        console.log("Imagem enviada com sucesso:", url);
      } catch (error) {
        console.error("Erro ao enviar a imagem:", error);
      }
    }
  };

  return (
    <div className="ficha-monitoria">
      <form onSubmit={handleSubmit}>
        {clientData && step === 0 && (
          <FichaMonitoriaQualidade
            form={clientData}
            handleInputChange={handleInputChange}
          />
        )}
        {clientData && step === 1 && (
          <FichaMonitoriaAuditoria
            form={clientData}
            handleInputChange={handleInputChange}
          />
        )}
        {clientData && step === 2 && (
          <FichaMonitoriaGrave
            form={clientData}
            handleInputChange={handleInputChange}
          />
        )}
        {clientData && step === 3 && (
          <FichaMonitoriaConfirmacao
            form={clientData}
            handleInputChange={handleInputChange}
            handleImageUpload={handleImageUpload}
          />
        )}
        <div className="mt-4 d-flex gap-4 justify-content-center">
          {step === 0 && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => window.history.back()}
            >
              Sair
            </button>
          )}
          {step > 0 && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setStep(step - 1)}
            >
              Voltar
            </button>
          )}
          {step < 3 && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setStep(step + 1)}
            >
              Próximo
            </button>
          )}
          {step <= 3 && (
            <button type="submit" className="btn btn-success">
              Salvar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
