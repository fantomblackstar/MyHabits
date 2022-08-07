import React, { memo } from 'react';
import cl from './MyInputs.module.css';
import mainCl from '../../../styles/main.module.css';
import { useContext } from 'react';
import { MyContext } from '../../../context';

const MyInput = memo(({ value = '', handleChange, label, visible = true, ...props }) => {
    const { isLight } = useContext(MyContext)

    return (
        <div className={`${cl.group} ${visible ? '' : mainCl.hide}`}>
            <input
                placeholder=' '
                className={`${cl.input} ${isLight ? cl.light : ''}`}
                value={value}
                onChange={(event) => handleChange(event.target.value)}
            />
            <label className={cl.label}>{label}</label>
        </div>
    );
})

export default MyInput;