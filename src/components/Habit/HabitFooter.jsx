import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context';
import { write_DATA } from '../../db/firebase';
import ModalConfirm from '../MyModal/ModalConfirm';
import MyButton from '../UI/buttons/MyButton';
import cls from './Habit.module.css';

const HabitFooter = ({ percent, habitId }) => {
    const { setModal, habitsObj, setHabitsObj, userUid } = useContext(MyContext)
    let navigate = useNavigate()

    const onDeleteClick = () => {
        setModal({
            visible: true,
            modalCtx:
                <ModalConfirm
                    onConfirmClick={updateHabit}
                    btnRed={true}
                    text={'Are you realy want to delete this habit? All data will be lost!'}
                />
        })
    }

    const updateHabit = () => {
        let newHabits = { ...habitsObj }
        delete newHabits[`${habitId}`]
        if (percent === 100)  write_DATA(`Habits/${userUid}/${habitId}/finished`, true)
        else  write_DATA(`Habits/${userUid}`, newHabits)
        
        navigate('/')
        setHabitsObj({ ...newHabits })
        setModal({ visible: false, modalCtx: null })
    }

    const onFinishClick = () => {
        setModal({
            visible: true,
            modalCtx:
                <ModalConfirm
                    onConfirmClick={updateHabit}
                    text={'Congraduation!You finished the habit! This Habit will be archive.'}
                />
        })
    }

    return (
        <div className={cls.footer}>
            {percent === 100 ?
                <MyButton onClick={onFinishClick}>Finish Habit</MyButton> :
                <MyButton onClick={onDeleteClick}>Delete Habit</MyButton>
            }
        </div>
    );
};

export default HabitFooter;