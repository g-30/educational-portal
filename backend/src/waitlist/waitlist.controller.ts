import { Controller, Post, Body } from '@nestjs/common';
import { WaitlistService } from './waitlist.service';

@Controller('waitlist')
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  @Post()
  async addToWaitlist(
    @Body() data: { userId: number; courseId: number; paidAmount: number },
  ) {
    return this.waitlistService.addToWaitlist(
      data.userId,
      data.courseId,
      data.paidAmount,
    );
  }
}
