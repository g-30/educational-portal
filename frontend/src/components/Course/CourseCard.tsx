import React, { FC } from 'react'
import {
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Badge,
    CardMedia,
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

const Course: FC<Course> = ({ alias, name, preview_url, videos_count }) => {
    return (
        <Card sx={{ marginTop: '2rem', marginLeft: '.5rem' }}>
            <CardActionArea component={Link} to={`/courses/${alias}`}>
                <CardMedia
                    component="img"
                    height="300"
                    width="300"
                    image={preview_url}
                    alt={name}
                />
                <CardContent>
                    <Typography variant="h6" component="h3">
                        {name}
                        <Badge
                            color="primary"
                            badgeContent={videos_count}
                            sx={{ marginBottom: '2rem', marginLeft: '.5rem' }}
                        ></Badge>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default Course
