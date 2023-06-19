import React, { useState, useEffect, FC } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import CourseVideoDetails from '../components/Course/CourseVideoDetails'
import { Link } from 'react-router-dom'

interface CourseVideo {
    id: number
    alias: string
    name: string
    preview_url: string
    video_iframe_url: string
}

const CourseVideoPage: FC = () => {
    const [courseVideoData, setCourseVideoData] = useState<CourseVideo | null>(
        null
    )
    const { courseVideo, courseName } = useParams<{ courseVideo: string, courseName: string }>()

    useEffect(() => {
        fetch(
            `/caesar-panel/api/videos/${courseVideo}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            }
        )
            .then((response) => response.json())
            .then(({ result }: { result: CourseVideo }) => {
                console.log(result)
                setCourseVideoData(result)
            })
            .catch((error) => console.error(error))
    }, [courseVideo])

    if (!courseVideoData) {
        return (
            <Box
                mt={4}
                textAlign="center"
                style={{
                    backgroundColor: '#f5f5f5',
                    padding: '20px',
                    borderRadius: '4px',
                }}
            >
                <Typography variant="body1" style={{ marginBottom: '10px' }}>
                    Для доступа к данному видео необходимо осуществить оплату.
                </Typography>
                <Typography variant="body1">
                    Пожалуйста, для совершения платежа перейдите на{' '}
                    <Link to={`/purchase/${courseName}`}>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{
                                marginLeft: '10px',
                            }}
                        >
                            Страницу оплаты
                        </Button>
                    </Link>
                </Typography>
            </Box>
        )
    }

    return (
        <>
            <CourseVideoDetails
                id={courseVideoData.id}
                alias={courseVideoData.alias}
                name={courseVideoData.name}
                preview_url={courseVideoData.preview_url}
                video_iframe_url={courseVideoData.video_iframe_url}
            />
        </>
    )
}

export default CourseVideoPage
