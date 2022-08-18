import React, { useContext, useState, useMemo, memo } from 'react';
import HabitShort from '../components/HabitShort/HabitShort';
import TodayFotter from '../components/TodayFooter/TodayFooter';
import MyInput from '../components/UI/inputs/MyInput';
import Preloader from '../components/UI/preloaders/Preloader';
import { MyContext } from '../context';
import mainStyles from '../styles/main.module.css'
import { formatDate, getDayOfWeek } from '../utils';

const Today = () => {
    const { habitsObj, showPreloader } = useContext(MyContext)
    const [filter, setFilter] = useState({ folder: 'All', query: '', done: true })

    const todayHabits = useMemo(() => {
        const today = getDayOfWeek(new Date())
        return Object.values(habitsObj).filter(habit => habit.schedule.indexOf(today) !== -1)
    }, [habitsObj])

    const filteredHabit = useMemo(() => {
        let date = formatDate(new Date())
        return todayHabits.filter((habit) => (filter.folder === 'All' || habit.folder === filter.folder) && (filter.done ? true : (!!habit.doneDays?.[`${date}`] === false)))
    }, [filter.done, filter.folder, todayHabits])

    const searchedHabits = useMemo(() => {
        if (!filter.query) return filteredHabit
        return filteredHabit.filter((habit) => habit.name.toLowerCase().includes(filter.query.toLocaleLowerCase()))
    }, [filteredHabit, filter.query])

    const onQueryChange = (value) => {
        setFilter({ ...filter, query: value.replace(/[^a-z0-9\s]/gi, '') })
    }

    return (
        showPreloader ?
            <Preloader /> :
            <div className={mainStyles.container}>
                <MyInput label={'Search 🔎'} value={filter.query} handleChange={onQueryChange} />
                {searchedHabits.length > 0 ?
                    <HabitList habitsArr={searchedHabits} />
                    :
                    <p className={mainStyles.subtitle} style={{ textAlign: 'center' }}>Nothing found 🤷‍♂️</p>
                }
                <TodayFotter
                    folder={filter.folder}
                    setFilter={setFilter}
                />
            </div>
    );
};

const HabitList = memo(({ habitsArr }) => {
    return (
        <div>
            {habitsArr.map((habit, index) => (
                <HabitShort key={index.toString()} {...habit} isToday={true} />
            ))}
        </div>
    )
})

export default Today;