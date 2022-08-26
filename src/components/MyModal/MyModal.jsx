import React from 'react';
import { useContext } from 'react';
import { MyContext } from '../../context';
import cls from './MyModal.module.css';

const MyModal = ({ children}) => {
    const {isLight, modal, setModal} = useContext(MyContext)

    const onWrapHandle = (e) => {
        setModal({...modal, visible:false})
    }

    return (
        <div
            className={`${cls.modal} ${isLight? cls.light : ''} ${modal.visible ? cls.active : ''}`}
            onClick={onWrapHandle}
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