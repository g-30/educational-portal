import React, { FC } from 'react'
import { AppBar, Toolbar, Button, Typography, styled } from '@mui/material'
import { Link } from 'react-router-dom'
import Logo from '../../icons/logo.svg'

interface ButtonProps {
    component?: React.ElementType
    to?: string
}

const NavButton = styled(Button)<ButtonProps>({
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
        color: '#0DC0AF',
        transition: 'color 0.3s ease',
    },
})

const NavLink = styled(Link)({
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
        color: '#0DC0AF',
        transition: 'color 0.3s ease',
    },
})

interface NavbarProps {
    isLoggedIn: boolean
}

const Navbar: FC<NavbarProps> = ({ isLoggedIn }) => {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        <NavLink to="/">
                            Agartu
                            <img src={Logo} />
                        </NavLink>
                    </Typography>

                    {isLoggedIn ? (
                        <>
                            <NavButton component={Link} to="/courses">
                                Courses
                            </NavButton>
                            <NavButton component={Link} to="/logout">
                                Logout
                            </NavButton>
                        </>
                    ) : (
                        <>
                            <NavButton component={Link} to="/">
                                Home
                            </NavButton>
                            <NavButton component={Link} to="/login">
                                Login
                            </NavButton>
                            <NavButton component={Link} to="/registration">
                                Register
                            </NavButton>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
