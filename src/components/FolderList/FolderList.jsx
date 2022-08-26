import React, {memo} from 'react'
import cls from './FolderList.module.css'
import folderImg from '../../img/folder_icon.svg';

const FolderList = memo(({ onFolderClick, allFolders, activeFolder = 'All' }) => {
    const handleFolder = (event) => {
        let name = event.target.textContent.replace(/\W/g, '')
        if (name === '') name = event.target.parentElement.textContent.replace(/\W/g, '')
        onFolderClick(name)
    }

    return (
        <div className={cls.folderList}>
            {allFolders.map(name => {
                return (
                    <div
                        onClick={handleFolder}
                        data-folder={name}
                        className={cls.folderGroup}
                        key={name}>
                        <p className={`${activeFolder === name ? cls.activeFolder : ''}`}><img src={folderImg} alt='folder'/>{name}</p>
                    </div>
                )
            })}
        </div>
    )
})

export default FolderList