import React from 'react';
import { useContext } from 'react';
import { MyContext } from '../../context';
import MyButton from '../UI/buttons/MyButton';
import cls from './MyModal.module.css';

const ModalConfirm = ({ text, onConfirmClick, btnRed = false }) => {
    const { setModal } = useContext(MyContext)
    return (
        <>
            <p style={{ textAlign: 'center' }}>{text}</p>
            <div className={cls.confirmFooter}>
                {btnRed ?
                    <MyButton style={{ backgroundColor: '#b90000' }} onClick={() => onConfirmClick()}>OK</MyButton>
                    :
                    <MyButton onClick={() => onConfirmClick()}>OK</MyButton>
                }
                <MyButton onClick={() => setModal(prev => ({ ...prev, visible: false }))}>Cancel</MyButton>
            </div>
        </>
    );
};

export default ModalConfirm;