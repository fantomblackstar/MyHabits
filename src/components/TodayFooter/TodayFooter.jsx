import React, { useContext, useRef } from 'react';
import AddButton from '../UI/buttons/AddButton';
import cls from './TodayFooter.module.css';
import mainClasses from '../../styles/main.module.css'
import { MyContext } from '../../context';
import HabitForm from '../Forms/HabitForm';
import folderImg from '../../img/folder_icon.svg';
import FolderList from '../FolderList/FolderList';

const TodayFotter = ({ folder, setFilter }) => {
    const { isLight, setModal, modal, allFolders } = useContext(MyContext)
    const doneFilter = useRef(null)

    const handleAddNew = () => {
        setModal({ visible: true, modalCtx: <HabitForm /> })
    }

    const handleFolder = () => {
        setModal({
            visible: true,
            modalCtx: <FolderList
                allFolders={allFolders}
                onFolderClick={onFolderChange}
                activeFolder={folder}
            />
        })
    }

    const handleDoneFilter = () => {
        doneFilter.current.classList.toggle(cls.active)
        setFilter(prev => ({ ...prev, done: doneFilter.current.classList.contains(cls.active) }))
    }

    const onFolderChange = (name) => {
        setFilter(prev => ({ ...prev, folder: name }))
        setModal({ ...modal, visible: false })
    }

    return (
        <div className={`${cls.footer} ${isLight ? cls.light : ''}`}>
            <div className={`${mainClasses.container} ${cls.footerBody}`}>
                <div
                    ref={doneFilter}
                    className={`${cls.habitDone} ${cls.active} ${isLight ? cls.light : ''}`}
                    onClick={handleDoneFilter}></div>
                <div
                    className={`${cls.folder} ${isLight ? cls.light : ''}`}
                    onClick={handleFolder}
                >
                    <img src={folderImg} alt='folder' />
                    <p>{folder}</p>
                </div>
            </div>
            <AddButton
                styles={[cls.btnCenter]}
                onClick={handleAddNew}
            />
        </div>
    );
};

export default TodayFotter;