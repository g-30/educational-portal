import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from '@mui/material'
import CourseVideoDetails from '../components/Course/CourseVideoDetails'

type CourseVideo = {
    id: number
    alias: string
    name: string
    preview_url: string
    video_iframe_url: string
}

const CourseVideoPage: React.FC = () => {
    const [courseVideoData, setCourseVideoData] = useState<CourseVideo>({
        id: 0,
        alias: '',
        name: '',
        preview_url: '',
        video_iframe_url: '',
    })
    const { courseVideo } = useParams<{ courseVideo: string }>()

    useEffect(() => {
        fetch(
            `https://education.joji.one/caesar-panel/api/videos/${courseVideo}`
        )
            .then((response) => response.json())
            .then((results: CourseVideo) => {
                setCourseVideoData(results)
            })
            .catch((error) => console.error(error))
    }, [])

    return (
        <CourseVideoDetails
            id={courseVideoData!.id}
            alias={courseVideoData!.alias}
            name={courseVideoData!.name}
            preview_url={courseVideoData!.preview_url}
            video_iframe_url={courseVideoData!.video_iframe_url}
        />
    )
}

export default CourseVideoPage
