import React from 'react';
import cl from './MyButton.module.css';

const MyButton = ({ children, disabled = false, ...props }) => {
    return (
        <button
            {...props}
            className={`${cl.button} ${disabled ? cl.disabled : ''}`}
        >
            {children}
        </button>
    );
}

export default MyButton;