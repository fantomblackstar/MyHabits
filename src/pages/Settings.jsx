import React from 'react';
import { useContext } from 'react';
import MySwitch from '../components/UI/checkboxes/MySwitch';
import { MyContext } from '../context';
import mainCls from '../styles/main.module.css';

const Settings = () => {
    const { isLight, setIsLight } = useContext(MyContext)

    const onThemeChange = () => {
        setIsLight(prev => !prev)
    }

    return (
        <div className={mainCls.container}>
            <ThemeBlock isLight={isLight} onThemeChange={onThemeChange}/>
        </div>
    );
};

const ThemeBlock = ({ isLight, onThemeChange}) => {
    return (
        <div className={`${mainCls.block}`} style={{ padding: '10px' }}>
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