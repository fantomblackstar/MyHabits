import React from 'react';
import cls from './Preloader.module.css';

const Preloader = () => {
    return (
        <div className={`${cls.preloader}`}>
            <div className={cls.loader}>
            </div>
        </div>
    );
};

export default Preloader;