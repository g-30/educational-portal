import { Controller, Get, Post, Body } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './course.entity';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Post()
  create(@Body() course: Course): Promise<Course> {
    return this.courseService.create(course);
  }
}
