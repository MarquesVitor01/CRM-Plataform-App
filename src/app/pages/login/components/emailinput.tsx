import React from 'react';

interface EmailInputProps { 
    id: string; 
    className: string; 
    placeholder: string; 
    value: string; 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}

export const EmailInput: React.FC<EmailInputProps> = ({ id, className, placeholder = 'Digite seu email', value, onChange }) => {
  return (
    <div className="email-container">
      <input
        type="email"
        id={id}
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
