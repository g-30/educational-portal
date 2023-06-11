import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Box } from '@mui/material'

interface TestCardProps {
    testNumber: number
    formUrl: string
}

const TestCard: FC<TestCardProps> = ({ testNumber, formUrl }) => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
            <Typography variant="h6" component="h2">
                Тест {testNumber}
            </Typography>
            <Typography
                variant="body2"
                component={Link}
                to={formUrl}
                target="_blank"
            >
                Google Forms
            </Typography>
        </Box>
    )
}

export default TestCard
