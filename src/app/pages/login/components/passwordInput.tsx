import React from 'react';

interface PasswordInputProps {
    id: string;
    className?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ id, className, placeholder, value, onChange }) => {
    return (
        <input
            type="password"
            id={id}
            className={className}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};