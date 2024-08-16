import React from 'react';
import './Components/perfil.css';
import foto_perfil from '../../Assets/pessoa.avif'

export const Perfil: React.FC = () => {
    // Dados fictícios
    const profile = {
        fotoUrl: foto_perfil,
        nome: 'Guilherme Silva',
        login: 'guilherme.s@grupomapsempresas.com.br',
        idade: 30,
        totalVendas: 1000,
        vendasMensais: 200,
        vendasSemanais: 50,
        vendasDiarias: 10,
    };

    return (
        <div className='perfil'>
            <div className="overlay">
                <div className="perfil-box row">
                    <div className="profile-header col-md-6">
                        <img src={profile.fotoUrl} alt="Profile" className="profile-photo" />
                        <h1>{profile.nome}</h1>
                        <h5>{profile.login}</h5>
                        <p>Idade: {profile.idade} anos</p>
                    </div>
                    <div className="profile-stats col-md-6">
                        <div className="stat col-md-4">
                            <h2>Total de Vendas</h2>
                            <p>{profile.totalVendas}</p>
                        </div>
                        <div className="stat col-md-4">
                            <h2>Vendas Mensais</h2>
                            <p>{profile.vendasMensais}</p>
                        </div>
                        <div className="stat col-md-4">
                            <h2>Vendas Semanais</h2>
                            <p>{profile.vendasSemanais}</p>
                        </div>
                        <div className="stat col-md-4">
                            <h2>Vendas Diárias</h2>
                            <p>{profile.vendasDiarias}</p>
                        </div>
                    </div>

                    <button className='btn-perfil'>Encerrar Sessão</button>
                </div>
            </div>
        </div>
    );
};
