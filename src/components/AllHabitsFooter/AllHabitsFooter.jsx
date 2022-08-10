import React, { memo } from 'react';
import { useContext } from 'react';
import { useCallback } from 'react';
import { MyContext } from '../../context';
import HabitForm from '../Forms/HabitForm';
import AddButton from '../UI/buttons/AddButton';
import cls from './AllHabitsFooter.module.css';

const AllHabitsFooter = memo(() => {
    const {setModal} = useContext(MyContext)

    const handleAddNew = useCallback(() => {
        setModal({ visible: true, modalCtx: <HabitForm /> })
    })

    return (
        <footer className={cls.footer}>
            <AddButton
                styles={[cls.btnCenter]}
                onClick={handleAddNew}
            />
        </footer>
    );
});

export default AllHabitsFooter;