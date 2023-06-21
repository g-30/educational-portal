import { createBrowserRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import App from './App'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import CoursePage from './pages/CoursePage'
import CourseVideoPage from './pages/CourseVideoPage'
import PurchasePage from './pages/PurchasePage'
import TestPage from './pages/TestPage'

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
                element: (
                    <CoursePage />
                ),
            },
            {
                path: '/courses/:courseName/:courseVideo',
                element: (
                    <PrivateRoute>
                        <CourseVideoPage />
                    </PrivateRoute>
                ),
            },
            {
                path: '/purchase/:courseName',
                element: (
                    <PrivateRoute>
                        <PurchasePage />,
                    </PrivateRoute>
                ),
            },
            {
                path: '/tests',
                element: (
                    <PrivateRoute>
                        <TestPage />
                    </PrivateRoute>
                ),
            },
        ],
    },
])
