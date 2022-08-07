import React, { useContext, useState, memo } from 'react';
import { useMemo } from 'react';
import HabitShort from '../components/HabitShort/HabitShort';
import MyInput from '../components/UI/inputs/MyInput';
import { MyContext } from '../context';
import mainStyles from '../styles/main.module.css';

const AllHabits = () => {
    const { habitsObj } = useContext(MyContext)
    const [searchQuery, setSearchQuery] = useState('')

    const searchedHabits = useMemo(() => {
        if (!searchQuery) return Object.values(habitsObj)
        return Object.values(habitsObj).filter(habit => habit.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()))
    }, [habitsObj, searchQuery])

    const handleQuery = (value) => {
        setSearchQuery(value)
    }

    return (
        <div className={mainStyles.container}>
            <MyInput label={'Search 🔎'} value={searchQuery} handleChange={handleQuery} />

            {searchedHabits.length > 0 ?
                <HabitList habits={searchedHabits} />
                :
                <p className={mainStyles.subtitle} style={{ textAlign: 'center' }}>Nothing found 🤷‍♂️</p>
            }
        </div>
    );
};

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