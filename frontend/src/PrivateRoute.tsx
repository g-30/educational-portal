import { useAppStore } from './store/store'
import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'

interface PrivateRouteProps {
    children: ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { isLoggedIn } = useAppStore()

    if (!isLoggedIn) {
        // If the user is not logged in, redirect them to the login page
        return <Navigate to="/login" replace={true} />
    }

    // If the user is logged in, render the protected route
    return <>{children}</>
}

export default PrivateRoute
