import React from 'react';
import cls from './Authorisation.module.css'
import googleIcon from '../../img/google_icon.svg';
import mainCls from '../../styles/main.module.css'
import MyButton from '../UI/buttons/MyButton';
import { useContext } from 'react';
import { MyContext } from '../../context';
import { getHabits_DATA, get_DATA, GoogleSignIn, write_DATA } from '../../db/firebase';

const Authorisation = () => {
    const { setUserUid, setHabitsObj, setAllFolders } = useContext(MyContext)

    const onSignIn = async () => {
       let res = await GoogleSignIn()
       if(res.length !== 0) {
        const [name, email, uid] = res

        let userExist = await get_DATA(`Users/${uid}`)
        if( userExist === false){
            let user = {name, email, uid, allFolders:['All']}
            write_DATA(`Users/${uid}`, user)
        } else {
            const habits = await getHabits_DATA(uid)
            if(habits) setHabitsObj(habits)
            setAllFolders(userExist.allFolders)
        }
        setUserUid(uid)
       }
    }

    return (
        <div className={`${cls.auth} ${mainCls.block}`}>
            <p className={mainCls.title} style={{ textAlign: 'center' }}>Authorisation</p>
            <p style={{marginTop:'20px', textAlign:'center'}}>Please sign in with Google to contunie</p>
            <MyButton
                onClick={onSignIn}
                style={{ bottom: '20px', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
            >
                Sign In <img style={{width:'15px', transform:'translate(2px, 2px)'}} src={googleIcon} alt=''/> 
            </MyButton>
        </div>
    );
};

export default Authorisation;