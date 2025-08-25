import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../Config/firebase/firebaseConfig";

export function useUserData() {
  const [userData, setUserData] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setLoadingUser(false);
        return;
      }

      try {
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.warn("Documento do usuário não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário: ", error);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserData();
  }, []); 

  return { userData, loadingUser };
}
