import Today from '../pages/Today'
import Week from '../pages/AllHabits'
import HabitIdPage from '../pages/HabitIdPage'
import Settings from '../pages/Settings'
import Login from '../pages/Login'

export const publicRoutes = [
    { path: '/settings', element: <Settings/>, name:'Setting' },
    {
        path: '*',
        element: <Login/>
    },
]


export const privateRoutes = [
    { path: '/', element: <Today />, name:'Today' },
    { path: '/habits', element: <Week />, name:'All Habits' },
    { path: '/habits/:id', element: <HabitIdPage/> },
    { path: '/settings', element: <Settings/> },
    {
        path: '*',
        element: <Today/>
    },
]