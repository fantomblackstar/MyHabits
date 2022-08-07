import React from 'react';
import cls from './HabitShort.module.css'
import MyCheckbox from '../UI/checkboxes/MyCheckbox';
import { useContext } from 'react';
import { formatDate } from '../../utils';
import { MyContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import { write_DATA } from '../../db/firebase';

const Habit = ({ name, schedule, isToday, doneDays, id, ...props }) => {
    const { habitsObj, setHabitsObj, userUid, isLight } = useContext(MyContext)
    let navigate = useNavigate();

    const onCheckedChange = (event) => {
        event.stopPropagation()

        let updateHabit = { name, schedule, isToday, doneDays, id, ...props }
        updateHabit.doneDays[`${formatDate(new Date())}`] = !!!doneDays[`${formatDate(new Date())}`]
        let updateObj = {}
        updateObj[`${id}`] = updateHabit
        write_DATA(`Habits/${userUid}/${id}`, updateHabit)
        setHabitsObj({ ...habitsObj, ...updateObj })
    }


    return (
        <div
            className={`${cls.habit} ${isLight ? cls.light : ''}`}
            onClick={() => navigate(`/habits/${id}`)}
        >
            <MyCheckbox
                isLight={isLight}
                visible={isToday}
                isChecked={!!doneDays[`${formatDate(new Date())}`]}
                handleChange={(e) => onCheckedChange(e)}
                style={{ marginRight: '10px' }}
                onClick={(event) => event.stopPropagation()}
            />
            <div>
                <p style={{ fontSize: '1.3rem' }}>{name}</p>
                <p className={cls.days}>{schedule.length === 7 ? 'Everyday' : schedule.join(', ')}</p>
            </div>
        </div>
    );
};

export default Habit;