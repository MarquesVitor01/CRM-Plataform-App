import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../global/Config/firebase/firebaseConfig";
import { toast, ToastContainer } from "react-toastify";

interface CampoLinkContratoProps {
  idVenda?: string;
}

function CampoLinkContrato({ idVenda }: CampoLinkContratoProps) {
  const [links, setLinks] = useState({
    linkParaAssinatura: "",
    contratoAssinado: "",
  });
  const [loading, setLoading] = useState({
    assinatura: false,
    assinado: false,
  });

  useEffect(() => {
    if (!idVenda) return;

    const fetchLinksContrato = async () => {
      try {
        const docSnap = await getDoc(doc(db, "vendas", idVenda));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setLinks({
            linkParaAssinatura: data.linkParaAssinatura || "",
            contratoAssinado: data.contratoAssinado || "",
          });
        }
      } catch (error) {
        console.error("Erro ao buscar links do contrato:", error);
      }
    };

    fetchLinksContrato();
  }, [idVenda]);

  const salvarLink = async (campo: "linkParaAssinatura" | "contratoAssinado") => {
    if (!links[campo]) {
      alert(`Insira o ${campo === "linkParaAssinatura" ? "link para assinatura" : "link do contrato assinado"}.`);
      return;
    }
    if (!idVenda) {
      alert("ID da venda não encontrado.");
      return;
    }

    try {
      setLoading((prev) => ({ ...prev, [campo === "linkParaAssinatura" ? "assinatura" : "assinado"]: true }));
      await updateDoc(doc(db, "vendas", idVenda), { [campo]: links[campo] });
      toast.success(`Link ${campo === "linkParaAssinatura" ? "para assinatura" : "do contrato assinado"} salvo com sucesso!`);
    } catch (error) {
      console.error(`Erro ao salvar o ${campo}:`, error);
      alert(`Erro ao salvar o ${campo} no banco de dados.`);
    } finally {
      setLoading((prev) => ({ ...prev, [campo === "linkParaAssinatura" ? "assinatura" : "assinado"]: false }));
    }
  };

  return (
    <div className="card p-3 card-link">
      <div className="justify-content-center d-flex text-center">
        {[
          { label: "Link do contrato", campo: "linkParaAssinatura", btnClass: "btn-primary" },
          // { label: "Link do contrato assinado", campo: "contratoAssinado", btnClass: "btn-success" },
        ].map(({ label, campo, btnClass }) => (
          <div className="mb-4" key={campo}>
            <label className="form-label fw-bold">{label}</label>
            <input
              type="url"
              className="form-control"
              placeholder={`https://exemplo.com/${campo}`}
              value={links[campo as keyof typeof links]}
              onChange={(e) => setLinks((prev) => ({ ...prev, [campo]: e.target.value }))}
            />
            <button
              className={`btn ${btnClass} mt-2 w-100`}
              onClick={() => salvarLink(campo as "linkParaAssinatura" | "contratoAssinado")}
              disabled={loading[campo === "linkParaAssinatura" ? "assinatura" : "assinado"]}
            >
              {loading[campo === "linkParaAssinatura" ? "assinatura" : "assinado"] ? "Salvando..." : `Salvar ${label.toLowerCase()}`}
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default CampoLinkContrato;
