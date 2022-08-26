import React, { useState, memo } from 'react';
import { useContext } from 'react';
import { MyContext } from '../../context';
import MyInput from '../UI/inputs/MyInput';
import mainCl from '../../styles/main.module.css';
import MyButton from '../UI/buttons/MyButton';
import { writeDataDb } from '../../db/firebase';
import FolderList from '../FolderList/FolderList';

const FolderForm = memo(({ onFolderChange, activeFolder }) => {
    const { allFolders, setAllFolders, userUid } = useContext(MyContext)
    const [name, setName] = useState('')

    const onChangeName = (value) => {
        if (value.length > 20) return;
        setName(value.replace(/[^a-z0-9\s]/gi, ''))
    }

    const createFolder = () => {
        if (!name.trim().length) return;
        const folderName = `${name[0].toUpperCase() + name.slice(1)}`
        if (allFolders.indexOf(folderName) !== -1) {
            setName('')
            return
        };
        writeDataDb(`Users/${userUid}/allFolders`, [...allFolders, folderName])
        setAllFolders([...allFolders, folderName])
        setName('')
    }

    return (
        <>
            <p className={mainCl.subtitle}>Choose folder:</p>
            <FolderList
                onFolderClick={onFolderChange}
                allFolders={allFolders}
                activeFolder={activeFolder}
            />
            <div style={{ display: 'flex', alignItems:'center' }}>
                <MyInput
                    value={name}
                    handleChange={onChangeName}
                    label={'Add folder:'}
                />
                <MyButton disabled={!name} onClick={createFolder} >Add</MyButton>
            </div>
        </>
    );
})


export default FolderForm;