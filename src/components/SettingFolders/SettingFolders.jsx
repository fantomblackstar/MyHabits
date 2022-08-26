import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import { MyContext } from '../../context';
import { writeDataDb } from '../../db/firebase';
import mainCls from '../../styles/main.module.css'
import FolderList from '../FolderList/FolderList';
import ModalConfirm from '../MyModal/ModalConfirm';
import cls from './SettingFolders.module.css'

const SettingFolder = () => {
    const {userUid, allFolders, isLight, setModal, setAllFolders } = useContext(MyContext)
    const [showFolders, setShowFolders] = useState(false)
    const deleteFolderName = useRef()
    const folderBlock = useRef()

    const onTitleClick = () => {
        setShowFolders(!showFolders)
    }

    const onFolderSelect = useCallback((name) => {
        deleteFolderName.current = name
        let msg = `Are you sure that you want to delete this folder?`
        setModal({
            visible: true,
            modalCtx: <ModalConfirm
                text={msg}
                onConfirmClick={onDeleteFolder}
            />
        })
    })

    const onDeleteFolder = () => {
        setModal(prev => ({ ...prev, visible: false }))
        const folders = allFolders.filter(e => e !== deleteFolderName.current);
        setAllFolders(folders)
        writeDataDb(`Users/${userUid}/allFolders`, folders )
    }

    return (
        <div className={mainCls.block}>
            <p
                className={`${cls.title} ${showFolders ? cls.active : ''} ${isLight ? cls.light : ''}`}
                onClick={onTitleClick}
            >
                Your Folders
            </p>
            <div
                ref={folderBlock}
                className={`${cls.body} ${showFolders ? cls.active : ''}`}
            >
                <p style={{ marginBottom: '5px' }}>{allFolders.length > 1 ? 'Choose folder to delete:' : 'You don\'t have any folder'}</p>
                <FolderList
                    allFolders={allFolders.filter(e => e !== 'All')}
                    onFolderClick={onFolderSelect}
                />
            </div>
        </div>
    );
};

export default SettingFolder;