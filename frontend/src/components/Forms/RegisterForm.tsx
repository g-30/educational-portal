import { useState, FormEvent } from 'react'
import { Box, Button, TextField, Typography, Alert } from '@mui/material'

interface RegisterFormData {
    email: string
    password: string
    first_name: string
    last_name: string
    phone: string
}

interface RegisterResponseData {
    status: number
    access_token: string
    expires: number
}

const RegisterForm = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [isRegistered, setIsRegistered] = useState<boolean>(false)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData: RegisterFormData = {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            phone: phone,
        }

        fetch('https://education.joji.one/caesar-panel/api/register', {
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
                return response.json() as Promise<RegisterResponseData>
            })
            .then((data) => {
                if (data) {
                    console.log(data)
                    setEmail('')
                    setPassword('')
                    setFirstName('')
                    setLastName('')
                    setPhone('')
                    setIsRegistered(true)
                    localStorage.setItem('accessToken', data.access_token)
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
                <Typography component="h1" variant="h5" align="center">
                    Register
                </Typography>
                {isRegistered && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        Successfully registered!
                    </Alert>
                )}
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                >
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="email"
                        label="Email"
                        type="email"
                        value={email}
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="firstName"
                        label="First Name"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="lastName"
                        label="Last Name"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="phone"
                        label="Phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default RegisterForm
