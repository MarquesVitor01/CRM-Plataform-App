import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

interface CampoLinkContratoProps {
  idVenda?: string;
  linkAtual?: string;
}

function CampoLinkContrato({ idVenda, linkAtual }: CampoLinkContratoProps) {
  const [linkContrato, setLinkContrato] = useState(linkAtual || "");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (!idVenda) return;

    const fetchLinkContrato = async () => {
      try {
        const docRef = doc(db, "vendas", idVenda);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.contratoAssinado) {
            setLinkContrato(data.contratoAssinado);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar link do contrato:", error);
      }
    };

    fetchLinkContrato();
  }, [idVenda]);

  const salvarLink = async () => {
    if (!linkContrato) {
      alert("Insira o link do contrato.");
      return;
    }
    if (!idVenda) {
      alert("ID da venda não encontrado.");
      return;
    }

    try {
      setCarregando(true);
      const docRef = doc(db, "vendas", idVenda);
      await updateDoc(docRef, {
        contratoAssinado: linkContrato,
      });
      alert("Link do contrato salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar o link:", error);
      alert("Erro ao salvar o link no banco de dados.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="col-md-10 card p-3">
      <label htmlFor="linkContrato" className="form-label fw-bold">
        Link do contrato assinado
      </label>
      <input
        type="url"
        className="form-control mb-2"
        id="linkContrato"
        placeholder="https://exemplo.com/contrato-assinado"
        value={linkContrato}
        onChange={(e) => setLinkContrato(e.target.value)}
      />
      <button
        className="btn btn-success mt-2 w-25 mx-auto"
        onClick={salvarLink}
        disabled={carregando}
      >
        {carregando ? "Salvando..." : "Salvar link"}
      </button>
    </div>
  );
}

export default CampoLinkContrato;
