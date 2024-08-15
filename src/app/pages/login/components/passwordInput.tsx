import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface PasswordInputProps { 
    id: string; 
    className: string; 
    placeholder: string; 
    value: string; 
    onChange: (e: any) => void; 
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ placeholder = 'Insira sua senha', id, className }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-container">
      <input
        type={showPassword ? 'text' : 'password'}
        id={id}
        placeholder={placeholder}
        className={className}
      />
      <button type="button" onClick={togglePasswordVisibility} className="toggle-password">
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
      </button>
    </div>
  );
};
