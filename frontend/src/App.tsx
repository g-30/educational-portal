import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'

const App: FC<any> = () => {
    return (
        <div>
            <Navbar isLoggedIn={false} />
            <Outlet />
            <Footer />
        </div>
    )
}

export default App
