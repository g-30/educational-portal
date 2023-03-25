import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WaitlistItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  paidAmount: number;

  @Column()
  userId: number;

  @Column()
  courseId: number;
}
