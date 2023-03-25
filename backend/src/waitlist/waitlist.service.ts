import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { WaitlistItem } from './waitlist-item.entity';
import { Course } from '../course/course.entity';

@Injectable()
export class WaitlistService {
  constructor(
    @InjectRepository(WaitlistItem)
    private readonly waitlistRepository: Repository<WaitlistItem>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  // users end up in waitlist only after paying for the course
  async addToWaitlist(userId: number, courseId: number, paidAmount: number) {
    const course = await this.courseRepository.findOneBy({ id: courseId });
    if (course == null) {
      throw `Course #${courseId} not found.`;
    }

    const waitlistEntry = new WaitlistItem();
    waitlistEntry.userId = userId;
    waitlistEntry.courseId = courseId;
    waitlistEntry.paidAmount = paidAmount;

    await this.waitlistRepository.save(waitlistEntry);

    await this.unlockCourse(course);

    return waitlistEntry;
  }

  async unlockCourse(course: Course) {
    if (course.minPeopleRequired === 0) {
      // No need to unlock anything, the course is available right away
      return;
    }
    const usersSignedUpCount = await this.waitlistRepository.countBy({
      courseId: course.id,
      paidAmount: Not(0),
    });
    if (usersSignedUpCount < course.minPeopleRequired) {
      // not enough users signed up yet; do nothing
      return;
    }
    await this.courseRepository.update(course, { unlocked: true });
    // TODO: send emails.
  }
}
