import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Config/firebase/firebaseConfig";

export function useClientData(id?: string) {
  const [clientData, setClientData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchClientData = async () => {
      try {
        const docRef = doc(db, "vendas", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setClientData(docSnap.data());
        } else {
          console.warn("Documento não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do cliente: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [id]);

  return { clientData, loading };
}
