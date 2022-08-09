import React, { useContext, useRef } from 'react';
import AddButton from '../UI/buttons/AddButton';
import cl from './TodayFooter.module.css';
import mainClasses from '../../styles/main.module.css'
import { MyContext } from '../../context';
import HabitForm from '../Forms/HabitForm';
import FolderForm from '../Forms/FolderForm';

const TodayFotter = ({ folder, setFilter }) => {
    const { isLight, setModal, modal } = useContext(MyContext)
    const doneFilter = useRef(null)

    const handleAddNew = () => {
        setModal({ visible: true, modalCtx: <HabitForm /> })
    }

    const handleFolder = () => {
        setModal({ visible: true, modalCtx: <FolderForm onFolderChange={onFolderChange} activeFolder={folder} /> })
    }

    const handleDoneFilter = () => {
        doneFilter.current.classList.toggle(cl.active)
        setFilter(prev => ({...prev, done:  doneFilter.current.classList.contains(cl.active)}))
    }

    const onFolderChange = (name) => {
        setFilter(prev => ({ ...prev, folder: name }))
        setModal({ ...modal, visible: false })
    }

    return (
        <div className={`${cl.footer} ${isLight ? cl.light : ''}`}>
            <div className={`${mainClasses.container} ${cl.footerBody}`}>
                <div
                    ref={doneFilter}
                    className={`${cl.habitDone} ${cl.active} ${isLight ? cl.light : ''}`}
                    onClick={handleDoneFilter}></div>
                <div
                    className={`${cl.folder} ${isLight ? cl.light : ''}`}
                    onClick={handleFolder}
                >
                    <span>🗀</span>
                    <p>{folder}</p>
                </div>
            </div>
            <AddButton
                styles={[cl.btnCenter]}
                onClick={handleAddNew}
            />
        </div>
    );
};

export default TodayFotter;