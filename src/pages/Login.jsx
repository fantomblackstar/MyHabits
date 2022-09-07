import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import Authorisation from '../components/Authorisation/Authorisation';
import Preloader from '../components/UI/preloaders/Preloader';
import { MyContext } from '../context';
import { getDataDb, GoogleSignIn, writeDataDb } from '../db/firebase';

const Login = () => {
    const { setUserUid} = useContext(MyContext)
    const [showPreloader, setShowPreloader] = useState(false)

    const onSignIn = async () => {
        let res = await GoogleSignIn()
        if (res.length !== 0) {
            setShowPreloader(true)
            const [name, email, uid] = res
            let userExist = await getDataDb(`Users/${uid}`)
            if (userExist === false) {
                let user = { name, email, uid, allFolders: ['All'] }
                writeDataDb(`Users/${uid}`, user)
            }
            setUserUid(uid)
            window.localStorage.setItem('myHabitsUserUid', uid)
        }
    }

    return (
        <>
            {showPreloader ?
                <Preloader /> :
                <Authorisation onSignIn={onSignIn} />
            }
        </>
    );
};

export default Login;