import React, { useState, useEffect, FC } from 'react'
import { useParams } from 'react-router-dom'
import { Grid } from '@mui/material'
import CourseVideoCard from '../components/Course/CourseVideoCard'

type Course = {
    status: number
    id: number
    alias: string
    name: string
    preview_url: string
    videosCount: number
    videos: CourseVideo[]
}

type CourseVideo = {
    id: number
    alias: string
    name: string
    preview_url: string
    video_iframe_url: string
}

const CoursePage: FC = () => {
    const [courseAlias, setCourseAlias] = useState<string>('')
    const [courseVideos, setCourseVideos] = useState<CourseVideo[]>([])
    const { courseName } = useParams<{ courseName: string }>()

    useEffect(() => {
        fetch(
            `https://education.joji.one/caesar-panel/api/courses/${courseName}`
        )
            .then((response) => response.json())
            .then((results: Course) => {
                setCourseAlias(results.alias)
                setCourseVideos(results.videos)
            })
            .catch((error) => console.error(error))
    }, [courseName])

    return (
        <Grid container spacing={2}>
            {courseVideos.map((course) => (
                <Grid item xs={12} sm={6} md={4} key={course.id}>
                    <CourseVideoCard
                        id={course.id}
                        alias={course.alias}
                        name={course.name}
                        preview_url={course.preview_url}
                        video_iframe_url={course.video_iframe_url}
                        courseAlias={courseAlias}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default CoursePage
