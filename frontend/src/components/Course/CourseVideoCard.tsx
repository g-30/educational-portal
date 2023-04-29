import React from 'react'
import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

type CourseVideos = {
    id: number
    alias: string
    name: string
    preview_url: string
    video_iframe_url: string
    courseAlias: string
}

const CourseVideoCard = ({
    alias,
    name,
    preview_url,
    video_iframe_url,
    courseAlias,
}: CourseVideos) => {
    return (
        <Card sx={{ marginTop: '2rem', marginLeft: '.5rem' }}>
            <CardActionArea
                component={Link}
                to={`/courses/${courseAlias}/${alias}`}
            >
                {video_iframe_url ? (
                    <iframe
                        src={video_iframe_url}
                        width="100%"
                        height="300px"
                        title={name}
                        allowFullScreen
                    />
                ) : (
                    <img
                        src={preview_url}
                        alt={name}
                        width="100%"
                        height="300px"
                    />
                )}
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
