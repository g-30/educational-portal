import React, { useState, FormEvent } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Email:', email, 'Password:', password);
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, px: 2 }}>
            <Typography variant='h4' align='center' sx={{ mb: 4 }}>
                Login
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    required
                    fullWidth
                    margin='normal'
                    id='email'
                    label='Email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    required
                    fullWidth
                    margin='normal'
                    id='password'
                    label='Password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3 }}
                >
                    Login
                </Button>
            </form>
        </Box>
    );
}

export default Login;
