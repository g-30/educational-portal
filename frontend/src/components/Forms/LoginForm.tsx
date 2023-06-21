import React, { useState, FormEvent, ChangeEvent, FC } from 'react'
import { Box, Button, TextField, Typography, Alert } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/store'
import { useTranslation } from 'react-i18next'

interface LoginFormData {
    email: string
    password: string
}

interface LoginResponseData {
    data: Data
}

interface Data {
    access_token: string
    expires: number
    refresh_token: string
}

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const { isLoggedIn, setLoggedIn } = useAppStore()
    const navigate = useNavigate()
    const { t } = useTranslation()

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData: LoginFormData = {
            email: email,
            password: password,
        }

        fetch('/caesar-panel/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json() as Promise<LoginResponseData>
            })
            .then(({ data }) => {
                if (data) {
                    console.log(data)
                    setEmail('')
                    setPassword('')
                    setLoggedIn(true)
                    localStorage.setItem('accessToken', data.access_token)
                    localStorage.setItem('refreshToken', data.refresh_token)
                    navigate('/courses')
                }
            })
            .catch((error) => console.error(error))
    }

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, px: 2 }}>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    {t('login')}
                </Typography>
                {isLoggedIn && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        {t('login_success')}
                    </Alert>
                )}
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={t('login')}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setPassword(e.target.value)
                        }
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {t('login')}
                    </Button>
                    <Link target='_blank' to={`/caesar-panel/admin/reset-password`}>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{
                                marginLeft: '10px',
                                marginTop: '32px',
                            }}
                        >
                            Восстановить пароль
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}

export default LoginForm
