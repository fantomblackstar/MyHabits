import React from 'react';
import { useNavigate } from 'react-router-dom';
import cls from './Habit.module.css';

const HabitMainInfo = ({ name, schedule, target, doneDays, isLight, folder }) => {
    let navigate = useNavigate()

    return (
        <>
            <div
                className={`${cls.block} ${isLight ? cls.light : ''}`}
            >
                <p onClick={() => navigate('/')}
                    className={cls.name}
                >
                    {name}
                </p>
            </div>
            <div
                className={`${cls.block} ${isLight ? cls.light : ''}`}
            >
                <div className={cls.group}>
                    <p className={cls.title}>Start Date</p>
                    <p className={cls.titleValue}>{Object.keys(doneDays)[0].replace(/-/g, '.')}</p>
                </div>
                <div className={cls.group}>
                    <p className={cls.title}>Target</p>
                    <p className={cls.titleValue}>{target}</p>
                </div>
                <div className={cls.group}>
                    <p className={cls.title}>Scedule</p>
                    <p className={cls.titleValue}>{schedule.length === 7 ? 'Everyday' : schedule.join(', ')}</p>
                </div>
                <div className={cls.group}>
                    <p className={cls.title}>Folder</p>
                    <p className={cls.titleValue}>{folder}</p>
                </div>
            </div>
        </>
    );
};

export default HabitMainInfo;