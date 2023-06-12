import React, { useState, useEffect, FC } from 'react'
import { useParams } from 'react-router-dom'
import { Grid } from '@mui/material'
import CourseVideoCard from '../components/Course/CourseVideoCard'

interface Course {
    id: number
    alias: string
    name: string
    price: number
    preview_url: string
    videos_count: number
    videos: CourseVideo[]
}

interface CourseVideo {
    id: number
    alias: string
    name: string
    preview_url: string
}

const CoursePage: FC = () => {
    const [courseAlias, setCourseAlias] = useState<string>('')
    const [courseVideos, setCourseVideos] = useState<CourseVideo[]>([])
    const { courseName } = useParams<{ courseName: string }>()

    useEffect(() => {
        fetch(
            `/caesar-panel/api/courses/${courseName}`
        )
            .then((response) => response.json())
            .then(({ result }: { result: Course }) => {
                setCourseAlias(result.alias)
                setCourseVideos(result.videos)
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
                        course_alias={courseAlias}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default CoursePage
