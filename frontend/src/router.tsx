import { createBrowserRouter } from 'react-router-dom'

import App from './App'
import Login from './pages/Login/Login'
import Registration from './pages/Registration/Registration'
import Home from './pages/Home/Home'
import Courses from './pages/Courses/Courses'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'registration',
                element: <Registration />,
            },
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/courses',
                element: <Courses />,
            },
        ],
    },
])
