import React, { memo } from 'react';
import mainCls from '../../styles/main.module.css';
import cls from './UserAccountInfo.module.css'
import logIn from '../../img/log-in.png'
import logOut from '../../img/log-out.png'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../../context';

const UserAccountInfo = memo(() => {
    const { setUserEmail, setUserUid, userEmail } = useContext(MyContext)
    let navigate = useNavigate()

    const handleOut = () => {
        window.localStorage.setItem('myHabitsUserUid', '')
        setUserUid('')
        setUserEmail('')
        navigate('/')
    }

    const handleIn = () => {
        navigate('/')
    }

    return (
        <div className={`${mainCls.block} ${mainCls.groupRow}`}>
            <div>
                <p className={cls.title}>Account</p>
                <p>{!!userEmail ? `${userEmail}` : `You aren't authorized`}</p>
            </div>
            {!!userEmail ?
                <img
                    className={cls.img}
                    src={logOut}
                    alt=''
                    onClick={handleOut}
                /> :
                <img
                    className={cls.img}
                    src={logIn}
                    alt=''
                    onClick={handleIn}
                />
            }
        </div>
    );

});

export default UserAccountInfo;