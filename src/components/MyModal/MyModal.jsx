import React from 'react';
import { useContext } from 'react';
import { MyContext } from '../../context';
import cls from './MyModal.module.css';

const MyModal = ({ children}) => {
    const {isLight, modal, setModal} = useContext(MyContext)

    return (
        <div
            className={`${cls.modal} ${isLight? cls.light : ''} ${modal.visible ? cls.active : ''}`}
            onClick={() => setModal({...modal, visible:false})}
        >
            <div
                className={cls.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default MyModal;