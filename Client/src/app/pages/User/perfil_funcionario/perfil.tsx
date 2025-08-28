import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../global/Config/context/AuthContext";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../global/Config/firebase/firebaseConfig";
import HeaderPerfil from "./Components/HeaderPerfil";
import InfoPerfil from "./Components/InfoPerfil";
import ModalEditarFoto from "./Components/ModalEditarFoto";
import "./Components/perfil.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import Proposta from "./Components/Proposta";

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

const avatarOptions = ["https://grupomapscartaodigital.com.br/img/mps.jpg"];
const ADMIN_USER_ID = process.env.REACT_APP_ADMIN_USER_ID;

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
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [showUserList, setShowUserList] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProposta, setModalProposta] = useState(false);

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
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
        }));
      } else {
        await setDoc(docRef, {
          nome: user.email?.split("@")[0],
          email: user.email,
          cargo: user.cargo,
          avatar: avatarOptions[0],
        });
        setPerfilData((prevData) => ({
          ...prevData,
          nome: user.email?.split("@")[0],
          email: user.email,
          cargo: user.cargo,
        }));
      }

      setLoading(false);
    };

    loadPerfilData();
  }, [user]);

  useEffect(() => {
    const fetchVendas = async () => {
      const vendasCollection = collection(db, "vendas");
      const vendasSnapshot = await getDocs(vendasCollection);
      const vendasList = vendasSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      calcularMetricas(vendasList);
    };

    const calcularMetricas = (vendas: any[]) => {
      const now = new Date();
      const firstDayOfWeek = new Date(now);
      firstDayOfWeek.setDate(now.getDate() - now.getDay());

      let total = 0,
        diarias = 0,
        semanais = 0,
        mensais = 0;

      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);

      const startOfYesterday = new Date(yesterday.setHours(0, 0, 0, 0));
      const endOfYesterday = new Date(yesterday.setHours(23, 59, 59, 999));

      const vendasFiltradas =
        user?.uid === ADMIN_USER_ID
          ? vendas
          : vendas.filter((venda) => venda.createdBy === user?.uid);

      vendasFiltradas.forEach((venda) => {
        const vendaData = new Date(venda.data);

        if (isNaN(vendaData.getTime())) {
          console.error("Data inválida para venda:", venda.data);
          return;
        }

        total++;

        if (vendaData >= startOfYesterday && vendaData <= endOfYesterday) {
          diarias++;
        }

        if (vendaData >= firstDayOfWeek && vendaData <= now) {
          semanais++;
        }

        if (
          vendaData.getMonth() === now.getMonth() &&
          vendaData.getFullYear() === now.getFullYear()
        ) {
          mensais++;
        }
      });

      setPerfilData((prevData) => ({
        ...prevData,
        totalVendas: total,
        vendasDiarias: diarias,
        vendasSemanais: semanais,
        vendasMensais: mensais,
      }));
    };

    fetchVendas();
  }, [user]);

  useEffect(() => {
    if (user?.uid === ADMIN_USER_ID && showUserList) {
      const fetchUsuarios = async () => {
        const usuariosCollection = collection(db, "usuarios");
        const usuariosSnapshot = await getDocs(usuariosCollection);
        setUsuarios(
          usuariosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      };
      fetchUsuarios();
    }
  }, [user, showUserList]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Falha ao deslogar:", error);
    }
  };

  const handleChangePassword = async () => {
    if (!user) return;

    const senhaRef = doc(db, "senhas", "senhaCorreta");
    const senhaSnap = await getDoc(senhaRef);

    if (senhaSnap.exists() && senhaSnap.data().senha === oldPassword) {
      await updateDoc(senhaRef, { senha: newPassword });
      setPasswordError("");
      setShowChangePasswordModal(false);
      alert("Senha alterada com sucesso!");
    } else {
      setPasswordError("Senha antiga incorreta.");
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
      </div>

      <footer className="profile-footer mt-5">
        <button
          className="btn btn-secondary"
          onClick={() => setModalProposta(true)}
        >
          Enviar Proposta
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Editar Foto
        </button>
        {user?.uid === ADMIN_USER_ID && (
          <button
            className="btn btn-warning"
            onClick={() => setShowChangePasswordModal(true)}
          >
            Alterar Senha
          </button>
        )}
        <button className="btn btn-danger" onClick={handleLogout}>
          Sair
        </button>
      </footer>

      <ModalEditarFoto
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={async (newFotoUrl: string) => {
          if (user) {
            const docRef = doc(db, "usuarios", user.uid);
            await setDoc(docRef, { avatar: newFotoUrl }, { merge: true });
            setPerfilData((prevData) => ({ ...prevData, avatar: newFotoUrl }));
          }
        }}
      />

      {modalProposta && (
        <Proposta
          isOpen={modalProposta}
          onClose={() => setModalProposta(false)}
          onSave={() => {}}
        />
      )}

      <Modal
        show={showChangePasswordModal}
        onHide={() => setShowChangePasswordModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Alterar Senha</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="password"
            placeholder="Senha Antiga"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="form-control mb-3"
          />
          <input
            type="password"
            placeholder="Nova Senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="form-control mb-3"
          />
          {passwordError && <p className="text-danger">{passwordError}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowChangePasswordModal(false)}
          >
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleChangePassword}>
            Alterar Senha
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
