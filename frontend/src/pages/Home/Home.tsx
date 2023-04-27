import React from 'react'
import { Box, Button, Typography, styled } from '@mui/material'
import { Link } from 'react-router-dom'

const StyledBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 64px)', // 64px is the height of the MUI AppBar
    textAlign: 'center',
    padding: '0 24px',
})

const Home = () => {
    return (
        <StyledBox>
            <Typography variant="h2" mb={4}>
                Welcome to Agartu
            </Typography>
            <Typography variant="h4" mb={4}>
                The online education platform for students
            </Typography>
            <Typography variant="body1" mb={4}>
                Agartu is an all-in-one platform for students to learn new
                skills, brush up on old ones, and stay ahead in their studies.
            </Typography>
            <Button
                component={Link}
                to="/registration"
                variant="contained"
                color="primary"
                size="large"
            >
                Get started
            </Button>
        </StyledBox>
    )
}

export default Home
