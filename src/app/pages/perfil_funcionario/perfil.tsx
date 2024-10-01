import React, { useState } from "react";
import HeaderPerfil from "./Components/HeaderPerfil";
import InfoPerfil from "./Components/InfoPerfil";
import ModalEditarFoto from "./Components/ModalEditarFoto";
import foto_perfil from "../../Assets/pessoa.avif";
import "./Components/perfil.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const Perfil: React.FC = () => {
  const profileData = {
    fotoUrl: foto_perfil,
    nome: "Guilherme Silva",
    login: "guilherme.s@grupomapsempresas.com.br",
    totalVendas: 1000,
    vendasMensais: 200,
    vendasSemanais: 50,
    vendasDiarias: 10,
  };

  const [profile, setProfile] = useState(profileData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveFoto = (newFotoUrl: string) => {
    setProfile({ ...profile, fotoUrl: newFotoUrl });
  };

  const backHome = () => {
    window.history.back();
  }

  return (
    <div className="profile">
      <div className="bg-perfil"></div>
      <button className="btn btn-danger btn-voltar-perfil" onClick={backHome}>
        <FontAwesomeIcon icon={faArrowLeft} />

      </button>
      <div className="crm-profile">
        <HeaderPerfil
          nome={profile.nome}
          fotoUrl={profile.fotoUrl}
          login={profile.login}
        />
        <InfoPerfil
          totalVendas={profile.totalVendas}
          vendasMensais={profile.vendasMensais}
          vendasSemanais={profile.vendasSemanais}
          vendasDiarias={profile.vendasDiarias}
        />
        <footer className="profile-footer">
          <button
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            Editar Foto
          </button>
        </footer>
      </div>

      <ModalEditarFoto
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveFoto}
      />
    </div>
  );
};

export default Perfil;
