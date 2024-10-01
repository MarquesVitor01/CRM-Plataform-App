// Components/HeaderPerfil.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

interface HeaderPerfilProps {
  nome: string;
  fotoUrl: string;
  login: string;
}

const HeaderPerfil: React.FC<HeaderPerfilProps> = ({ nome, fotoUrl, login }) => {
  return (
    <header className="profile-header">
      <div className="profile-header-content">
        <img src={fotoUrl} alt="Profile" className="profile-pic" />
        <div className="profile-info">
          <h1 className="profile-name">{nome}</h1>
          <p className="profile-title">Gerente de Vendas</p>
          <p className="profile-email">
            <FontAwesomeIcon icon={faEnvelope} className="icon-email" /> {login}
          </p>
        </div>
      </div>
    </header>
  );
};

export default HeaderPerfil;
