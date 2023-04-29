import { createBrowserRouter } from 'react-router-dom'

import App from './App'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import CoursePage from './pages/CoursePage'
import CourseVideoPage from './pages/CourseVideoPage'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'registration',
                element: <RegistrationPage />,
            },
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/courses',
                element: <CoursesPage />,
            },
            {
                path: '/courses/:courseName',
                element: <CoursePage />,
            },
			{
                path: '/courses/:courseName/:courseVideo',
                element: <CourseVideoPage />,
            },
        ],
    },
])
