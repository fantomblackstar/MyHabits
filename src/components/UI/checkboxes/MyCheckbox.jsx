import React, { memo } from 'react';
import mainCl from '../../../styles/main.module.css';
import cls from './MyCheckbox.module.css';

const MyCheckbox = memo(({ label, isChecked, handleChange, visible = true, isLight, ...props }) => {
    return (
        <label className={`${cls.container} ${visible ? '' : mainCl.hide} `} {...props} >
            {label}
            <input
                type="checkbox"
                checked={isChecked}
                className={cls.oldCheck}
                onChange={handleChange}
            />
            <span className={`${cls.customCheck} ${isLight? cls.light : ''}`}></span>
        </label>
    );
});

export default MyCheckbox;