import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Box } from '@mui/material'
import TestCard from '../components/Test/TestCard'

const TestPage = () => {
    return (
        <Box>
            <Typography variant="h4" component="h1" align="center">
                Страница тестов
            </Typography>
            <Typography variant="body1" align="center">
                Добро пожаловать на страницу тестов! Ниже вы найдете ссылки на
                Google Forms.
            </Typography>
            <TestCard
                testNumber={1}
                formUrl="https://forms.google.com/form-url"
            />
            <TestCard
                testNumber={2}
                formUrl="https://forms.google.com/form-url"
            />
            <TestCard
                testNumber={3}
                formUrl="https://forms.google.com/form-url"
            />
            {/* Добавьте другие тесты по необходимости */}
        </Box>
    )
}

export default TestPage
