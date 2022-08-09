import React from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import HabitCalendar from '../components/Habit/HabitCalendar';
import HabitFooter from '../components/Habit/HabitFooter';
import HabitMainInfo from '../components/Habit/HabitMainInfo';
import HabitProgress from '../components/Habit/HabitProgress';
import { MyContext } from '../context';
import mainCls from '../styles/main.module.css';
import { formatDate, getDateFromStr, getDayOfWeek } from '../utils';

const HabitIdPage = () => {
    const { habitsObj } = useContext(MyContext)
    const habitId = useParams()
    const habit = habitsObj[`${habitId.id}`]
    const { isLight } = useContext(MyContext)

    function getAllHabitDays() {
        let date = getDateFromStr(Object.keys(habit.doneDays)[0])
        let allHabitDays = { ...habit.doneDays }
        while (date.getTime() < new Date().getTime()) {

            if (habit.schedule.indexOf(getDayOfWeek(date)) !== -1 && !(formatDate(date) in allHabitDays)) {
                allHabitDays[`${formatDate(date)}`] = false
            }
            date.setDate(date.getDate() + 1)
        }
        return Object.entries(allHabitDays).sort((a, b) => getDateFromStr(a[0]).getTime() - getDateFromStr(b[0]).getTime())
    }

    function getProgress(habitDays) {
        let count = 0
        let maxStreak = 0
        let currentStreak = 0

        habitDays.forEach(element => {
            if (element[1] === true) {
                currentStreak += 1;
                count += 1
            } else {
                count -= count === 0 ? 0 : 1
                currentStreak = 0
            }
            if (currentStreak > maxStreak) maxStreak = currentStreak
        });

        let percent = Math.round(count / 21 * 100)
        if (percent > 100) percent = 100
        return [percent, currentStreak, maxStreak]
    }

    return (
        habit ?
            <div className={`${mainCls.container}`}>
                <HabitMainInfo {...habit} isLight={isLight} />
                <HabitProgress progress={getProgress(getAllHabitDays())} isLight={isLight} />
                <HabitCalendar habitDays={getAllHabitDays()} isLight={isLight} />
                <HabitFooter percent={getProgress(getAllHabitDays())[0]} habitId={habit.id} />
            </div>
            :
            <div className={`${mainCls.container}`}> 
                <p>Something get wrong🤷‍♂️</p>
            </div>
    );
};

export default HabitIdPage;