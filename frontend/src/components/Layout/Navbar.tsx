import React, { FC } from 'react'
import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    styled,
    Box,
    Select,
    MenuItem,
} from '@mui/material'
import { Link } from 'react-router-dom'
import Logo from '../../icons/logo.svg'
import { useAppStore } from '../../store/store'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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

const LanguageSwitcher = styled(Box)({
    '& .MuiSelect-select': {
        color: 'white',
        backgroundColor: '#0DC0AF',
        '&:hover': {
            backgroundColor: '#08A999',
        },
    },
})

const Navbar: FC = () => {
    const { isLoggedIn, setLoggedIn } = useAppStore()
    const navigate = useNavigate()

    const handleLogout = () => {
        setLoggedIn(false)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        navigate('/login')
    }

    const { t, i18n } = useTranslation()

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language)
    }

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
                                {t('courses')}
                            </NavButton>
                            <NavButton component={Link} to="/tests">
                                {t('tests')}
                            </NavButton>
                            <NavButton
                                onClick={handleLogout}
                                component={Link}
                                to="/"
                            >
                                {t('logout')}
                            </NavButton>
                        </>
                    ) : (
                        <>
                            <NavButton component={Link} to="/">
                                {t('home')}
                            </NavButton>
                            <NavButton component={Link} to="/login">
                                {t('login')}
                            </NavButton>
                            <NavButton component={Link} to="/registration">
                                {t('registration')}
                            </NavButton>
                        </>
                    )}

                    <LanguageSwitcher>
                        <Select
                            value={i18n.language}
                            onChange={(event) =>
                                changeLanguage(event.target.value)
                            }
                            variant="outlined"
                        >
                            <MenuItem value="en">English</MenuItem>
                            <MenuItem value="ru">Russian</MenuItem>
                            <MenuItem value="kk">Kazakh</MenuItem>
                        </Select>
                    </LanguageSwitcher>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
