import React, { FC } from 'react'
import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

interface CourseVideo {
    id: number
    alias: string
    name: string
    preview_url: string
    course_alias: string
}

const CourseVideoCard: FC<CourseVideo> = ({
    alias,
    name,
    preview_url,
    course_alias,
}) => {
    return (
        <Card sx={{ marginTop: '2rem', marginLeft: '.5rem' }}>
            <CardActionArea
                component={Link}
                to={`/courses/${course_alias}/${alias}`}
            >
                <img src={preview_url} alt={name} width="100%" height="300px" />
                <CardContent>
                    <Typography variant="h6" component="h3">
                        {name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default CourseVideoCard
