import React, { FC } from 'react'
import { Box, Button, Typography, styled } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/store'
import { useTranslation } from 'react-i18next'

const StyledBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 64px)', // 64px is the height of the MUI AppBar
    textAlign: 'center',
    padding: '0 24px',
})

const HomePage: FC = () => {
    const { isLoggedIn } = useAppStore()
    const navigate = useNavigate()
    const { t } = useTranslation()

    const handleStart = () => {
        navigate('/courses')
    }

    return (
        <StyledBox>
            <Typography variant="h2" mb={4}>
                {t('welcome')}
            </Typography>
            <Typography variant="h4" mb={4}>
                {t('learn')}
            </Typography>
            <Typography variant="body1" mb={4}>
                {t('description')}
            </Typography>
            <Button
                onClick={handleStart}
                variant="contained"
                color="primary"
                size="large"
            >
                {t('begin')}
            </Button>
        </StyledBox>
    )
}

export default HomePage
