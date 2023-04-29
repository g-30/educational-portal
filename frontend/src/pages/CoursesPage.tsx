import React, { useState, useEffect, FC } from 'react'
import { Grid } from '@mui/material'
import CourseCard from '../components/Course/CourseCard'

interface Course {
    id: number
    alias: string
    name: string
    preview_url: string
    videosCount: number
}

const CoursesPage: FC = () => {
    const [courses, setCourses] = useState<Course[]>([])

    useEffect(() => {
        fetch('https://education.joji.one/caesar-panel/api/courses')
            .then((response) => response.json())
            .then((data: { results: Course[] }) => setCourses(data.results))
            .catch((error) => console.error(error))
    }, [])

    console.log(courses)

    return (
        <Grid container spacing={2}>
            {courses.map((course) => (
                <Grid item xs={12} sm={6} md={4} key={course.id}>
                    <CourseCard
                        id={course.id}
                        alias={course.alias}
                        name={course.name}
                        preview_url={course.preview_url}
                        videosCount={course.videosCount}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default CoursesPage
