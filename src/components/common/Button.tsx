import { LoadingOutlined } from '@ant-design/icons';
import React from 'react'

interface ButtonProps{
    className?: string;
    text: string; 
    type?: "submit" | "reset" | "button";
    loader?: boolean;
}

export default function Button({
    className,
    text,
    type,
    loader
}: ButtonProps) {
  return ( 
        <button
            className={`bg-amber-200 text-pink-400  ${className}`}
            type={type}
            disabled={loader} 
        >
            {loader && (
                <span className="text-pink-400 pr-[4px]">
                    <LoadingOutlined />
                </span>
            )}
            {text}
        </button>
  )
}
