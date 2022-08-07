import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import cls from './Habit.module.css';

const HabitProgress = ({progress, isLight }) => {
    const [percent, currentStreak, maxStreak] = progress
    let progressRef = useRef(null)

    useEffect(() => {
        progressRef.current.style.background = `conic-gradient(#4d5bf9 ${percent * 3.6}deg, #cadcff ${percent * 3.6 + 1}deg )`
    }, [percent])

    return (
            <div
                className={`${cls.block} ${isLight? cls.light:''}`}
            >
                <p className={cls.title}>Progress</p>
                <div className={`${cls.circularWrap}`}>
                    <div className={cls.circularProgress} ref={progressRef}>
                        <div className={cls.valueContainer}>{percent}%</div>
                    </div>
                </div>
                <div className={cls.group}>
                    <p className={cls.title}>Current Streak</p>
                    <p className={cls.titleValue}>{currentStreak} {currentStreak > 1? 'days':'day'}</p>
                </div>
                <div className={cls.group}>
                    <p className={cls.title}>Max Streak</p>
                    <p className={cls.titleValue}>{maxStreak} {maxStreak > 1? 'days':'day'}</p>
                </div>
            </div>
    );
};

export default HabitProgress;