import React from 'react';
import cls from './MyCheckbox.module.css';

const MySwitch = ({ checked, onHandleChange }) => {
    return (
        <label className={cls.switch}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onHandleChange}
            />
            <span className={`${cls.slider} ${cls.round}`}></span>
        </label>
    );
};

export default MySwitch;