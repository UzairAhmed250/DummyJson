import React from 'react'

interface InputProps {
    label: string;
    type: 'text' | 'password' | 'email' | 'number';
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    error?: string; 
    className?: string;
    disabled?: boolean;
    id: string;
}

export default function Input({
    label,
    type,
    name,
    value,
    onChange,
    placeholder,
    required,
    error,
    className,
    id
}: InputProps) {
  return (
    <div>
        <div className='input-wrapper'>
            <label htmlFor={name}>
                {label}
            </label>
            <input 
                type={type} 
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`w-full !bg-[black] text-pink-300  ${error ? 'input-error' : ''}`}
                id={id}
                />
                {error && <span className='error-message'>{error} </span>}
        </div>
    </div>
  )
}
