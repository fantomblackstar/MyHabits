import React from 'react';
import { useContext } from 'react';
import SettingFolders from '../components/SettingFolders/SettingFolders';
import MySwitch from '../components/UI/checkboxes/MySwitch';
import UserAccountInfo from '../components/UserAccountInfo/UserAccountInfo';
import { MyContext } from '../context';
import mainCls from '../styles/main.module.css';

const Settings = () => {
    const { isLight, setIsLight } = useContext(MyContext)

    const onThemeChange = () => {
        setIsLight(prev => !prev)
    }

    return (
        <div className={mainCls.container}>
            <UserAccountInfo />
            <ThemeBlock
                isLight={isLight}
                onThemeChange={onThemeChange}
            />
            <SettingFolders/>
        </div>
    );
};

const ThemeBlock = ({ isLight, onThemeChange }) => {
    return (
        <div className={`${mainCls.block}`} >
            <div className={mainCls.groupRow}>
                <p>Dark Mode </p>
                <MySwitch
                    checked={!isLight}
                    onHandleChange={onThemeChange}
                />
            </div>
        </div>
    )

}


export default Settings;