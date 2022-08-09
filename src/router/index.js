import Today from '../pages/Today'
import Week from '../pages/AllHabits'
import HabitIdPage from '../pages/HabitIdPage'
import Settings from '../pages/Settings'

export const publicRoutes = [
    { path: '/', element: <Today />, name:'Today' },
    { path: '/habits', element: <Week />, name:'All Habits' },
    { path: '/habits/:id', element: <HabitIdPage/> },
    { path: '/settings', element: <Settings/> },
    {
        path: '*',
        element: <Today/>
    },
]