import React, { useState, FormEvent } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

function Register() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(
            'Name:',
            name,
            'Email:',
            email,
            'Password:',
            password,
            'Confirm Password:',
            confirmPassword
        );
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, px: 2 }}>
            <Typography variant='h4' align='center' sx={{ mb: 4 }}>
                Register
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    required
                    fullWidth
                    margin='normal'
                    id='name'
                    label='Name'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <TextField
                    required
                    fullWidth
                    margin='normal'
                    id='confirmPassword'
                    label='Confirm Password'
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3 }}
                >
                    Register
                </Button>
            </form>
        </Box>
    );
}

export default Register;
