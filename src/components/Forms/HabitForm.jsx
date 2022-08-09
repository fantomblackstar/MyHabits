import React from 'react';
import MyButton from '../UI/buttons/MyButton';
import MyInput from '../UI/inputs/MyInput';
import mainCl from '../../styles/main.module.css';
import cl from './Forms.module.css';
import frequencyCl from '../HabitFrequency/HabitFrequency.module.css';
import HabitFrequency from '../HabitFrequency/HabitFrequency';
import { useState } from 'react';
import { useContext } from 'react';
import { MyContext } from '../../context';
import FolderForm from './FolderForm';
import { useRef } from 'react';
import { formatDate, getDayOfWeek } from '../../utils';
import { useCallback } from 'react';
import { writeDataDb } from '../../db/firebase';

const HabitForm = () => {
    const { setModal, habitsObj, setHabitsObj , userUid} = useContext(MyContext)
    const [name, setName] = useState('')
    const [folder, setFolder] = useState('All')
    const [target, setTarget] = useState('')
    const daysBlock = useRef(null)
    const errorBlock = useRef(null)

    const onChangeName = useCallback((value) => {
        value = value.replace(/[^a-z0-9\s]/gi, '')
        value.length === 1 ? setName(value.toUpperCase()) : setName(value)
    }, [])

    const onChangeTarget = useCallback((value) => {
        value = value.replace(/[^a-z0-9\s]/gi, '')
        value.length === 1 ? setTarget(value.toUpperCase()) : setTarget(value)
    }, [])

    const addNewHabit = () => {
        if (!name) return showErrorMsg('*Enter name')
        else if (!target) return showErrorMsg('*Enter target')

        const days = Array.from(daysBlock.current.childNodes)
            .filter(element => element.classList.contains(frequencyCl.active))
            .map(elem => elem.textContent)

        if (!days.length) return showErrorMsg('Choose frequency')
        for (let habit of Object.values(habitsObj)) {
            if (name.trim() === habit.name) return showErrorMsg('You alredy have habit with this name!')
        }

        const id = new Date().getTime().toString()
        const newHabit = {}
        newHabit[`${id}`] = { name: name.trim(), target: target.trim(), schedule: days, doneDays: getFirstDayObj(days), id, folder, finished: false }

        writeDataDb(`Habits/${userUid}/${id}`, newHabit[`${id}`]) 
        setName('')
        setTarget('')
        setFolder('All')
        setHabitsObj((prev) => ({ ...prev, ...newHabit }))
        setModal(prev => ({ ...prev, visible: false }))
    }

    const getFirstDayObj = (days) => {
        let date = new Date()

        for (let i = 0; i < 7; i++) {
            if (days.indexOf(getDayOfWeek(date)) !== -1) break;
            date.setDate(date.getDate() + 1)
        }
        let res = {}
        res[`${formatDate(date)}`] = false
        return res
    }

    const onFolderChange = (name) => {
        setFolder(name)
    }

    const showErrorMsg = async (text) => {
        errorBlock.current.textContent = text
        errorBlock.current.classList.toggle(mainCl.hide)
        setTimeout(() => errorBlock.current.classList.toggle(mainCl.hide), 2000)
    }

    return (
        <>
            <p className={mainCl.title}>New habit</p>
            <p className={`${cl.errorMsg} ${mainCl.hide}`} ref={errorBlock}></p>
            <MyInput
                label={'Name:'}
                value={name}
                handleChange={onChangeName}
            />
            <MyInput
                label={'Target:'}
                value={target}
                handleChange={onChangeTarget}
            />
            <p className={mainCl.subtitle}>Frequency:</p>
            <HabitFrequency ref={daysBlock} />
            <FolderForm
                activeFolder={folder}
                onFolderChange={onFolderChange}
            />
            <MyButton
                onClick={addNewHabit}
                style={{ margin: '10px auto 0px' }}
            >
                Create Habit
            </MyButton>
        </>
    );
};

export default HabitForm;