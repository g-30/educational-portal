import React, { FC } from 'react'
import {
    Card,
    CardActionArea,
    CardContent,
    Typography,
    CardMedia,
    Box,
    Button,
} from '@mui/material'
import { Link } from 'react-router-dom'

interface Course {
    id: number
    alias: string
    name: string
    price: number
    preview_url: string
    videos_count: number
}

const Course: FC<Course> = ({
    alias,
    name,
    preview_url,
    videos_count,
    price,
}) => {
    return (
        <Card sx={{ marginTop: '2rem', marginLeft: '.5rem' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="300"
                    width="300"
                    image={preview_url}
                    alt={name}
                />
                <CardContent>
                    <Typography
                        variant="h6"
                        component="h3"
                        sx={{ mb: '0.5rem' }}
                    >
                        {name}
                    </Typography>
                    <Box
                        sx={{
                            backgroundColor: 'primary.main',
                            color: 'white',
                            display: 'inline-block',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '0.3rem',
                        }}
                    >
                        {price} тг
                    </Box>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: '1rem' }}
                    >
                        Видео: {videos_count}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            marginTop: '0.2rem',
                            borderRadius: '0.3rem',
                        }}
                        component={Link}
                        to={`/purchase/${alias}`}
                    >
                        Приобрести Курс
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            marginTop: '0.2rem',
                            marginLeft: '0.5rem',
                            borderRadius: '0.3rem',
                        }}
                        component={Link}
                        to={`/courses/${alias}`}
                    >
                        Просмотреть Курс
                    </Button>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default Course
