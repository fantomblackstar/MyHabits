import React, { memo, useState, forwardRef } from 'react';
import { useContext } from 'react';
import { MyContext } from '../../context';
import cls from './HabitFrequency.module.css';
import { getDayOfWeek } from '../../utils';
import { useEffect } from 'react';

const HabitFrequency = forwardRef((props, ref) => {
    const [custom, setCustom] = useState(true)
    return (
        <div className={cls.frequency}>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <div
                    style={{ display: 'flex', alignItems: 'center' }}
                >
                    <input
                        type={'radio'}
                        checked={!custom}
                        className={cls.input}
                        onChange={() => setCustom(!custom)}
                        id='input-everyday'
                    />
                    <label htmlFor='input-everyday'>Everyday</label>
                </div>
                <div
                    style={{ display: 'flex', alignItems: 'center' }}
                >
                    <input
                        type={'radio'}
                        checked={custom}
                        className={cls.input}
                        onChange={() => setCustom(!custom)}
                        id='input-custom'
                    />
                    <label htmlFor='input-custom'>Custom</label>
                </div>
            </div>
            <Days
                ref={ref}
                setCustom={setCustom}
                custom={custom}
            />
        </div>
    );
})

const Days = forwardRef(({ custom, setCustom }, ref) => {
    const { isLight } = useContext(MyContext)
    const today = getDayOfWeek(new Date())
    const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    
    useEffect(() => {
        if (!custom) {
            ref.current.childNodes.forEach(e => {
                if(!e.classList.contains(cls.active)) e.classList.add(cls.active) 
            })
        }
    })

    const handleClick = (e) => {
        e.target.classList.toggle(cls.active)
        if (!custom) setCustom(true)
    }

    return (
        <div className={cls.daysBlock} ref={ref}>
            {allDays.map(text => {
                return (
                    <span
                        className={`${cls.day} ${isLight ? cls.light : ''} ${(today === text || !custom) ? cls.active : ''}`}
                        key={text}
                        onClick={handleClick}
                    >
                        {text}
                    </span>
                )
            })}
        </div>
    );
})

export default memo(HabitFrequency);