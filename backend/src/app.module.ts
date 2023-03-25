import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { VideoModule } from './video/video.module';
import { WaitlistModule } from './waitlist/waitlist.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      // this is publicly exposed but that's fine at this stage of dev
      username: 'root',
      password: 'test',
      database: 'education_portal',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // remove after db is set up
      synchronize: true,
    }),
    UserModule,
    CourseModule,
    VideoModule,
    WaitlistModule,
  ],
})
export class AppModule {}
