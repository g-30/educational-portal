import { Controller, Get, Post, Body } from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from './video.entity';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  findAll(): Promise<Video[]> {
    return this.videoService.findAll();
  }

  @Post()
  create(@Body() video: Video): Promise<Video> {
    return this.videoService.create(video);
  }
}
