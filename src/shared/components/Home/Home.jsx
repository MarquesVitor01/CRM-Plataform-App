import React, { useState } from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const Home = () => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const [recuperar, setRecuperar] = useState(false);

    const recuperador_senha = () => {
        setRecuperar(!recuperar);
    };

    return (
        <div className='Home'>
            <div className="cx-decoration">
                <svg className="cx-decoration__lines cx-decoration__top-left-lines"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 388 727" data-t="lines-svg" aria-labelledby="lines-svg"
                    role="img">
                    <title id="lines-svg">Lines</title>
                    <path
                        d="M168.269 66.4821L268.943 1.5908L268.401 0.750275L166.986 66.1194L1.1366 19.0246L0.863435 19.9866L165.874 66.8429L71.2691 127.822L0.729147 173.285L1.27088 174.126L95.4719 113.414L167.155 67.2068L291.724 102.579L143.515 419.707L1.41119 214.332L0.588844 214.901L143.025 420.756L0.546997 725.788L1.45303 726.212L143.684 421.711L223.665 537.305L224.487 536.736L144.175 420.662L292.701 102.855L386.952 129.618L387.226 128.656L293.131 101.937L340.122 1.38222L339.217 0.958847L292.156 101.66L168.269 66.4821Z">
                    </path>
                </svg>
                <svg className="cx-decoration__lines cx-decoration__top-right-lines" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 457 163" data-t="lines-svg" aria-labelledby="lines-svg" role="img">
                    <title id="lines-svg">Lines</title>
                    <path d="M456.334 162.725L0.333679 1.85438L0.66637 0.911346L456.666 161.782L456.334 162.725Z"></path>
                </svg>
                <svg className="cx-decoration__lines cx-decoration__bottom-left-lines" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 205 92" data-t="lines-svg" aria-labelledby="lines-svg" role="img">
                    <title id="lines-svg">Lines</title>
                    <path
                        d="M1.0608 0.0432434L89.5033 39.4213L126.086 55.7013L125.68 56.6149L89.0967 40.3349L0.654053 0.956785L1.0608 0.0432434ZM133.478 58.9914L134.904 59.6264L204.699 90.5414L204.702 90.5429L204.301 91.4586L204.298 91.4572L189.498 85.0306L189.494 85.0288L134.501 60.5418L133.007 59.8799L133.478 58.9914Z">
                    </path>
                </svg>
                <svg className="cx-decoration__lines cx-decoration__bottom-right-lines" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 814 424" data-t="lines-svg" aria-labelledby="lines-svg" role="img">
                    <title id="lines-svg">Lines</title>
                    <path
                        d="M555.302 -0.000961304L813.364 273.714L812.636 274.4L554.574 0.685034L555.302 -0.000961304ZM0.224352 237.744L326.769 280.873L279.047 245.432L279.643 244.63L328.809 281.142L813.066 345.104L812.935 346.095L330.464 282.37L519.798 422.972L519.202 423.775L328.424 282.101L0.0934143 238.736L0.224352 237.744Z">
                    </path>
                </svg>
            </div>

            <div className="container">
                <div className={`box-login ${recuperar ? 'hidden' : ''}`}>
                    <div className="title-box">
                        <h1 className="text-center mt-2">Login</h1>
                    </div>
                    <div className="text-center inputs-login">
                        <input type="email" placeholder="Digite o seu email" className="form-control" />
                        <div className="password-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="passwordField"
                                placeholder="Insira sua senha"
                                className="form-control"
                            />
                            <button type="button" onClick={togglePassword} className="toggle-password">
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        <div className="form-check my-3">
                            <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Lembrar
                            </label>
                        </div>
                        <Link to={''} className="btn btn-login mt-4">Login</Link>
                    </div>
                    <div className="text-center recuperar-senha">
                        <small>Esqueceu a senha?
                            <Link to={''} onClick={recuperador_senha} className={recuperar ? 'fazer-login' : 'recuperar-senha'}>
                                {recuperar ? 'Fazer Login' : ' Recuperar Senha'}
                            </Link>
                        </small>
                    </div>
                </div>
            </div>

            {recuperar && (
                <div className="overlay">
                    <div className="recuperar-senha-content text-center">
                        <h2>Recuperar Senha</h2>
                        <input type="email" name="" id="" placeholder='Digite seu email' className='form-control' />
                        <button onClick={() => setRecuperar(false)}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
}
