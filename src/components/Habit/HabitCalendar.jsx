import React from 'react';
import Slider from 'react-slick';
import { getDateFromStr } from '../../utils';
import cls from './Habit.module.css';

const HabitCalendar = ({ habitDays, isLight }) => {

    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        initialSlide: 0,
        nextArrow: <SampleNextArrow isLight={isLight}/>,
        prevArrow: <SamplePrevArrow isLight={isLight}/>,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 9,
                    slidesToScroll: 9,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,
                    initialSlide: 7
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    initialSlide: 0
                }
            },
            {
                breakpoint: 380,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            }
        ]
    }

    return (
        <div className={`${cls.block} ${isLight ? cls.light : ''}`}>
            <p className={cls.title}>Calendar</p>
            <Slider {...settings} className={cls.calendar}>
                {habitDays.map((elem, index) => (
                    <CalendarItem
                        key={index.toString()}
                        dayStr={elem[0]}
                        done={elem[1]}
                        isLight={isLight}
                    />
                ))}
            </Slider>
        </div>
    );
};

export default HabitCalendar;

const CalendarItem = ({ dayStr, done, isLight }) => {
    const date = getDateFromStr(dayStr)
    const [dayOfWeek, day, month] = date.toUTCString().split(' ')

    return (
        <div className={`${cls.calendarDay} ${isLight ? cls.light : ''} ${done ? cls.dayDone : ''}`}>
            <p >{month}</p>
            <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>{day}</p>
            <p>{dayOfWeek.replace(/\W/g, '')}</p>
        </div>
    )
}

function SampleNextArrow({className, style, onClick, isLight}) {
    return (
        <div
            className={`${className} ${cls.calendarArrow} ${isLight ? cls.light : ''}`}
            style={{ ...style}}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow({ className, style, onClick, isLight }) {
    return (
        <div
            className={`${className} ${cls.calendarArrow} ${isLight ? cls.light : ''}`}
            style={{ ...style }}
            onClick={onClick}
        />
    );
}
