import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import Authorisation from '../components/Authorisation/Authorisation';
import Preloader from '../components/UI/preloaders/Preloader';
import { MyContext } from '../context';
import { getDataDb, getHabitsDataDb, GoogleSignIn, writeDataDb } from '../db/firebase';
import cls from '../styles/main.module.css'

const Login = () => {
    const { isLight, setUserUid, setHabitsObj, setAllFolders } = useContext(MyContext)
    const [showPreloader, setShowPreloader] = useState(false)

    const onSignIn = async () => {
        let res = await GoogleSignIn()
        if (res.length !== 0) {
            setShowPreloader(true)
            getUserHabits(res)
        }
    }

    const getUserHabits = async (googleRes) => {
        const [name, email, uid] = googleRes

        let userExist = await getDataDb(`Users/${uid}`)
        if (userExist === false) {
            let user = { name, email, uid, allFolders: ['All'] }
            writeDataDb(`Users/${uid}`, user)
        } else {
            const habits = await getHabitsDataDb(uid)
            if (habits) setHabitsObj(habits)
            setAllFolders(userExist.allFolders)
        }
        setUserUid(uid)
    }

    return (
        <div className={`${cls.wrap} ${isLight ? cls.light : ''}`}>
            {showPreloader ?
                <Preloader /> :
                <Authorisation onSignIn={onSignIn} />
            }
        </div>
    );
};

export default Login;