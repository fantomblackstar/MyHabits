import React from 'react';
import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom'
import { MyContext } from '../context';
import Login from '../pages/Login';
import { publicRoutes } from '../router';
import cls from '../styles/main.module.css'

const AppRouter = ({ isAuth }) => {
    return (
        isAuth === '' ?
            <Routes>
                <Route
                    path={'*'}
                    element={<Login />}
                />
            </Routes> :
            <Routes>
                {publicRoutes.map(({ path, element }, index) =>
                    <Route
                        path={path}
                        element={
                            <Wrap>{element}</Wrap>
                        }
                        key={index.toString()}
                    />
                )}
            </Routes>
    );
};

const Wrap = ({ children }) => {
    const { isLight } = useContext(MyContext)
    return (
        <div className={`${cls.wrap} ${isLight ? cls.light : ''}`}>
            {children}
        </div>
    )
}

export default AppRouter;