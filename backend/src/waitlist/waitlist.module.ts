import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaitlistItem } from './waitlist-item.entity';
import { WaitlistService } from './waitlist.service';
import { WaitlistController } from './waitlist.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WaitlistItem])],
  providers: [WaitlistService],
  controllers: [WaitlistController],
})
export class WaitlistModule {}
