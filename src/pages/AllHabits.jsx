import React, { useContext, useState, memo } from 'react';
import { useMemo } from 'react';
import AllHabitsFooter from '../components/AllHabitsFooter/AllHabitsFooter';
import HabitShort from '../components/HabitShort/HabitShort';
import MyInput from '../components/UI/inputs/MyInput';
import Preloader from '../components/UI/preloaders/Preloader';
import { MyContext } from '../context';
import mainStyles from '../styles/main.module.css';

const AllHabits = memo(() => {
    const { habitsObj, showPreloader } = useContext(MyContext)
    const [searchQuery, setSearchQuery] = useState('')

    const searchedHabits = useMemo(() => {
        if (!searchQuery) return Object.values(habitsObj)
        return Object.values(habitsObj).filter(habit => habit.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()))
    }, [habitsObj, searchQuery])

    const handleQuery = (value) => {
        setSearchQuery(value)
    }

    return (
        showPreloader ?
            <Preloader /> :
            <div className={mainStyles.container}>
                <MyInput label={'Search 🔎'} value={searchQuery} handleChange={handleQuery} />

                {searchedHabits.length > 0 ?
                    <HabitList habits={searchedHabits} />
                    :
                    <p className={mainStyles.subtitle} style={{ textAlign: 'center' }}>Nothing found 🤷‍♂️</p>
                }
                <AllHabitsFooter />
            </div>
    );
});

const HabitList = memo(({ habits }) => {
    return (
        <div>
            {habits.map((habit, index) => (
                <HabitShort key={index.toString()} {...habit} isToday={false} />
            ))}
        </div>
    )
})

export default AllHabits;