import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

interface HeaderPerfilProps {
  nome: string;
  email: string;
  avatar: string;
  cargo: string;
}

const HeaderPerfilComponent: React.FC<HeaderPerfilProps> = ({ nome, avatar, cargo, email }) => {
  // Só loga quando cargo mudar
  useEffect(() => {
    console.log("Cargo atualizado no HeaderPerfil:", cargo);
  }, [cargo]);

  return (
    <header className="profile-header">
      <div className="profile-header-content">
        <img src={avatar} alt="Profile" className="profile-pic" />
        <div className="profile-info">
          <h1 className="profile-name">{nome}</h1>
          <p className="profile-title">{cargo}</p>
          <p className="profile-email">
            <FontAwesomeIcon icon={faEnvelope} className="icon-email" /> {email}
          </p>
        </div>
      </div>
    </header>
  );
};

// React.memo evita re-render se props não mudarem
export default React.memo(HeaderPerfilComponent);
