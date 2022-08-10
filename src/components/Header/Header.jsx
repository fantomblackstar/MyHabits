import React, { createRef, forwardRef, useContext, memo } from 'react';
import cls from './Header.module.css'
import mainCls from '../../styles/main.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MyContext } from '../../context';
import settingBlue from '../../img/setting_blue.png'
import settingDark from '../../img/setting_dark.png'
import { privateRoutes, publicRoutes } from '../../router';
import { useRef } from 'react';

const Header = () => {
    let { pathname } = useLocation()
    let { isLight } = useContext(MyContext)
    const burger = createRef()
    const links = createRef()
    const settingImg = useRef(null)
    let navigate = useNavigate()

    if (pathname.split('/')[2] && typeof (+pathname.split('/')[2]) === 'number') pathname = 'My Habit'
    else if (pathname.split('/')[1] === 'habits') pathname = 'All Habits'
    else if (pathname.split('/')[1] === 'settings') pathname = 'Settings'
    else pathname = 'Today'

    const toggleMenu = () => {
        burger.current.children[0].style.transition = (burger.current.classList.contains(cls.active)) ? '0.5s' : '0s'
        burger.current.classList.toggle(cls.active)
        links.current.classList.toggle(cls.active)
    }

    const go2Settings = () => {
        settingImg.current.style.animationName = cls.rotateImg
        setTimeout(() => settingImg.current.style.animationName = '', 1000)
        navigate('/settings')
    }

    return (
        <div
            className={`${cls.header} ${isLight ? cls.light : ''}`}
        >
            <div
                className={`${mainCls.container} ${cls.headerBody}`}
            >
                <Links ref={links} handleClick={toggleMenu} />
                <div className={cls.mobileInfo}>
                    <Burger
                        ref={burger}
                        handleClick={toggleMenu}
                    />
                    <p className={cls.title}>{pathname}</p>
                    <div
                        className={cls.settingImg}
                        onClick={() => go2Settings()}
                        ref={settingImg}
                    >
                        <img src={isLight ? settingBlue : settingDark} alt='settings' />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Burger = memo(forwardRef(({ handleClick }, ref) => (
    <div
        ref={ref}
        className={cls.burger}
        onClick={handleClick}
    >
        <span></span>
    </div>
)))

const Links = memo(forwardRef(({ handleClick }, ref) => (
    <div
        className={cls.links}
        ref={ref}
    >
        {privateRoutes.filter((e) => 'name' in e).map(({ path, name }) =>
            <Link
                key={path}
                to={path}
                className={cls.link}
                onClick={handleClick}
            >
                {name}
            </Link>
        )}
    </div>
)))

export default Header;