import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import HeaderPerfil from "./Components/HeaderPerfil";
import InfoPerfil from "./Components/InfoPerfil";
import ModalEditarFoto from "./Components/ModalEditarFoto";
import "./Components/perfil.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface PerfilData {
  nome: string;
  email: string;
  avatar: string;
  cargo: string;
  totalVendas: number;
  vendasMensais: number;
  vendasSemanais: number;
  vendasDiarias: number;
}

const avatarOptions = [
  "https://grupomapscartaodigital.com.br/img/mps.jpg",
];

export const Perfil: React.FC = () => {
  const [perfilData, setPerfilData] = useState<PerfilData>({
    nome: "",
    email: "",
    cargo: "",
    totalVendas: 0,
    vendasMensais: 0,
    vendasSemanais: 0,
    vendasDiarias: 0,
    avatar: avatarOptions[0],
  });

  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadPerfilData = async () => {
      if (!user) return;

      const docRef = doc(db, "usuarios", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPerfilData((prevData) => ({
          ...prevData,
          avatar: docSnap.data()?.avatar || avatarOptions[0],
          nome: docSnap.data()?.nome || prevData.nome,
          email: user.email || prevData.email,
          cargo: docSnap.data()?.cargo || prevData.cargo,
          totalVendas: docSnap.data()?.totalVendas || prevData.totalVendas,
          vendasMensais: docSnap.data()?.vendasMensais || prevData.vendasMensais,
          vendasSemanais: docSnap.data()?.vendasSemanais || prevData.vendasSemanais,
          vendasDiarias: docSnap.data()?.vendasDiarias || prevData.vendasDiarias,
        }));
      } else {
        await setDoc(docRef, {
          nome: user.email?.split("@")[0],
          email: user.email,
          cargo: user.cargo,
          totalVendas: 0,
          vendasMensais: 0,
          vendasSemanais: 0,
          vendasDiarias: 0,
          avatar: avatarOptions[0],
        });
        setPerfilData((prevData) => ({
          ...prevData,
          nome: user.email?.split("@")[0],
          email: user.email,
          cargo: user.cargo
        }));
      }

      setLoading(false);
    };

    loadPerfilData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Falha ao deslogar:", error);
    }
  };

  const backHome = () => {
    window.history.back();
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="profile">
      <div className="bg-perfil"></div>
      <button className="btn btn-danger btn-voltar-perfil" onClick={backHome}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="crm-profile">
        <HeaderPerfil
          nome={perfilData.nome}
          avatar={perfilData.avatar}
          email={perfilData.email}
          cargo={perfilData.cargo}
        />
        <InfoPerfil
          totalVendas={perfilData.totalVendas}
          vendasMensais={perfilData.vendasMensais}
          vendasSemanais={perfilData.vendasSemanais}
          vendasDiarias={perfilData.vendasDiarias}
        />
        <footer className="profile-footer">
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            Editar Foto
          </button>
        </footer>
      </div>
          <button className="btn btn-danger mt-2" onClick={handleLogout}>
           Sair
        </button>
      

      <ModalEditarFoto
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={async (newFotoUrl: string) => {
          if (user) {
            const docRef = doc(db, "usuarios", user.uid);
            await setDoc(docRef, { avatar: newFotoUrl }, { merge: true });
          }

          setPerfilData((prev) => ({ ...prev, avatar: newFotoUrl }));
        }}
      />
    </div>
  );
};

export default Perfil;
