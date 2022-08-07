import React from 'react';
import { useContext } from 'react';
import Authorisation from '../components/Authorisation/Authorisation';
import { MyContext } from '../context';
import cls from '../styles/main.module.css'

const Login = () => {
    const { isLight } = useContext(MyContext)
    return (
        <div className={`${cls.wrap} ${isLight ? cls.light : ''}`}>
            <Authorisation />
        </div>
    );
};

export default Login;