import React, { useState, useEffect, FC } from 'react'
import { Grid } from '@mui/material'
import CourseCard from '../components/Course/CourseCard'

interface Course {
    id: number
    alias: string
    name: string
    price: number
    preview_url: string
    videos_count: number
}

const CoursesPage: FC = () => {
    const [courses, setCourses] = useState<Course[]>([])

    useEffect(() => {
        fetch('/caesar-panel/api/courses')
            .then((response) => response.json())
            .then((data: { results: Course[] }) => setCourses(data.results))
            .catch((error) => console.error(error))
    }, [])

    return (
        <Grid container spacing={2}>
            {courses.map((course) => (
                <Grid item xs={12} sm={6} md={4} key={course.id}>
                    <CourseCard
                        id={course.id}
                        alias={course.alias}
                        name={course.name}
                        price={course.price}
                        preview_url={course.preview_url}
                        videos_count={course.videos_count}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default CoursesPage
