import React from 'react';
import cls from './Authorisation.module.css'
import googleIcon from '../../img/google_icon.svg';
import mainCls from '../../styles/main.module.css'
import MyButton from '../UI/buttons/MyButton';

const Authorisation = ({onSignIn}) => {
    return (
        <div className={`${cls.auth} ${mainCls.block}`}>
            <p className={mainCls.title} style={{ textAlign: 'center' }}>Authorisation</p>
            <p style={{marginTop:'20px', textAlign:'center'}}>Please sign in to contunie</p>
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