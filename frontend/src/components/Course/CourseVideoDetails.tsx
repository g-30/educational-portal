import React, { FC } from 'react'
import { Card, CardActionArea, CardContent, Typography } from '@mui/material'

interface CourseVideo {
    id: number
    alias: string
    name: string
    preview_url: string
    video_iframe_url: string
}

const CourseVideoDetails: FC<CourseVideo> = ({
    name,
    preview_url,
    video_iframe_url,
}) => {
    return (
        <Card
            sx={{
                width: '70%',
                height: '100%',
                margin: '0 auto',
            }}
        >
            <CardActionArea>
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

export default CourseVideoDetails
