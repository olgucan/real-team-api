import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class TeamMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @CreateDateColumn()
  joinedAt: Date;

  @Column()
  user: string;
  @Column()
  team: string;
}
